import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { ethers } from "ethers";
import dotenv from "dotenv";
import nftAbi from "./../contracts/IPFS_NFT.json"; // Make sure this path is correct

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 3001;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS || "0xe40a9cfe796d5487afda241596e0f70dba26019b";

// Setup ethers provider and signer
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY || "", provider);
const contract = new ethers.Contract(CONTRACT_ADDRESS, nftAbi, wallet);

/**
 * POST /api/mint-nft
 * {
 *   "recipient": "0x...",
 *   "tokenId": 1,
 *   "cid": "Qm..."
 * }
 */
app.post("/api/mint-nft", async (req: Request, res: Response) => {
  const { tokenId, cid } = req.body;

  if (tokenId === undefined || !cid) {
    return res.status(400).json({ error: "Missing tokenId or cid" });
  }

  try {
    const signerAddress = await wallet.getAddress(); // ← サーバー側のウォレットアドレス取得

    const tx = await contract.safeMint(signerAddress, tokenId, cid);
    console.log("📤 Sent TX:", tx.hash); // これを追加！

    const receipt = await tx.wait();
    console.log("📬 Receipt:", receipt);

    res.json({
      success: true,
      //txHash: receipt.transactionHash,
      txHash: tx.hash,
      tokenId,
      cid,
    });
  } catch (error) {
    console.error("Minting failed:", error);
    res.status(500).json({
      success: false,
      error: (error as Error).message || "Unknown minting error",
    });
  }
});


app.listen(PORT, () => {
  console.log(`🚀 NFT Minting Server running at http://localhost:${PORT}`);
});
