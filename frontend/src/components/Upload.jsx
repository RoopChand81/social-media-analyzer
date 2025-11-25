import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

export default function Upload({ setResult }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      setSelectedFile(acceptedFiles[0]);
      setResult(null);
      setError(null);
    }
  }, [setResult]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [], "image/*": [] },
    maxSize: 10 * 1024 * 1024,
    onDropRejected: (fileRejections) => {
      const msg = fileRejections?.[0]?.errors?.[0]?.message || "File rejected";
      setError(msg);
    },
    onDragEnter: () => setDragActive(true),
    onDragLeave: () => setDragActive(false),
  });

  const upload = async () => {
    if (!selectedFile) return setError("Please select a file first.");
    setLoading(true);
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
      setError(err?.response?.data?.message || err.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div
        {...getRootProps()}
        className={`border-dashed border-2 p-6 rounded cursor-pointer ${dragActive || isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-white"}`}
      >
        <input {...getInputProps()} />
        <div className="text-center">
          <p className="font-medium">Drag & drop a PDF or image here, or click to browse</p>
          <p className="text-sm text-gray-500">Allowed: PDF, JPG, PNG — Max 10MB</p>
          {selectedFile && (
            <div className="mt-3 text-sm text-left">
              <div><strong>Selected:</strong> {selectedFile.name}</div>
              <div><strong>Size:</strong> {(selectedFile.size / 1024).toFixed(0)} KB</div>
            </div>
          )}
        </div>
      </div>

      {error && <div className="text-red-600 mt-3">{error}</div>}

      <div className="mt-4 flex items-center gap-3">
        <button
          disabled={loading || !selectedFile}
          onClick={upload}
          className={`px-4 py-2 rounded text-white ${loading || !selectedFile ? "bg-gray-400" : "bg-blue-600"}`}
        >
          {loading ? "Processing..." : "Extract Text"}
        </button>
        <button
          onClick={() => { setSelectedFile(null); setResult(null); setError(null); }}
          className="px-3 py-2 rounded border"
        >
          Clear
        </button>
      </div>

      {loading && (
        <div className="mt-4">
          <div className="text-sm mb-1">Processing... {progress}%</div>
          <div className="w-full bg-gray-200 rounded h-2">
            <div className="h-2 rounded bg-blue-600" style={{ width: progress + "%" }} />
          </div>
        </div>
      )}
    </div>
  );
}