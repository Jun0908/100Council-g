"use client";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import VCGAbi from "../../contracts/VCGAuction.json"; // ← 実際のABIパスに変更
import Navbar from "@/components/header/navbar";
const CONTRACT_ADDRESS = "0x86c5337036dfd07fe7df0cadb7a702fdb6cf0eeb"; // ← 実際のアドレスに変更

interface Bid {
  bidder: string;
  value: string; // ETH string形式で扱う
}

export default function Home() {
  const [account, setAccount] = useState<string>("");
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [bids, setBids] = useState<Bid[]>([]);
  const [bidAmount, setBidAmount] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    async function init() {
      if (!window.ethereum) {
        setStatus("MetaMask not detected");
        return;
      }
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);

        const contractInstance = new ethers.Contract(
          CONTRACT_ADDRESS,
          VCGAbi,
          signer
        );
        setContract(contractInstance);
        setStatus("Connected");

        const bidsData = await contractInstance.getBids();
        const formatted = bidsData.map((b: any) => ({
          bidder: b.bidder,
          value: ethers.utils.formatEther(b.value),
        }));
        setBids(formatted);
      } catch (err) {
        console.error(err);
        setStatus("Error connecting to contract");
      }
    }
    init();
  }, []);

  const placeBid = async () => {
    if (!contract || !bidAmount) return;
    try {
      const tx = await contract.placeBid({
        value: ethers.utils.parseEther(bidAmount),
      });
      await tx.wait();
      setStatus("Bid placed");
      setBidAmount("");

      const bidsData = await contract.getBids();
      const formatted = bidsData.map((b: any) => ({
        bidder: b.bidder,
        value: ethers.utils.formatEther(b.value),
      }));
      setBids(formatted);
    } catch (err) {
      console.error(err);
      setStatus("Error placing bid");
    }
  };

  const finalize = async () => {
    if (!contract) return;
    try {
      const tx = await contract.finalize();
      await tx.wait();
      setStatus("Auction finalized");
    } catch (err) {
      console.error(err);
      setStatus("Finalization failed");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
    <Navbar />
      <h1 className="text-2xl font-bold mb-4">VCG Auction: Buy 1 Hour of Vitaliks Time</h1>
      <p>Status: {status}</p>
      <p>Your Account: {account}</p>

      <div className="my-4">
        <input
          type="text"
          value={bidAmount}
          onChange={(e) => setBidAmount(e.target.value)}
          placeholder="Enter your bid (ETH)"
          className="border px-3 py-2 mr-2"
        />
        <button
          onClick={placeBid}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Place Bid
        </button>
      </div>

      <button
        onClick={finalize}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Finalize Auction
      </button>

      <h2 className="text-xl font-semibold mt-6 mb-2">Current Bids</h2>
      <ul className="space-y-1">
        {bids.map((bid, index) => (
          <li key={index} className="border px-4 py-2 rounded bg-gray-100">
            {bid.bidder.slice(0, 6)}...: {bid.value} ETH
          </li>
        ))}
      </ul>
    </div>
  );
}
