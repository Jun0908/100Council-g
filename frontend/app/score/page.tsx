"use client";

import { useState } from "react";
import Navbar from "@/components/header/navbar";

const characters = ["vitalik", "dixon", "buffett", "thiel", "altman", "hikalipikali"];

export default function Home() {
  const [inputText, setInputText] = useState("Problem: With the rise of AI-generated content, assessing quality manually is time-consuming. Users, educators, and businesses struggle to evaluate AI-generated responses efficiently. Solution:　An automated AI evaluation tool that scores content based on coherence, originality, relevance, and accuracy. The system integrates with APIs, allowing developers to assess AI-generated text in real-time, improving content quality and user trust.");
  const [selectedCharacter, setSelectedCharacter] = useState("vitalik");
  const [scores, setScores] = useState<{ label: string; score: number }[]>([]);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  const handleScore = async () => {
    setLoading(true); // Start loading state

    try {
      const response = await fetch("/api/score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          character: selectedCharacter,
          messages: [{ role: "user", content: inputText }],
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch score");
      }

      const data = await response.json();
      setScores(data.scores);
      setFeedback(data.feedback);
    } catch (error) {
      console.error("Error fetching score:", error);
      setFeedback("An error occurred while fetching the score.");
    }

    setLoading(false); // End loading state
  };

  return (
    <div className="p-6">
      <Navbar />
      <h1 className="text-2xl font-bold mb-4">AI Scoring System</h1>

      {/* キャラクター選択 */}
      <label className="block mb-2 font-medium">Select Character:</label>
      <select
        className="w-full p-2 border rounded mb-4"
        value={selectedCharacter}
        onChange={(e) => setSelectedCharacter(e.target.value)}
      >
        {characters.map((char) => (
          <option key={char} value={char}>
            {char.charAt(0).toUpperCase() + char.slice(1)}
          </option>
        ))}
      </select>

      {/* 入力エリア */}
      <textarea
        className="w-full p-2 border rounded"
        rows={7}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter your project details here..."
      />

      {/* スコア取得ボタン */}
      <button
        onClick={handleScore}
        className={`mt-2 px-4 py-2 rounded ${loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"} text-white`}
        disabled={loading}
      >
        {loading ? "Loading..." : "Get Score"}
      </button>

      {/* スコア表示 */}
      {scores.length > 0 && (
        <table className="mt-4 w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border p-2">Criteria</th>
              <th className="border p-2">Score (out of 10)</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((s, index) => (
              <tr key={index}>
                <td className="border p-2">{s.label}</td>
                <td className="border p-2 text-center">{s.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* フィードバック表示 */}
      {feedback && (
        <div className="mt-4 p-2 border rounded bg-gray-100">
          <strong>Feedback:</strong> {feedback}
        </div>
      )}
    </div>
  );
}


