import React, { useState } from "react";
import Upload from "./components/Upload";
import ResultPane from "./components/ResultPane";

export default function App() {
  const [result, setResult] = useState(null);

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Social Media Analyzer
      </h1>

      {/* CENTERED CONTENT WRAPPER */}
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Upload Section */}
        <div className="bg-white p-6 shadow rounded">
          <Upload setResult={setResult} />
        </div>

        {/* Result Panel Section */}
        {result && (
          <div className="bg-white p-6 shadow rounded">
            <ResultPane result={result} />
          </div>
        )}

      </div>
    </div>
  );
}
