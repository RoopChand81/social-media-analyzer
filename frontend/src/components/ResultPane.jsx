import React from "react";
import ReactMarkdown from "react-markdown";

export default function ResultPane({ result }) {
  if (!result)
    return (
      <div className="text-gray-500 text-center mt-20">
        Upload a file and click Extract Text.
      </div>
    );

  const { extractedText, aiSuggestions, meta } = result;

  // ==============================
  //  FINAL JSON PARSER (with cleanup)
  // ==============================
  let parsed = null;

  try {
    let cleaned = aiSuggestions;

    // Remove markdown code blocks like ```json ... ```
    if (typeof cleaned === "string") {
      cleaned = cleaned.replace(/```json|```/g, "").trim();
    }

    // Backend already sent object?
    if (cleaned && typeof cleaned === "object") {
      parsed = cleaned;
    } else {
      // FIRST parse
      if (typeof cleaned === "string") cleaned = JSON.parse(cleaned);

      // SECOND parse (double-encoded JSON)
      if (typeof cleaned === "string") cleaned = JSON.parse(cleaned);

      if (typeof cleaned === "object") parsed = cleaned;
    }
  } catch (err) {
    console.error("JSON parsing failed:", err);
    parsed = null;
  }

  //console.log("PARSED FINAL:", parsed);

  return (
    <div className="space-y-6">

      {/* Extracted Text */}
      <div className="bg-white shadow rounded p-4">
        <h2 className="text-xl font-bold mb-3">Extracted Text</h2>
        <div className="max-h-64 overflow-y-auto whitespace-pre-wrap break-words">
          {extractedText || <em>No text extracted</em>}
        </div>
      </div>

      {/* Metadata */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold text-sm text-gray-600">Hashtags</h3>
          <div className="text-sm mt-1 break-words">
            {meta?.hashtags?.length ? meta.hashtags.join(", ") : "—"}
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold text-sm text-gray-600">Readability</h3>
          <div className="text-sm mt-1">{meta?.readability ?? "—"}</div>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold text-sm text-gray-600">Has CTA?</h3>
          <div className="text-sm mt-1">{meta?.hasCTA ? "Yes" : "No"}</div>
        </div>
      </div>

      {/* AI Suggestions */}
      <div className="bg-white shadow rounded p-4">
        <h2 className="text-xl font-bold mb-4">AI Suggestions</h2>

        {parsed && typeof parsed === "object" && parsed.suggestions ? (
          <div className="space-y-6 max-h-96 overflow-y-auto pr-2">

            {/* Suggestions */}
            <div>
              <h3 className="text-xl font-semibold mb-2">🌟 Engagement Suggestions</h3>
              <ul className="list-disc ml-5 space-y-1 text-gray-700">
                {parsed.suggestions.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Instagram Caption */}
            {parsed.instagram && (
              <div>
                <h3 className="text-xl font-semibold mb-1">📸 Instagram Caption</h3>
                <div className="bg-gray-100 p-3 rounded text-sm whitespace-pre-wrap">
                  {parsed.instagram}
                </div>
              </div>
            )}

            {/* LinkedIn Caption */}
            {parsed.linkedin && (
              <div>
                <h3 className="text-xl font-semibold mb-1">💼 LinkedIn Caption</h3>
                <div className="bg-gray-100 p-3 rounded text-sm whitespace-pre-wrap">
                  {parsed.linkedin}
                </div>
              </div>
            )}

            {/* Scores */}
            {parsed.scores && (
              <div>
                <h3 className="text-xl font-semibold mb-2">📊 Scores</h3>
                <div className="grid grid-cols-3 gap-4">
                  {Object.entries(parsed.scores).map(([key, value]) => (
                    <div key={key} className="bg-gray-100 p-3 rounded text-center">
                      <strong className="block text-gray-700 capitalize">
                        {key}
                      </strong>
                      <span className="text-lg font-semibold">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        ) : (
          // Fallback to markdown (AI didn't return JSON)
          <div className="prose max-w-none max-h-96 overflow-y-auto break-words">
            <ReactMarkdown>{String(aiSuggestions)}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
