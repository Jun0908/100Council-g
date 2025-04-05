"use client";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Navbar from "@/components/header/navbar";
import PredictionMarketAbi from "../../contracts/PredictionMarket.json";

const CONTRACT_ADDRESS = "0x208f38670a2ef67e6c0a6579a10191fbd7a1b535";

export default function Home() {
  const [question, setQuestion] = useState("Will Bitcoin exceed $100K this year?");
  const [yesVotes, setYesVotes] = useState(0);
  const [noVotes, setNoVotes] = useState(0);
  const [resolved, setResolved] = useState(false);
  const [outcomeYes, setOutcomeYes] = useState(false);
  const [loading, setLoading] = useState(false);
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [owner, setOwner] = useState<string | null>(null);

  useEffect(() => {
    async function init() {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contractInstance = new ethers.Contract(CONTRACT_ADDRESS, PredictionMarketAbi, signer);
        setContract(contractInstance);

        const address = await signer.getAddress();
        setAccount(address);

        const contractOwner = await contractInstance.owner();
        setOwner(contractOwner);

        // 初回データ取得
        await fetchContractData(contractInstance);
      }
    }
    init();
  }, []);

  useEffect(() => {
    console.log("account: ", account);
    console.log("owner: ", owner);
  }, [account, owner]);

  // コントラクトのデータを取得する関数
  const fetchContractData = async (contractInstance?: ethers.Contract) => {
    const instance = contractInstance || contract;
    if (!instance) return; // ✅ インスタンスがnullなら処理を終了
  
    try {
      const [yes, no, resolvedFlag, outcomeFlag] = await Promise.all([
        instance.totalYes(),
        instance.totalNo(),
        instance.resolved(),
        instance.outcomeYes(),
      ]);
  
      setYesVotes(parseFloat(ethers.utils.formatEther(yes)));
      setNoVotes(parseFloat(ethers.utils.formatEther(no)));
      setResolved(resolvedFlag);
      setOutcomeYes(outcomeFlag);
    } catch (error) {
      console.error("Error fetching contract data:", error);
    }
  };
  

  const handleVote = async (voteYes: boolean) => {
    if (!contract) return alert("Please install MetaMask or connect to the contract");
    setLoading(true);
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const tx = await contract.connect(signer).vote(voteYes, {
        value: ethers.utils.parseEther("0.01"),
      });
      await tx.wait();
      alert("Vote submitted!");

      // 投票後にデータ更新
      await fetchContractData();
    } catch (error) {
      console.error(error);
      alert("Error submitting vote");
    }
    setLoading(false);
  };

  const handleResolveMarket = async (outcomeYes: boolean) => {
    if (!contract) return alert("Contract not connected");
    if (account !== owner) return alert("Only the owner can resolve the market");

    setLoading(true);
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const tx = await contract.connect(signer).resolveMarket(outcomeYes);
      await tx.wait();
      alert(`Market resolved as ${outcomeYes ? "YES" : "NO"}`);

      // マーケット決着後にデータ更新
      await fetchContractData();
    } catch (error) {
      console.error(error);
      alert("Error resolving market");
    }
    setLoading(false);
  };

  const handleWithdraw = async () => {
    if (!contract) return alert("Contract not connected");
    setLoading(true);
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const tx = await contract.connect(signer).withdraw();
      await tx.wait();
      alert("Withdrawal successful!");

      // 引き出し後もデータ更新
      await fetchContractData();
    } catch (error) {
      console.error(error);
      alert("Error withdrawing funds");
    }
    setLoading(false);
  };

  const total = yesVotes + noVotes;
  const yesPercentage = total > 0 ? (yesVotes / total) * 100 : 50;
  const noPercentage = total > 0 ? (noVotes / total) * 100 : 50;

  return (
    <div className="flex flex-col items-center p-10 max-w-lg mx-auto">
      <Navbar />
      <h1 className="text-3xl font-bold">Prediction Market</h1>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="mt-4 px-3 py-2 border border-gray-300 rounded-md w-full"
        placeholder="Enter your prediction question"
      />

      {/* 投票数を表示 */}
      <div className="mt-6 w-full text-center">
        <p className="text-lg mb-2">Yes Votes: {yesVotes} ETH</p>
        <p className="text-lg mb-2">No Votes: {noVotes} ETH</p>
        <p className="text-lg">Total Votes: {total} ETH</p>
      </div>

      {/* 投票割合バー */}
      <div className="w-full max-w-md h-6 bg-gray-300 rounded-full mt-4 relative overflow-hidden flex">
        <div className="h-6 bg-green-500" style={{ width: `${yesPercentage}%` }}></div>
        <div className="h-6 bg-red-500" style={{ width: `${noPercentage}%` }}></div>
      </div>

      {/* 投票ボタン */}
      {!resolved && (
        <div className="flex space-x-4 mt-6">
          <button
            onClick={() => handleVote(true)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg"
            disabled={loading}
          >
            YES
          </button>
          <button
            onClick={() => handleVote(false)}
            className="px-4 py-2 bg-red-600 text-white rounded-lg"
            disabled={loading}
          >
            NO
          </button>
        </div>
      )}

      {/* オーナー専用マーケット決着ボタン */}
      {account === owner && !resolved && (
        <div className="flex space-x-4 mt-6">
          <button
            onClick={() => handleResolveMarket(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            disabled={loading}
          >
            Resolve as YES
          </button>
          <button
            onClick={() => handleResolveMarket(false)}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg"
            disabled={loading}
          >
            Resolve as NO
          </button>
        </div>
      )}

      {/* Withdrawボタン */}
      {resolved && (
        <button
          onClick={handleWithdraw}
          className="mt-6 px-4 py-2 bg-yellow-600 text-white rounded-lg"
          disabled={loading}
        >
          Withdraw Funds
        </button>
      )}
    </div>
  );
}
