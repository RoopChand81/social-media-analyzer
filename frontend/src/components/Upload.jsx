import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

export default function Upload({ setResult }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        setSelectedFile(acceptedFiles[0]);
        setResult(null);
        setError(null);
      }
    },
    [setResult]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [], "image/*": [] },
    maxSize: 10 * 1024 * 1024,
    onDropRejected: (fileRejections) => {
      const msg =
        fileRejections?.[0]?.errors?.[0]?.message || "File rejected";
      setError(msg);
    },
    onDragEnter: () => setDragActive(true),
    onDragLeave: () => setDragActive(false),
  });

  const upload = async () => {
    if (!selectedFile) return setError("Please select a file first.");
    setLoading(true);
    setProgress(0);
    setError(null);

    const form = new FormData();
    form.append("file", selectedFile);

    try {
      const res = await axios.post("https://social-media-analyzer-backend-80hw.onrender.com/api/upload", form, {
        onUploadProgress: (e) => {
          const p = Math.round((e.loaded * 100) / e.total);
          setProgress(p);
        },
      });

      setResult(res.data);
    } catch (err) {
      setError(
        err?.response?.data?.message || err.message || "Upload failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">

      {/* Dropzone Container */}
      <div
        {...getRootProps()}
        className={`
          p-10 border-2 border-dashed rounded-2xl transition-all duration-300 cursor-pointer
          bg-gradient-to-br from-gray-900 to-black text-gray-200
          shadow-lg hover:shadow-2xl
          ${
            dragActive || isDragActive
              ? "border-blue-500 bg-gray-800"
              : "border-gray-600"
          }
        `}
      >
        <input {...getInputProps()} />

        <div className="text-center">
          <p className="text-xl font-semibold">Upload Your File</p>
          <p className="text-sm text-gray-400">
            PDF, PNG, JPG — Max 10MB
          </p>

          {selectedFile && (
            <div className="mt-5 bg-gray-800 p-4 rounded-xl shadow-inner text-left space-y-1">
              <p>
                <span className="font-semibold text-blue-400">File:</span>{" "}
                {selectedFile.name}
              </p>
              <p>
                <span className="font-semibold text-green-400">Size:</span>{" "}
                {(selectedFile.size / 1024).toFixed(1)} KB
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="text-red-400 bg-red-900/30 p-3 rounded-md text-sm font-semibold shadow">
          ⚠ {error}
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          disabled={loading || !selectedFile}
          onClick={upload}
          className={`px-6 py-2 rounded-md font-semibold text-white transition-colors
          ${
            loading || !selectedFile
              ? "bg-gray-700 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 shadow-md"
          }`}
        >
          {loading ? "Processing..." : "Analyze Content"}
        </button>

        <button
          onClick={() => {
            setSelectedFile(null);
            setResult(null);
            setError(null);
          }}
          className="px-5 py-2 rounded-md font-semibold border border-gray-500 
          text-gray-200 bg-gray-800 hover:bg-gray-700 shadow"
        >
          Clear
        </button>
      </div>

      {/* Progress Bar */}
      {loading && (
        <div className="mt-4">
          <div className="text-sm mb-1 text-gray-300">
            Uploading... {progress}%
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden shadow-inner">
            <div
              className="bg-blue-500 h-2 transition-all duration-200"
              style={{ width: progress + "%" }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
