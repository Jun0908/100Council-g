// Server.ts
import express from "express";
import cors from "cors";
import { config } from "dotenv";

import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

import { http } from "viem";
import { createWalletClient } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { sepolia, celo, celoAlfajores, flowTestnet, polygonAmoy } from "viem/chains";

import { getOnChainTools } from "@goat-sdk/adapter-vercel-ai";
import { sendETH } from "@goat-sdk/wallet-evm";
import { viem } from "@goat-sdk/wallet-viem";

// Load environment variables
config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

// WALLET PRIVATE KEY
const key = process.env.PRIVATE_KEY;
if (!key) throw new Error("PRIVATE_KEY is missing");

const account = privateKeyToAccount(key as `0x${string}`);

const walletClient = createWalletClient({
  account,
  transport: http(process.env.CELO_TESTNET_RPC_URL),
  chain: celoAlfajores,
});

const toolsPromise = getOnChainTools({
  wallet: viem(walletClient),
  plugins: [sendETH()], // ETH only, no ERC-20
});

// Main endpoint
app.post("/api/evm-send-and-receive-tokens", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    res.status(400).json({ error: "Prompt is required" });
    return;
  }

  try {
    const tools = await toolsPromise;

    const result = await generateText({
      model: openai("gpt-4o-mini"),
      tools,
      maxSteps: 10,
      prompt,
      onStepFinish: (event) => {
        console.log("Tool Step Result:", event.toolResults);
      },
    });

    res.json({ result: result.text });
  } catch (error) {
    console.error("Error generating text:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});