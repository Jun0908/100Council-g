// 🔹 wagmi + RainbowKit + Privy 用の設定ファイル

import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import { createConfig, http } from "wagmi";
import {
  mainnet,
  sepolia,
  celo,
  celoAlfajores,
  flowTestnet,
  hashkeyTestnet,
  polygon,
  rootstockTestnet,
  worldchainSepolia
} from "wagmi/chains";
import { toPrivyWallet } from "@privy-io/cross-app-connect/rainbow-kit";
import type { Chain } from "wagmi/chains";

/* 🔹 Manta Pacific を追加（"network" フィールドは削除）
export const mantaPacific: Chain = {
  id: 169,
  name: "Manta Pacific",
  nativeCurrency: {
    name: "Manta Token",
    symbol: "MANTA",
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ["https://pacific-rpc.manta.network/http"] },
    public: { http: ["https://pacific-rpc.manta.network/http"] },
  },
  blockExplorers: {
    default: {
      name: "Manta Pacific Explorer",
      url: "https://pacific-explorer.manta.network",
    },
  },
  testnet: false,
};
*/

// 🔹 chains 配列（最低1つは必須、as const は避ける）
export const chains: [Chain, ...Chain[]] = [
  mainnet,
  sepolia,
  celo,
  celoAlfajores,
  flowTestnet,
  hashkeyTestnet,
  polygon,
  rootstockTestnet,
  worldchainSepolia
];

// 🔹 Wallet Connector 設定
const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets: [
        toPrivyWallet({
          id: "cm7a2v9xr033reh5g4kd3i7a0",
          name: "Strawberry Fields",
          iconUrl:
            "https://privy-assets-public.s3.amazonaws.com/strawberry.png",
        }),
      ],
    },
  ],
  {
    appName: "test1031",
    projectId: "87e3393ad461835eee829b8e6adc2c3a",
  }
);

// 🔹 wagmi Config の作成（transports も全て記述）
export const PrivyConnector = createConfig({
  chains,
  connectors,
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [celo.id]: http(),
    [celoAlfajores.id]: http(),
    [flowTestnet.id]: http(),
    [hashkeyTestnet.id]: http(),
    [polygon.id]: http(),
    [rootstockTestnet.id]: http(),
    [worldchainSepolia.id]: http(),
  },
  ssr: true,
});
