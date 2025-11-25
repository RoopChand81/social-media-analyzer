const fs = require("fs");
const path = require("path");
const pdfjsLib = require("pdfjs-dist/legacy/build/pdf.js");
const Tesseract = require("tesseract.js");
const Document = require("../models/Document");
const generateContent = require("../services/ai.services");

// Basic analyzer helpers
function extractHashtags(text) {
  const matches = text.match(/#\w+/g) || [];
  return Array.from(new Set(matches)).slice(0, 10);
}

function estimateReadability(text) {
  // Simple Flesch–Kincaid-like approx: use words/sentences heuristic
  const sentences = text.split(/[.!?]+/).filter(Boolean).length || 1;
  const words = (text.match(/\w+/g) || []).length || 1;
  const syllables = Math.max(1, Math.floor(words * 1.4)); // rough
  const score = 206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words);
  return Math.round(score);
}

function detectCTA(text) {
  const ctaPatterns = [/click here/i, /learn more/i, /join us/i, /buy now/i, /signup/i, /subscribe/i];
  return ctaPatterns.some((p) => p.test(text));
}

async function extractTextFromPDF(filePath) {
  const data = new Uint8Array(fs.readFileSync(filePath));
  const loadingTask = pdfjsLib.getDocument({ data });
  const pdf = await loadingTask.promise;
  let fullText = "";
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const strings = content.items.map((s) => s.str);
    // join with preserved newlines between items
    fullText += strings.join(" ") + "\n\n";
  }
  return fullText.trim();
}

async function analyzeFile(req, res) {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const ext = path.extname(file.originalname).toLowerCase();
    let extractedText = "";

    // PDF parsing with pdfjs to better preserve simple formatting
    if (ext === ".pdf") {
      try {
        extractedText = await extractTextFromPDF(file.path);
      } catch (err) {
        console.warn("PDF parse failed, attempting fallback text extraction", err.message);
        extractedText = fs.readFileSync(file.path, "utf8").toString() || "";
      }
    } else {
      // Use OCR for images
      try {
        const result = await Tesseract.recognize(file.path, "eng", { logger: m => {} });
        extractedText = result?.data?.text || "";
      } catch (err) {
        console.error("OCR failed:", err);
        return res.status(500).json({ success: false, message: "OCR processing failed" });
      }
    }

    // Basic analyzer heuristics
    const hashtags = extractHashtags(extractedText);
    const readability = estimateReadability(extractedText);
    const hasCTA = detectCTA(extractedText);

    // Prepare prompt for AI: include analysis hints so the AI focuses on social media engagement
    const aiPrompt = `
You are a concise social-media optimization assistant.

Your output must follow these strict rules:
- Suggestions must be VERY SHORT (max 6 items, each under 10 words).
- Use simple bullet phrases only (no long sentences).
- Emojis allowed but max 1 per suggestion.
- Keep the Instagram and LinkedIn versions extremely short (2–3 lines max).
- No long paragraphs.
- No extra blank lines.
- No explanations.
- Output must be CLEAN JSON only.

Return JSON in this exact structure:
{
  "suggestions": ["short tip 1", "short tip 2", ...],
  "instagram": "2–3 line optimized caption",
  "linkedin": "2–3 line professional caption",
  "scores": { "engagement": number, "readability": number, "cta": number }
}

Now analyze the text below using the metadata and generate the JSON only.

Original Text:
"""${extractedText}"""

Metadata:
hashtags: ${JSON.stringify(hashtags)}
readability_score: ${readability}
has_cta: ${hasCTA}
`;


    let aiSuggestions = "";
    let finalSuggestions="";
    try {
      aiSuggestions = await generateContent(aiPrompt);
      // Step 1: Try to parse directly
      let temp = aiSuggestions;

      try {
        temp = JSON.parse(temp); // first parse
      } catch (e) {
        // ignore
      }
      // Step 2: If still a string, parse again
      if (typeof temp === "string") {
        try {
          temp = JSON.parse(temp); // second parse
        } catch (e) {
          // still invalid → leave as string
        }
      }

      finalSuggestions = temp;
    } catch (err) {
      console.error("AI generation failed:", err?.message || err);
      // Fallback: create simple suggestions manual form
      aiSuggestions = JSON.stringify({
        suggestions: [
          "Start with a strong hook in the first sentence.",
          hasCTA ? "Make CTA more specific." : "Add a clear call-to-action (e.g., 'Join', 'Learn more', 'Sign up').",
          "Add 3-5 relevant hashtags.",
          "Shorten long sentences and keep paragraphs small.",
          "Consider adding 1–2 emojis to increase visibility."
        ],
        instagram: extractedText.slice(0, 220),
        linkedin: extractedText.slice(0, 130),
        scores: { engagement: 50, readability: readability, cta: hasCTA ? 80 : 20 }
      }, null, 2);
    }

    // Store to DB (optional) — keep non-blocking
    try {
      const doc = new Document({
        filename: file.filename,
        originalname: file.originalname,
        path: file.path,
        extractedText: extractedText.slice(0, 5000), // store short preview
        createdAt: new Date(),
      });
      await doc.save();
    } catch (dbErr) {
      console.warn("DB save failed (non-fatal):", dbErr.message);
    }
   // console.log("type of ai Suggestions",typeof finalSuggestions);

    return res.json({
      success: true,
      extractedText,
      aiSuggestions:finalSuggestions,
      meta: { hashtags, readability, hasCTA },
    });
  } catch (err) {
    console.error("ERROR:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
}

module.exports = { analyzeFile };