import axios from "axios";
import { toast } from "@/components/ui/use-toast";

import { ChatCompletionRequestMessage } from "openai";
type Message = ChatCompletionRequestMessage & {
  event?: {
    embedPage?: {
      type: "iframe" | "component";
      url?: string;
      componentId?: string;
    };
  };
};



export type TriggerAction = {
  check: (input: string) => boolean;
  action: (input: string) => Promise<Message | null>;
};

let pendingSend = {
  awaiting: null as null | "recipient" | "amount",
  recipient: "",
  amount: "",
};

interface PendingVote {
  awaiting: 'ideaId' | 'numVotes' | null;
  ideaId?: number;
  numVotes?: number;
}

const pendingVote: PendingVote = {
  awaiting: null,
};

let pendingMint = {
  awaiting: null as null | "tokenId" | "cid",
  recipient: "0x07015272611BA0654AB0C7E72f971d54d4Ad2f22",
  tokenId: 0,
  cid: "",
};

let userAddress = "";

export const triggerActions: TriggerAction[] = [
  {
    check: (input) => input.toLowerCase().includes("offer coins"),
    action: async () => {
      try {
        const contractData = {
          recipient: "0x4DCf63CcD612bf1afC6E216EAFc20DDaf5071d40",
          amount: "0.01",
        };

        const res = await axios.post("http://localhost:3001/api/trigger-contract", contractData);

        return {
          role: "system",
          content: `🎉 Contract executed successfully! TX Hash: ${res.data.txHash}`,
        };
      } catch (error) {
        console.error("Contract execution error:", error);
        toast({
          variant: "destructive",
          title: "Contract execution error",
          description: "An error occurred.",
        });
        return null;
      }
    },
  },

  // ✅ ETH balance check
  {
    check: (input) => input.toLowerCase().includes("check balance"),
    action: async () => {
      try {
        const prompt = "Check my ETH balance on Sepolia.";
        const res = await axios.post("http://localhost:3001/api/evm-send-and-receive-tokens", { prompt });

        return {
          role: "system",
          content: `💰 Sepolia ETH Balance:\n${res.data.result}`,
        };
      } catch (error) {
        console.error("ETH balance check error:", error);
        toast({
          variant: "destructive",
          title: "ETH balance check error",
          description: "An error occurred while checking ETH balance.",
        });
        return null;
      }
    },
  },

  // ✅ Send Token flow
  {
    check: (input) => input.toLowerCase().includes("send token"),
    action: async () => {
      pendingSend.awaiting = "recipient";
      return {
        role: "system",
        content: "📝 Who do you want to send tokens to? (Please provide the recipient address)",
      };
    },
  },
  {
    check: () => pendingSend.awaiting === "recipient",
    action: async (input: string) => {
      pendingSend.recipient = input.trim();
      pendingSend.awaiting = "amount";
      return {
        role: "system",
        content: "💰 How much ETH do you want to send?",
      };
    },
  },
  {
    check: () => pendingSend.awaiting === "amount",
    action: async (input: string) => {
      pendingSend.amount = input.trim();
      pendingSend.awaiting = null;

      const prompt = `Send ${pendingSend.amount} ETH to ${pendingSend.recipient} on Sepolia network.`;
      try {
        const res = await axios.post("http://localhost:3001/api/evm-send-and-receive-tokens", { prompt });
        return {
          role: "system",
          content: `📤 Token sent:\n${res.data.result}`,
        };
      } catch (error) {
        console.error("Token send error:", error);
        toast({
          variant: "destructive",
          title: "Send token error",
          description: "An error occurred while sending tokens.",
        });
        return null;
      }
    },
  },
//✅ Voting system Flow
{
  check: (input: string) => input.trim().toLowerCase() === 'vote',
  action: async () => {
    pendingVote.awaiting = 'ideaId';
    return {
      role: 'system',
      content: `🧠 Please select the idea you want to vote for by typing its ID (e.g. 'id1', 'id2', 'id3'):

🆔 ID 1: A decentralized finance (DeFi) lending platform
🆔 ID 2: An AI-powered health diagnostics tool
🆔 ID 3: A blockchain-based supply chain tracking system`,
    };
  },
},

{
  check: () => pendingVote.awaiting === 'ideaId',
  action: async (input: string) => {
    const match = input.trim().match(/id(\d{1,3})/i);
    if (!match) {
      return {
        role: 'system',
        content: "⚠️ Please type something like 'id1', 'id2', or 'id3'.",
      };
    }

    const ideaId = parseInt(match[1], 10);
    pendingVote.ideaId = ideaId;
    pendingVote.awaiting = 'numVotes';

    return {
      role: 'system',
      content: `🗳️ How many votes do you want to cast for idea ID ${ideaId}? (Type 'vote1', 'vote2', or 'vote3')`,
    };
  },
},

{
  check: () => pendingVote.awaiting === 'numVotes',
  action: async (input: string) => {
    const match = input.trim().match(/vote([123])/i);
    if (!match) {
      return {
        role: 'system',
        content: "⚠️ Please enter a valid vote amount using 'vote1', 'vote2', or 'vote3'.",
      };
    }

    const numVotes = parseInt(match[1], 10);
    pendingVote.numVotes = numVotes;
    pendingVote.awaiting = null;

    try {
      const voteRes = await axios.post('http://localhost:3001/api/vote', {
        ideaId: pendingVote.ideaId,
        numVotes: pendingVote.numVotes,
      });

      return {
        role: 'system',
        content: `✅ Successfully voted ${numVotes} vote(s) for Idea #${pendingVote.ideaId}.
TX Hash: ${voteRes.data.txHash}`,
      };
    } catch (error: any) {
      const reason = error?.response?.data?.error || 'Voting failed';
      return {
        role: 'system',
        content: `⚠️ Voting failed. Reason: ${reason}`,
      };
    }
  },
},

//✅ mint NFT
{
  check: (input) => input.toLowerCase().includes("mint nft"),
  action: async () => {
    pendingMint.awaiting = "tokenId";
    return {
      role: "system",
      content: "🧾 Please enter the token ID you'd like to mint (e.g., id1).",
    };
  },
},
{
  check: () => pendingMint.awaiting === "tokenId",
  action: async (input) => {
    const matched = input.trim().match(/^id(\d+)$/i);
    if (!matched) {
      return {
        role: "system",
        content: "❌ Invalid format. Please enter in the format like `id1`, `id12`.",
      };
    }

    const parsed = parseInt(matched[1], 10);
    if (isNaN(parsed)) {
      return {
        role: "system",
        content: "❌ Could not extract a numeric token ID. Try again like `id3`.",
      };
    }

    pendingMint.tokenId = parsed;
    pendingMint.awaiting = "cid";

    return {
      role: "system",
      content: "📦 Please enter the IPFS CID for the NFT metadata (e.g., Qm...cid).",
    };
  },
},
{
  check: () => pendingMint.awaiting === "cid",
  action: async (input) => {
    pendingMint.cid = input.trim();
    pendingMint.awaiting = null;

    try {
      const res = await axios.post("http://localhost:3001/api/mint-nft", {
        tokenId: pendingMint.tokenId,
        cid: pendingMint.cid,
      });

      console.log("Mint response:", res.data);
      
      const explorerURL = `https://sepolia.etherscan.io/tx/${res.data.txHash}`;

      return {
      role: "system",
      content: `✅ NFT minted successfully!\nToken ID: ${pendingMint.tokenId}\n🔗 [View on Etherscan](${explorerURL})`,
      };

    } catch (error) {
      console.error("NFT minting error:", error);
      toast({
        variant: "destructive",
        title: "Minting error",
        description: "An error occurred while minting NFT.",
      });
      return {
        role: "system",
        content: `❌ Minting failed. Please try again.`,
      };
    }
  },
},
];


