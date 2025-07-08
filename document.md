# PharmaChain – Decentralized Drug Supply Chain

## 📀 Overview

PharmaChain is a blockchain-based system for tracking pharmaceutical products from **manufacturing** to **retail**, ensuring **authenticity**, **transparency**, and **regulatory compliance**. It provides tamper-proof tracking and real-time access to product lifecycle data, helping prevent counterfeiting and enabling trust in the medical supply chain.

---

## 🧑‍💻 Stakeholders & User Roles

| Role             | Permissions                                |
| ---------------- | ------------------------------------------ |
| **Admin**        | Assign roles to participants               |
| **Manufacturer** | Register new drug batches                  |
| **Distributor**  | Update location/status during shipment     |
| **Wholesaler**   | Receive and distribute drugs               |
| **Retailer**     | Confirm delivery and readiness for sale    |
| **Regulator**    | View and audit product logs                |
| **Consumer**     | Verify authenticity via product ID/QR code |

---

## 🛠️ Features

* 🔐 Role-based access control using smart contracts
* 📦 Drug batch registration and transfer
* 🧾 Immutable on-chain logs of movements
* 🔊 Optional cold-chain data recording
* 📄 IPFS storage for regulatory documents (lab tests, licenses)
* 📱 QR code generation for each drug batch
* 🌍 Public consumer verification interface

---

## 🧱 Smart Contract Design

### Core Contracts

* `PharmaChain.sol` (main logic)
* `AccessControl.sol` (role manager using OpenZeppelin)
* `Structs.sol` (drug metadata)

### Key Functions

1. `registerBatch(...)` — Manufacturer only
2. `transferOwnership(batchId, toAddress)` — Authorized roles only
3. `updateStatus(batchId, newStatus)` — Validated by role
4. `addDocument(batchId, ipfsHash)` — Manufacturer or Regulator
5. `getBatchDetails(batchId)` — Public read
6. `recordIncident(batchId, reason)` — For damage/loss reports

### Batch States

* `Manufactured`
* `QualityChecked`
* `Packed`
* `InTransit`
* `ReceivedByWholesaler`
* `DeliveredToRetailer`
* `ReadyForSale`

---

## 🔍 Data Structure

```solidity
struct DrugBatch {
  string batchId;
  string name;
  string manufacturer;
  string composition;
  uint manufactureDate;
  uint expiryDate;
  address currentOwner;
  Status currentStatus;
  string[] ipfsDocuments;
  History[] history;
}

struct History {
  Status status;
  address updatedBy;
  uint timestamp;
  string location;
}
```

---

## 🌐 Frontend Design

### Tech Stack

* React.js + Tailwind
* Ethers.js for blockchain interaction
* IPFS via Web3.Storage or Pinata
* QR code generation: `qrcode.react`

### Dashboards

* **Manufacturer Dashboard**

  * Register drug
  * Upload lab/IPFS docs
* **Distributor Dashboard**

  * Accept delivery
  * Update location/status
* **Retailer Dashboard**

  * Confirm receipt
  * View product info
* **Regulator Panel**

  * View history of all batches
  * Flag anomalies
* **Consumer Page**

  * Scan QR code
  * View full supply chain and authenticity

---

## 📄 IPFS Storage Plan

* Documents stored: Lab test results, FDA approvals, transport logs
* Tool: IPFS (via Web3.Storage, Infura, or Pinata)
* Only the `CID (hash)` stored on-chain

---

## 📈 Deployment Plan

* **Smart Contract Framework**: Hardhat
* **Network**: Polygon Mumbai (test), Polygon PoS (main)
* **Contract Verification**: Etherscan (with metadata)
* **Wallet**: Metamask integration for participants

---

## 🔐 Security & Compliance

* ✅ Strict role validation before each action
* ✅ No overwrite access to past logs
* ✅ Expiry validation before allowing sale
* ✅ GDPR-safe: no personal or health data on-chain
* ✅ Compliant logging for audits and regulatory reviews

---

## ✅ Project Milestones

| Milestone | Description                               | Owner     |
| --------- | ----------------------------------------- | --------- |
| Week 1    | Smart contract architecture & role system | Developer |
| Week 2    | Drug registration + ownership transfer    | Developer |
| Week 3    | Frontend for Manufacturer, Distributor    | Developer |
| Week 4    | Regulator audit view + IPFS document link | Developer |
| Week 5    | Consumer QR system + Testnet deployment   | Developer |
| Week 6    | Full end-to-end testing + bug fixes       | QA        |
| Week 7    | Mainnet deployment                        | DevOps    |
| Week 8    | Post-deployment review + docs             | Team      |

---

## 📂 GitHub Repository Structure

```
pharmachain/
🗾 contracts/
    ├── PharmaChain.sol
    ├── AccessControl.sol

📁 frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   └── hooks/
    ├── public/
    └── App.jsx

📁 scripts/
    └── deploy.js

📁 test/
    └── pharmachain.test.js

README.md
hardhat.config.js
```

---

## 🥺 Test Scenarios

* ✅ Unauthorized role trying to update status (should fail)
* ✅ Manufacturer registering batch (should pass)
* ✅ Transfer ownership and confirm in UI
* ✅ Verify product via QR → see full trace

---

## 🔚 End-User Demo Flow (Consumer)

1. Consumer scans QR code on drug package
2. Redirected to verification page
3. Sees:

   * Product name & batch ID
   * Manufacturer info
   * Date of manufacture & expiry
   * Chain of custody (from factory to shelf)
   * IPFS documents (if public)

---
