// =============================
// 🖥️ サーバー (Express + ethers)
// =============================
// server/index.ts

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { ethers } from 'ethers';
import QuadraticVotingAbi from './contracts/QuadraticVoting.json';

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 3001;
//const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS || '0xd644eeb2217d02f167e8865fff55079fc140e971';
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS || '0x5e93b89902507cafc64d4ef251dd8b3776059fc9';
const RPC_URL = process.env.RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

if (!RPC_URL || !PRIVATE_KEY) {
  throw new Error('Missing RPC_URL or PRIVATE_KEY');
}

const provider = new ethers.JsonRpcProvider(RPC_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
const contract = new ethers.Contract(CONTRACT_ADDRESS, QuadraticVotingAbi, wallet);

// 🔐 サーバー起動時に自分を登録（未登録なら）
(async () => {
  try {
    const credits = await contract.getCredits(wallet.address);
if (Number(credits) === 0) {
  console.log('Registering server wallet as voter...');
  const tx = await contract.registerVoter();
  await tx.wait();
  console.log('✅ Server wallet registered successfully.');
} else {
  console.log('✅ Server wallet already registered.');
}
  } catch (err) {
    console.error('❌ Failed to check or register server wallet:', err);
  }
})();

app.get('/api/ideas', async (_, res) => {
  try {
    const ideas = await contract.getIdeas();
    const formatted = ideas.map((idea: any) => ({
      id: idea.id.toNumber(),
      text: idea.text,
      score: idea.score.toNumber(),
    }));
    res.json(formatted);
  } catch (e: any) {
    res.status(500).json({ error: 'Failed to get ideas: ' + e.message });
  }
});

app.get('/api/credits', async (_, res) => {
  try {
    const credits = await contract.getCredits(wallet.address);
    res.json({ credits: credits.toNumber() });
  } catch (e: any) {
    res.status(500).json({ error: 'Failed to get credits: ' + e.message });
  }
});

app.post('/api/register', async (_, res) => {
  try {
    const tx = await contract.registerVoter();
    const receipt = await tx.wait();
    res.json({ txHash: receipt.transactionHash });
  } catch (e: any) {
    res.status(500).json({ error: 'Register failed: ' + e.message });
  }
});

app.post('/api/vote', async (req, res) => {
  const { ideaId, numVotes } = req.body;
  try {
    console.log(`🗳️ Voting on idea ${ideaId} with ${numVotes} vote(s)`);
    const tx = await contract.vote(ideaId, numVotes);
    const receipt = await tx.wait();
    console.log(`✅ Voted! TX: ${receipt.transactionHash}`);
    res.json({ txHash: receipt.transactionHash }); // ← ここが反応の決め手
  } catch (e: any) {
    console.error('❌ Vote failed:', e);
    res.status(500).json({ error: 'Vote failed: ' + e.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

