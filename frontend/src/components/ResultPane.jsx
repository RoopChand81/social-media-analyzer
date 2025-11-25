import React, { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function ResultPane({ result }) {
  const [activeTab, setActiveTab] = useState("text");

  if (!result) {
    return (
      <div className="text-gray-400 text-center mt-20">
        Upload a file and click <strong>Analyze</strong>.
      </div>
    );
  }

  const { extractedText, aiSuggestions, meta } = result;

  // -----------------------
  // JSON CLEAN + PARSE
  // -----------------------
  let parsed = null;
  try {
    let cleaned = aiSuggestions;

    // Remove ```json fences if present
    if (typeof cleaned === "string") {
      cleaned = cleaned.replace(/```json|```/g, "").trim();
      cleaned = JSON.parse(cleaned);
    }

    // Handle double string encoding
    if (typeof cleaned === "string") cleaned = JSON.parse(cleaned);

    parsed = cleaned;
  } catch (err) {
    console.error("JSON parse failed:", err);
    parsed = null;
  }

  const TabButton = ({ id, label }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`px-5 py-2 text-sm font-semibold rounded-md transition-all 
        ${
          activeTab === id
            ? "bg-blue-600 text-white shadow-lg"
            : "bg-gray-800 text-gray-300 hover:bg-gray-700"
        }
      `}
    >
      {label}
    </button>
  );

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black text-gray-200 p-6 rounded-xl shadow-xl border border-gray-700 space-y-6">

      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-100 text-center mb-4 tracking-wide">
        Analysis Results
      </h2>

      {/* Tabs */}
      <div className="flex gap-3 justify-center">
        <TabButton id="text" label="Extracted Text" />
        <TabButton id="suggestions" label="Suggestions" />
        <TabButton id="instagram" label="Instagram" />
        <TabButton id="linkedin" label="LinkedIn" />
        <TabButton id="socialTips" label="Social Tips" />
        <TabButton id="scores" label="Scores" />
      </div>

      {/* ⚪ EXTRACTED TEXT */}
        {activeTab === "text" && (
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-inner max-h-96 overflow-y-auto">

            <h3 className="text-lg font-semibold text-blue-400 mb-3">
              Extracted Text
            </h3>

            <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 text-gray-200 leading-relaxed text-[15px] tracking-wide whitespace-pre-wrap">
              <ReactMarkdown>{extractedText}</ReactMarkdown>
            </div>

          </div>
        )}


      {/* 🌟 SUGGESTIONS */}
      {activeTab === "suggestions" && parsed?.suggestions && (
        <div className="bg-gray-800 p-5 rounded-lg border border-gray-600 shadow-inner">
          <h3 className="text-xl font-semibold text-blue-400 mb-3">
            Engagement Suggestions
          </h3>

          <ul className="list-disc ml-6 space-y-2 text-gray-300">
            {parsed.suggestions.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {/* 📸 INSTAGRAM */}
      {activeTab === "instagram" && parsed?.instagram && (
        <div className="bg-gray-800 p-5 rounded-lg border border-gray-600 shadow-inner">

          <h3 className="text-xl font-semibold text-pink-400 mb-3">
            Instagram Caption
          </h3>

          <div className="bg-gray-900 p-4 rounded-md border border-gray-700 text-gray-300 whitespace-pre-wrap mb-4">
            {parsed.instagram.caption}
          </div>

          <h4 className="text-lg font-semibold text-gray-200 mb-2">
            Hashtags
          </h4>
          <div className="bg-gray-900 p-3 rounded-md border border-gray-700 text-gray-300 text-sm">
            {parsed.instagram.hashtags.join(" ")}
          </div>

        </div>
      )}

      {/* 💼 LINKEDIN */}
      {activeTab === "linkedin" && parsed?.linkedin && (
        <div className="bg-gray-800 p-5 rounded-lg border border-gray-600 shadow-inner">

          <h3 className="text-xl font-semibold text-blue-300 mb-3">
            LinkedIn Caption
          </h3>

          <div className="bg-gray-900 p-4 rounded-md border border-gray-700 text-gray-300 whitespace-pre-wrap mb-4">
            {parsed.linkedin.caption}
          </div>

          <h4 className="text-lg font-semibold text-gray-200 mb-2">
            Hashtags
          </h4>
          <div className="bg-gray-900 p-3 rounded-md border border-gray-700 text-gray-300 text-sm">
            {parsed.linkedin.hashtags.join(" ")}
          </div>

        </div>
      )}

      {/* 🌐 SOCIAL TIPS */}
      {activeTab === "socialTips" && parsed?.social_tips && (
        <div className="bg-gray-800 p-5 rounded-lg border border-gray-600 shadow-inner">

          <h3 className="text-xl font-semibold text-green-400 mb-3">
            Social Handle Tips
          </h3>

          <ul className="list-disc ml-6 space-y-2 text-gray-300">
            {parsed.social_tips.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

        </div>
      )}

      {/* 📊 SCORES */}
      {activeTab === "scores" && parsed?.scores && (
        <div className="grid grid-cols-3 gap-4">
          {Object.entries(parsed.scores).map(([key, value]) => (
            <div
              key={key}
              className="bg-gray-800 p-5 rounded-lg shadow-lg border border-gray-600 text-center"
            >
              <h4 className="text-lg font-semibold capitalize text-blue-400">
                {key}
              </h4>
              <p className="text-3xl font-bold text-gray-100">{value}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
