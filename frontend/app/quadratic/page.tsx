"use client";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
// Navbar コンポーネントをお使いの場合は適宜 import してください
import Navbar from "@/components/header/navbar";

import QuadraticVotingAbi from "../../contracts/QuadraticVoting.json";; 
// ↑ ABIのパスを実際のものに書き換えてください

const CONTRACT_ADDRESS = "0x5e93b89902507cafc64d4ef251dd8b3776059fc9"; 

interface Idea {
  id: number;
  text: string;
  score: number;
}

export default function Home() {
  // ステート変数
  const [account, setAccount] = useState<string>("");
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [credits, setCredits] = useState<number>(0);
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function init() {
      if (!window.ethereum) {
        setError("MetaMask がインストールされていません");
        return;
      }
      try {
        // ウォレット接続
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        
        // スマートコントラクトに接続
        const contractInstance = new ethers.Contract(
          CONTRACT_ADDRESS,
          QuadraticVotingAbi,
          signer
        );
        setContract(contractInstance);

        // ユーザアドレス取得
        const userAddr = await signer.getAddress();
        setAccount(userAddr);

        // Ideas一覧取得
        const results = await contractInstance.getIdeas();
        const mappedIdeas = results.map((idea: any) => ({
          id: idea.id.toNumber(),
          text: idea.text,
          score: idea.score.toNumber(),
        }));
        setIdeas(mappedIdeas);

        // ユーザのクレジット残高を取得
        const userCredits = await contractInstance.getCredits(userAddr);
        setCredits(userCredits.toNumber());
      } catch (err) {
        console.error(err);
        setError("ウォレット接続エラー: " + (err as Error).message);
      }
    }
    init();
  }, []);

  // ユーザ登録 (14クレジット付与)
  async function registerVoter() {
    if (!contract) return;
    try {
      const tx = await contract.registerVoter();
      await tx.wait();
      alert("Registered as voter. You now have 14 credits!");

      // 最新のクレジットを取得
      const userCredits = await contract.getCredits(account);
      setCredits(userCredits.toNumber());
    } catch (err) {
      console.error(err);
      setError("Register error: " + (err as Error).message);
    }
  }

  // Vote処理
  // numVotes = 1, 2, or 3
  async function handleVote(ideaId: number, numVotes: number) {
    if (!contract) return;
    try {
      const tx = await contract.vote(ideaId, numVotes);
      await tx.wait();

      alert(`Voted ${numVotes} votes for Idea #${ideaId}.`);

      // Ideas一覧を更新
      const updatedIdeas = await contract.getIdeas();
      setIdeas(
        updatedIdeas.map((idea: any) => ({
          id: idea.id.toNumber(),
          text: idea.text,
          score: idea.score.toNumber(),
        }))
      );

      // クレジット数を更新
      const updatedCredits = await contract.getCredits(account);
      setCredits(updatedCredits.toNumber());
    } catch (err) {
      console.error(err);
      setError("Voting error: " + (err as Error).message);
    }
  }

  return (
    <div className="p-6 pb-24">
      {/* <Navbar />  ← もしNavbar使うならコメント解除 */}
      <Navbar />
      <h1 className="text-2xl font-bold mb-4">Quadratic Voting System</h1>

      {error && <p className="text-red-500">{error}</p>}

      <div className="my-2">
        <p>Connected Account: {account}</p>
        <p>Credits Remaining: {credits}</p>
      </div>

      {/* Registerボタン (まだ未登録の場合) */}
      {credits === 0 && (
        <button
          onClick={registerVoter}
          className="px-4 py-2 bg-blue-500 text-white rounded mt-2"
        >
          Register (Get 14 Credits)
        </button>
      )}

      {/* アイデア一覧 */}
      <div className="mt-6">
        {ideas.map((idea) => (
          <div key={idea.id} className="mb-4 border p-4 rounded">
            <p className="font-semibold">ID {idea.id}: {idea.text}</p>
            <p className="mt-1">Total Score: {idea.score}</p>

            <div className="mt-2 flex gap-2">
              {/* Vote 1 => cost=1 */}
              <button
                onClick={() => handleVote(idea.id, 1)}
                disabled={credits < 1} // 1以下なら投票不可
                className="bg-green-500 text-white px-3 py-1 rounded"
              >
                Vote 1 (cost=1)
              </button>
              
              {/* Vote 2 => cost=4 */}
              <button
                onClick={() => handleVote(idea.id, 2)}
                disabled={credits < 4}
                className="bg-green-500 text-white px-3 py-1 rounded"
              >
                Vote 2 (cost=4)
              </button>

              {/* Vote 3 => cost=9 */}
              <button
                onClick={() => handleVote(idea.id, 3)}
                disabled={credits < 9}
                className="bg-green-500 text-white px-3 py-1 rounded"
              >
                Vote 3 (cost=9)
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
