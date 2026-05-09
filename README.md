# ⚡ FastPay: Human-Readable Payments on Solana

FastPay is a payments and tipping platform designed to eliminate friction in the Web3 ecosystem, transforming complex addresses into indexable human identifiers.

## 🧠 The Problem

Wallet addresses in Solana (e.g., `7xKp...3mNq`) are prone to human error. A single incorrect character can result in the total loss of funds. This technical barrier prevents ordinary users from adopting crypto for everyday transactions such as tipping creators or paying freelancers.

## ✅ Our Solution

FastPay abstracts technical complexity through:

- **Human Identifiers**: @jacob instead of a public key.
- **Preventive Validation**: Balance check in the UI begore interacting with the blockchain.
- **Social Proof**:Share Fastpay platform via X sharing and direct links to Solscan.

## 🚀 Technical Highlights & Performance

- **Arquitecture**: React 18 + Vite for sub-second loading and Tailwind CSS v4 for responsive design.

## 🎯 Use Cases (Target Audience)

### 1. Content Creators and Streamers 🎨

Creators can receive support from their audience without the high fees of centralized platforms. They simply need to display their FastPay QR code on screen or include theire @username link in their social media posts.

### 2. Freelancers 💼

Ideal for getting paid for quick services. Instead of sending a confusing wallet address via message, the freelancer sends their professional link:
`fastpay-sol.vercel.app/@jacob_dev`, reducing the risk of payment errors by the client.

### 3. Donations and Social Causes 🌍

Organizations that need to raise funds transparently and quickly. Anyone in the world can donate in seconds, with the transaction verified inmmediately on the blockchain through the generated links.

## Key Features (Implemented)

- [x] **Wallet Connection**: Fluid integration with Phantom Wallet.
- [x] **Dynamic Routing**: Custom routing system for user profiles (`/:user`).
- [x] **QR Engine**: Generation and scanning of QR codes for fast payments.
- [x] **Transaction History**: Local record of the last 5 transactions.
- [x] **Balance Guard**: Real-time validation of insufficient funds.
- [x] **Social Growth**: "Share on X" system integrated into payment confirmation.

## 🗺️ Future Roadmap

Following the hackathon, the project will evolve from an MVP to a robust platform:

- **Phase 1: Persistence Layer**: Migration of local data to a distributed database for real-world profiles.
- **Phase 2: Smart Notification**: Implementation of webhooks for automatic payment notification via Email or Telegram.
- **Phase 3: Multi-Token Support**: Support for payments in USDC and other tokens within the Solana ecosystem.

- **Phase 4: Mainnet Deployment**: Transition from the Devnet to the Solana

## 📁 Project Structure

```bash
src/
├── components/
│   ├── Topbar.jsx          # Wallet connection and network status
│   ├── Sidebar.jsx         # Wallet balance and navigation
│   ├── PhantomModal.jsx    # Animated connection mode
|   ├── SuccessOverlay.jsx  # Feedback on success and sharing on X
│   └── RecentTips.jsx      # Save and read the last 5 tips.
├── pages/
│   ├── TipPage.jsx         # SOL central search and submission logic
│   ├── QRPage.jsx          # QR invoice generation and link copying
│   └── NotFound.jsx        # Handling 404 errors for invalid routes
├── data/
│   └── users.js            # Local user database
└── App.jsx                 # Dynamic routing system and global logic
```

## 🛠️ Getting Started

### 📋 Prerequisites

- **Node.js**: v18.0.0 or higher
- **Package Manager**: npm v9.0.0+
- **Wallet**: Phantom Wallet extension installed in the browser

### ⚙ Installation & Setup

1. **Clone and Navigate**:

   ```bash
    git clone https://github.com/codingwithlebo/fastpay-ui.git
    cd fastpay-ui
    ```

2. **Install Dependencies**:

    ```bash
    npm install
    ```

3. **Run in Development**:

    ```bash
    npm run dev
    ```

### 🖥 Local Hosting

Once the command has been executed, open your browser to: [localhost:5173](https://localhost:5173)

***Note***: *Make sure you have your Phantom Wallet set up on Devnet to test real transactions at no cost.*

## 👥 Team & Recognition

- **Jacob Escoto - Lead Developer** (Frontend, Solana Web3 Integration, SEO, Performance Optimization).
- *Malebo Nkuna & Rizky Januar* - Contributors (Initial UI & Smart Contract Research).

---

***Built at the Dev3pack Global Web3 Hackathon 2026***
