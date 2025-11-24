import React, { useState } from "react";
import Upload from "./components/Upload";
import ResultPane from "./components/ResultPane";

export default function App() {
  const [result, setResult] = useState(null);

  return (
    <div className="h-screen flex">
      {/* LEFT SIDE */}
      <div className="w-1/2 p-6 border-r overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4">Social Media Analyzer</h1>
        <Upload setResult={setResult} />
      </div>

      {/* RIGHT SIDE */}
      <div className="w-1/2 p-6 bg-gray-50 overflow-y-auto">
        <ResultPane result={result} />
      </div>
    </div>
  );
}
