# 🐐 100Council Server

A modular Node.js + TypeScript backend powered by **Express**, **Viem**, **Goat SDK**, and **Vercel AI SDK**.  
This project handles multi-chain operations like token transfer, NFT minting, voting, and on-chain AI interactions.

---

## 📆 Tech Stack

- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)
- [Viem](https://viem.sh/)
- [Goat SDK](https://github.com/Goat-AI/goat-sdk)
- [AI SDK (Vercel)](https://sdk.vercel.ai)
- [Sepolia](https://sepolia.dev/) / [Celo](https://celo.org/) / [Flow](https://onflow.org/) / [Polygon](https://polygon.technology/)

---

## 🔧 Environment Variables

Create a `.env` file in the root directory with the following values:

```env
PRIVATE_KEY=0981e05d479eaaee3443c30427c338bc6a9ef7ef55d0cabc349e534c2efb48dc           
RPC_URL=https://eth-sepolia.g.alchemy.com/v2/uFs9XjGSKtWEqIVIaxohMeA0Gw1u1CDL                
CELO_RPC_URL=https://forno.celo.org
CELO_TEST_RPC_URL=https://alfajores-forno.celo-testnet.org
FLOW_TEST_RPC_URL=https://testnet.evm.nodes.onflow.org
POL_TEST_RPC_URL=https://polygon-amoy.g.alchemy.com/v2/uFs9XjGSKtWEqIVIaxohMeA0Gw1u1CDL       
```

> ✅ Make sure `PRIVATE_KEY` includes the `0x` prefix.

---

## 🚀 Run the Server

Run from the project root:

```bash
pnpm ts-node ./sepolia/server.ts
```

You can also run specific modules by navigating into their folders or calling them directly.

---

## 📁 Project Structure & Purpose

```
100Council-Server/
├── sepolia/
│   ├── server.ts                 # General-purpose test server (sandbox)
│   ├── q-server.ts              # Qudro Voting logic
│   ├── n-server.ts              # NFT minting logic
│   └── send-and-receive-tokens.ts # Token transfer logic
│
├── celo/
│   ├── server.ts                # Celo-specific logic (mainnet or testnet)
│   └── ...
│
├── flow/
│   ├── server.ts                # Flow EVM-compatible operations
│   └── ...
│
├── polygon/
│   ├── server.ts                # Polygon operations (tokens, NFTs)
│   └── ...
│
├── types/
│   └── global.d.ts              # Manual type declarations
├── .env
├── tsconfig.json
├── package.json
└── README.md
```


---

## 📜 License

MIT © Your Name


