const { GoogleGenerativeAI } = require("@google/generative-ai");

// Simple wrapper to call Gemini if available, otherwise throw for fallback
let genAI = null;
let model = null;

if (process.env.GEMINI_API) {
  try {
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API);
    model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction: `You are a concise social-media copy expert. Answer strictly following the JSON schema requested by the user. Keep suggestions short and actionable.`
    });
  } catch (err) {
    console.warn("Could not initialize Google Generative AI client:", err?.message || err);
    genAI = null;
    model = null;
  }
}

async function generateContent(prompt) {
  if (model) {
    const res = await model.generateContent(prompt);
    // Attempt to return string or object
    const txt = res?.response?.text && typeof res.response.text === "function" ? res.response.text() : (res?.response?.text || "");
    return txt;
  } else {
    // If no model available, throw so caller can fallback locally
    throw new Error("Generative AI model not configured. Set GEMINI_API env var or use fallback.");
  }
}

module.exports = generateContent;