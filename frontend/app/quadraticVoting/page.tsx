// pages/index.tsx
"use client";
import { useState } from "react";
import Navbar from "@/components/header/navbar";

interface Idea {
  id: number;
  text: string;
  score: number;
}

interface VoteDetail {
  character: string;
  votes: number[];
  ideaNames: string[];
}

export default function Home() {
  const [ideas, setIdeas] = useState<Idea[]>([
    { id: 1, text: "A decentralized finance (DeFi) lending platform", score: 0 },
    { id: 2, text: "An AI-powered health diagnostics tool", score: 0 },
    { id: 3, text: "A blockchain-based supply chain tracking system", score: 0 },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [voteDetails, setVoteDetails] = useState<VoteDetail[]>([]);

  const handleScore = async () => {
    setLoading(true);
    setError("");
    try {
      console.log("📡 Sending request to /api/idea-score...");
      const response = await fetch("/api/idea-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ideas }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      console.log("✅ Response received:", data);

      if (data.scores && Array.isArray(data.scores) && data.scores.length === 3) {
        setIdeas((prevIdeas) =>
          prevIdeas.map((idea, index) => ({
            ...idea,
            score: data.scores[index],
          }))
        );
      }

      if (data.voteDetails && Array.isArray(data.voteDetails)) {
        setVoteDetails(data.voteDetails);
      }
    } catch (err: any) {
      console.error("❌ Error fetching scores:", err.message);
      setError("Failed to fetch scores. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 pb-24"> {/* 下に余白を追加 */}
    <Navbar />
      <h1 className="text-2xl font-bold mb-4">Quadratic Voting System</h1>
      <p className="mb-2">Three AI agents will distribute votes among the ideas using quadratic voting.</p>
      {ideas.map((idea) => (
        <div key={idea.id} className="mb-4 border p-4 rounded">
          <textarea
            className="w-full p-2 border rounded"
            rows={2}
            value={idea.text}
            readOnly
          />
          <p className="mt-2 font-semibold">Total Score: {idea.score.toFixed(2)}</p>
        </div>
      ))}
      <button
        onClick={handleScore}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        disabled={loading}
      >
        {loading ? "Processing..." : "Vote"}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}

      {voteDetails.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-bold">Vote Breakdown</h2>
          <table className="mt-2 w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border p-2">Character</th>
                {ideas.map((idea, index) => (
                  <th key={index} className="border p-2">{idea.text}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {voteDetails.map((vote, index) => (
                <tr key={index}>
                  <td className="border p-2 font-semibold">{vote.character}</td>
                  {vote.votes.map((v, i) => (
                    <td key={i} className="border p-2 text-center">{v.toFixed(2)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
