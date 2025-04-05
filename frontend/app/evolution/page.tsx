"use client";

import React, { useState } from "react";
import Navbar from "@/components/header/navbar";

export default function Home() {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");

  // JSON を Pinecone にアップロード
  const handleUpload = async () => {
    setUploadMessage("Uploading...");
    try {
      const res = await fetch("/api/embed", { method: "POST" });
      if (res.ok) {
        setUploadMessage("Upload success!");
      } else {
        setUploadMessage("Upload failed...");
      }
    } catch (e) {
      console.error(e);
      setUploadMessage("Error: " + String(e));
    }
  };

  // クエリを投げて回答を取得
  const handleAsk = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setAnswer("");

    try {
      const res = await fetch("/api/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const data = await res.json();
      setAnswer(data.answer);
    } catch (e) {
      console.error(e);
      setAnswer("Error: " + String(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-4">
      <Navbar />
      <button onClick={handleUpload} className="bg-blue-500 text-white px-3 py-1 rounded">
        Upload JSON to Pinecone
      </button>
      <p>{uploadMessage}</p>

      <div className="mt-4">
        <input
          type="text"
          value={query}
          placeholder="Ask a question..."
          onChange={(e) => setQuery(e.target.value)}
          className="border px-2 py-1 rounded w-full max-w-md"
        />
        <button
          onClick={handleAsk}
          className="bg-green-500 text-white px-3 py-1 ml-2 rounded"
        >
          {loading ? "Loading..." : "Ask"}
        </button>
      </div>

      {answer && (
        <div className="mt-4 p-4 border rounded w-full max-w-md bg-gray-100">
          <strong>Answer:</strong>
          <p>{answer}</p>
        </div>
      )}
    </main>
  );
}

