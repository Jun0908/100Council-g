"use client"; // If App Router

import { useEffect, useState } from "react";
import Navbar from "@/components/header/navbar";

export default function Home() {
  const [question, setQuestion] = useState("Is artificial intelligence more beneficial or dangerous for humanity?");
  const [yesCount, setYesCount] = useState(0);
  const [noCount, setNoCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleVote = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/llm-vote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      console.log("✅ Received data:", data);

      const { yesCount = 0, noCount = 0 } = data;
      setYesCount(yesCount);
      setNoCount(noCount);
    } catch (error) {
      console.error("❌ Error in voting process:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-10 max-w-lg mx-auto">
      <Navbar />
      <h1 className="text-3xl font-bold mb-4">Prediction Market (100 voters)</h1>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="mt-4 px-3 py-2 border border-gray-300 rounded-md w-full"
        placeholder="Enter your prediction question"
      />
      <button
        onClick={handleVote}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg mt-4"
      >
        {loading ? "Voting..." : "Let 100 LLMs Decide"}
      </button>

      <div className="mt-6 flex flex-col items-center space-y-2">
        <p className="text-xl">Yes Count: {yesCount}</p>
        <p className="text-xl">No Count: {noCount}</p>
      </div>
    </div>
  );
}

