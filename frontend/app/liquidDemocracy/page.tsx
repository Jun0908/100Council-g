"use client";

import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Navbar from "@/components/header/navbar";
import LiquidDemocracyAbi from "../../contracts/LiquidDemocracy.json";

const CONTRACT_ADDRESS = "0x74cf78c3f04b64ebaa6750a68eab89335b10c3fe";

export default function Home() {
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [proposals, setProposals] = useState<number[]>([]);
  const [proposalVotes, setProposalVotes] = useState<Record<number, number>>({});
  const [delegateAddress, setDelegateAddress] = useState<string>("");
  const [owner, setOwner] = useState<string | null>(null);

  useEffect(() => {
    async function init() {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contractInstance = new ethers.Contract(CONTRACT_ADDRESS, LiquidDemocracyAbi, signer);
        setContract(contractInstance);
        
        const address = await signer.getAddress();
        setAccount(address);
        
        const contractOwner = await contractInstance.owner();
        setOwner(contractOwner);
      }
    }
    init();
  }, []);

  async function fetchVotes() {
    if (!contract) return;
    const votesData: Record<number, number> = {};
    for (let i = 0; i < 3; i++) { // Assuming 3 proposals
      const voteCount = await contract.getVotes(i);
      votesData[i] = voteCount.toNumber(); // Convert BigNumber to number
    }
    setProposalVotes(votesData);
  }

  async function vote(proposalId: number) {
    if (!contract) return alert("Contract not initialized");
    try {
      const hasVoted = await contract.voters(account);
      if (hasVoted.voted) {
        alert("You have already voted.");
        return;
      }
      console.log("Voting for proposal:", proposalId);
      const tx = await contract.vote(proposalId);
      console.log("Transaction sent:", tx);
      await tx.wait();
      console.log("Transaction confirmed");
      alert("Vote casted successfully!");
      fetchVotes();
    } catch (error) {
      console.error("Voting error:", error);
      alert("Error while voting: " );
    }
  }

  async function delegateVote() {
    if (!contract || !delegateAddress) return alert("Contract not initialized or address empty");
    try {
      console.log("Delegating to:", delegateAddress);
      const tx = await contract.delegate(delegateAddress);
      console.log("Transaction sent:", tx);
      await tx.wait();
      console.log("Transaction confirmed");
      alert("Delegation successful!");
    } catch (error) {
      console.error("Delegation error:", error);
      alert("Error while delegating: " );
    }
  }

  async function resetVotes() {
    if (!contract) return alert("Contract not initialized");
    if (account !== owner) return alert("Only the contract owner can reset votes.");
    try {
      console.log("Resetting votes");
      const tx = await contract.resetVotes();
      console.log("Transaction sent:", tx);
      await tx.wait();
      console.log("Transaction confirmed");
      alert("Votes reset successfully!");
      fetchVotes();
    } catch (error) {
      console.error("Reset error:", error);
      alert("Error while resetting votes: " );
    }
  }

  return (
    <div className="p-6">
      <Navbar />
      <h1 className="text-2xl font-bold">Liquid Democracy</h1>
      {account && <p className="text-gray-500">Connected: {account}</p>}
      {owner && <p className="text-gray-500">Contract Owner: {owner}</p>}

      <div className="mt-4">
        <h2 className="text-xl font-semibold">Vote for a Proposal</h2>
        {Array.from({ length: 3 }, (_, i) => (
          <button key={i} className="m-2 p-2 bg-blue-500 text-white rounded" onClick={() => vote(i)}>
            Vote for Proposal {i} ({proposalVotes[i] || 0} votes)
          </button>
        ))}
      </div>

      <div className="mt-4">
        <h2 className="text-xl font-semibold">Delegate Your Vote</h2>
        <input
          type="text"
          placeholder="Enter delegate address"
          className="border p-2 rounded w-full mt-2"
          value={delegateAddress}
          onChange={(e) => setDelegateAddress(e.target.value)}
        />
        <button className="mt-2 p-2 bg-green-500 text-white rounded" onClick={delegateVote}>
          Delegate Vote
        </button>
      </div>

      <div className="mt-4">
        <button className="p-2 bg-red-500 text-white rounded" onClick={resetVotes}>
          Reset Votes (Owner Only)
        </button>
      </div>
    </div>
  );
}