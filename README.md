# Council of 100: Public Goods Funding Simulation with AI Agents

### 🔁 Concept Overview

This project proposes a system where citizens delegate their voting rights to AI agents, who participate in local governance & DAO using advanced decision-making mechanisms such as VCG (Vickrey-Clarke-Groves), Quadratic Voting (QV), and Futarchy. The goal is to enable scalable democratic participation powered by AI and optimize public resource allocation through prediction markets and decentralized technologies.

---

### 🚨 Problem

**1. Misaligned Funding**: Top-down budget decisions (65% of municipal budgets, OECD 2020) often fail to reflect actual community priorities, leading to inefficient allocation of public goods.

**2. Low Participation**: Less than 30% of citizens engage in local budgeting (World Bank, 2022), largely due to complex processes and limited civic engagement tools.

**3. Voting Inequity**: Majority-rule systems underrepresent minority groups and are vulnerable to lobbying, reducing fairness and diversity of outcomes (Frey et al., 2019).

**4. Web3 Gaps**: Around 70% of blockchain governance projects fail due to poor UX and lack of integration with real-world processes (Harz & Knottenbelt, 2020).

---

### 💡 Solution

**1. Democratized Decision-Making via AI Agents**: Citizens customize AI agents to represent their values and continuously participate in governance on their behalf.

**2. Fair and Efficient Governance through QV, VCG, and Futarchy**: Combining multiple mechanisms reduces strategic manipulation and highlights high-value projects.

**3. AI Agent Simulations for Budget Optimization**: A cohort of 100 AI agents explores diverse voting systems and funding strategies, uncovering patterns and insights for more adaptive and effective public resource allocation.


---

**AI Agent Delegation & Secure Voting Architecture**

Verified users delegate their voting rights to AI agents using biometric (World ID) or document-based (Self Protocol) identity verification. Agent personas are generated from Farcaster social data, stored as JSON on IPFS, and linked to ENS subdomains for persistent identity. These AI agents operate via a Next.js dashboard, interacting with smart contracts across chains like Ethereum, Celo, Polygon, Flow, and Rootstock. To protect voting integrity, private keys are managed server-side within a Trusted Execution Environment (TEE), using a secure infrastructure built with Docker, Express (TypeScript), and Goat SDK. This architecture enables scalable, trust-minimized governance powered by prediction markets and agent-based simulation.

<img width="698" alt="Image" src="https://github.com/user-attachments/assets/d7a4a326-bfc9-4a5a-abf0-8dfe0f20bed2" />

### Tech Stack:

## 🌐 Blockchain & Identity Infrastructure

- [Celo](https://github.com/Jun0908/100Council/tree/main/backend/Server/celo): Mobile-first EVM-compatible blockchain enabling contract-based interactions with a focus on financial access and inclusion.

- [World](https://github.com/Jun0908/100Council/tree/main/frontend/components/world): Biometric-based identity protocol (Worldcoin) used to verify users when delegating voting power to AI agents, ensuring Sybil resistance.

- [Self Protocol](https://github.com/Jun0908/100Council/tree/main/frontend/components/selfProtocol): Passport-based decentralized ID system used to verify age and nationality before delegating voting rights to AI agents.

- [ENS Durin Contract](https://etherscan.io/address/0xba9f0059500df81eb4ab8ccd16fd3df379ba7c57): A smart contract setup that enables onchain issuance and management of ENS subdomains on L2 networks using the Durin protocol.

- [ENS Agent Identity](https://app.ens.domains/chachagpt.eth): Links ENS names to AI agent character profiles stored on IPFS, enabling decentralized identity and personality representation 


  **Other**：
- Phala Network: provides secure on-chain & off-chain computation via TEE, 
- Farcaster API : Web scraping for AI agent personality creation
- GoatSDK: nables dynamic AI agent behaviors
- Pinata: offers decentralized storage through IPFS integration 
- privy Wallet: Seamless wallet creation and authentication


### Development

**QuadraticVoting.sol Contracts**

| contract                   |                                                                                                                   contract address |
| :------------------------- | ---------------------------------------------------------------------------------------------------------------------------------: |
| Ethereum Sepolia    | [0xd644eeb2217d02f167e8865fff55079fc140e971](https://etherscan.io/address/0x208f38670a2ef67e6c0a6579a10191fbd7a1b535)|
| CELO Mainnet   | [0x1440a247071edde7e1016b18126163d805f98c31](https://celoscan.io/address/0x1440a247071edde7e1016b18126163d805f98c31)|
| CELO Testnet   | [0xe2a548dacdbc942d659a523fd40335000c80064c](https://alfajores.celoscan.io/address/0xe2a548dacdbc942d659a523fd40335000c80064c)|

**PredictionMarket.sol Contracts**

| contract                   |                                                                                                                   contract address |
| :------------------------- | ---------------------------------------------------------------------------------------------------------------------------------: |
| Ethereum Sepolia    | [0x3c20cac7efda2e897277c4cc1fe3b47fdae3471e](https://sepolia.etherscan.io/address/0x3c20cac7efda2e897277c4cc1fe3b47fdae3471e)|
| CELO Mainnet   | [0xb8ed7e349796c3c445d79185e2cd3209b2461700](https://celoscan.io/address/0xb8ed7e349796c3c445d79185e2cd3209b2461700)|
| CELO Testnet   | [0xb56f41D8f0401EAA135A3DBCA25fA38c26dA47a9](https://alfajores.celoscan.io/address/0xb56f41d8f0401eaa135a3dbca25fa38c26da47a9)|


**VCGAuction.sol Contracts**

| contract                   |                                                                                                                   contract address |
| :------------------------- | ---------------------------------------------------------------------------------------------------------------------------------: |
| Ethereum Sepolia    | [0x63511f7c84854354d0047fb3c6c790a01d0c89f6](https://sepolia.etherscan.io/address/0x63511f7c84854354d0047fb3c6c790a01d0c89f6)|
| CELO Mainnet   | [0x89e0a255c7f70250fcad3dba5954a90a169b4983](https://celoscan.io/address/0x89e0a255c7f70250fcad3dba5954a90a169b4983)|
| CELO Testnet   | [0xe2a548dacdbc942d659a523fd40335000c80064c](https://alfajores.celoscan.io/address/0x2e9cf33dece4fe50283abbde02440a7daab6a170)|


### What's next for
- **Developing Advanced Voting Systems:**
We aim to implement innovative voting mechanisms such as Zero-Knowledge secondary voting, Pairwise Betting, Conviction Voting, and Futarchy-based governance. These approaches will enhance decision-making, privacy, and efficiency in public goods funding.
- **Enhancing AI Agent Influence on Public Discourse:**
We will integrate AI agents into mass media and social platforms to analyze and influence civic engagement. By modeling media impact and tracking social sentiment, these agents will contribute to more informed and dynamic governance.

We would like to create **the society with decentralized value** by increasing **diverse evaluation criteria**.


### Implementation Status

| Title          |                                                              URL |
| :------------- | ---------------------------------------------------------------: |
| Demo Movie      |                                      [100Council-movie](https://youtu.be/M0hF_wWMKsg)|
| Pitch Doc    |   [100Council-pitch](https://www.canva.com/design/DAGjP2tZzck/_lUG-VZT_5VezlCX8UkwxA/edit?utm_content=DAGjP2tZzck&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton) |
| Demo Site     |                                 [100Council-demo](https://kessy-front.vercel.app/)| 


## **References**  
OECD (2020). "Innovative Citizen Participation and New Democratic Institutions."

World Bank (2022). "Participation and Civic Tech in Local Budgeting."

Frey, B. S., & Stutzer, A. (2019). "Economic effects of direct democracy: A survey."

Harz, D., & Knottenbelt, W. J. (2020). "Towards Safer Smart Contract Upgrades and Governance."

---

