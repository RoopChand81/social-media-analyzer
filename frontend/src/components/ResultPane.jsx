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

  // Try to parse JSON
  let parsed = null;
  try {
    parsed = JSON.parse(aiSuggestions);
  } catch {
    parsed = null;
  }
  console.log("print type",typeof parsed);

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

        {/* JSON → FORMATTED UI */}
      
        {parsed ? (
          <div className="space-y-6 max-h-96 overflow-y-auto pr-2">

            {/* Suggestions List */}
            {parsed.suggestions && (
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">
                  Engagement Suggestions
                </h3>
                <ul className="list-disc ml-5 space-y-1 text-sm break-words">
                  {parsed.suggestions.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Instagram Feedback */}
            {parsed.instagram && (
              <div>
                <h3 className="font-semibold text-gray-700 mb-1">
                  Instagram Feedback
                </h3>
                <div className="p-3 bg-gray-50 rounded text-sm whitespace-pre-wrap break-words">
                  {parsed.instagram}
                </div>
              </div>
            )}

            {/* LinkedIn Feedback */}
            {parsed.linkedin && (
              <div>
                <h3 className="font-semibold text-gray-700 mb-1">
                  LinkedIn Feedback
                </h3>
                <div className="p-3 bg-gray-50 rounded text-sm whitespace-pre-wrap break-words">
                  {parsed.linkedin}
                </div>
              </div>
            )}

            {/* Scores */}
            {parsed.scores && (
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Scores</h3>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  {Object.entries(parsed.scores).map(([key, value]) => (
                    <div key={key} className="bg-gray-100 p-3 rounded shadow-sm">
                      <div className="font-medium">{key}</div>
                      <div>{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        ) : (
          // Markdown fallback (if not JSON)
          <div className="prose max-w-none max-h-96 overflow-y-auto break-words">
            <ReactMarkdown>{aiSuggestions}</ReactMarkdown>
          </div>
        )}
      </div>
      
    </div>
  );
}
