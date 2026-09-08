# 🎓 CampusChain — Decentralized Campus Management System

CampusChain is a blockchain-powered decentralized application (dApp) designed to manage student academic and administrative information securely and transparently.

The system uses a Solidity smart contract deployed on the Ethereum Sepolia Test Network and provides a web-based dashboard for managing student records, attendance, and fee status.

---

## 🚀 Live Demo

🌐 **CampusChain:**  
https://abishekarumugam1.github.io/campus-chain/

---

## 📌 Project Overview

Traditional campus management systems store student information in centralized databases.

CampusChain uses blockchain technology to provide:

- 🔐 Decentralized data management
- ⛓️ Blockchain-based student records
- 🦊 MetaMask wallet authentication
- 📊 Real-time dashboard statistics
- 📚 Student record management
- 📈 Attendance management
- 💰 Fee status management
- 🗑️ Secure student deletion
- 👑 Smart-contract-based administrator access control

The project demonstrates how blockchain technology can be integrated with a modern web application to create a decentralized campus management system.

---

## ✨ Features

### 👨‍🎓 Student Management

Administrators can:

- Add students
- View student records
- Update student information
- Delete student records

Each student record contains:

| Field | Description |
|---|---|
| Roll Number | Unique student identifier |
| Name | Student name |
| Department | Academic department |
| Year | Current academic year |
| Attendance | Attendance percentage |
| Fees | Fee payment status |

---

### 📊 Dashboard

The dashboard provides real-time blockchain-based statistics including:

- Total number of students
- Number of students whose fees are paid
- Complete student table

---

### 📈 Attendance Management

Administrators can update a student's attendance percentage.

The smart contract validates that attendance remains between:

**0% – 100%**

---

### 💰 Fee Management

The administrator can update a student's fee status.

Possible status:

- ✅ Paid
- ⏳ Pending

---

### 🔐 Admin Access Control

CampusChain uses Solidity's access-control mechanism.

Only the wallet that deployed the smart contract is authorized to perform administrative operations such as:

- Adding students
- Updating students
- Updating attendance
- Updating fees
- Deleting students

This prevents unauthorized users from modifying blockchain records.

---

## 🏗️ System Architecture

```text
                ┌──────────────────────┐
                │      User Browser    │
                │   CampusChain UI     │
                └──────────┬───────────┘
                           │
                           ▼
                ┌──────────────────────┐
                │       MetaMask       │
                │   Wallet Connection  │
                └──────────┬───────────┘
                           │
                           ▼
                ┌──────────────────────┐
                │       Ethers.js      │
                │   Web3 Communication │
                └──────────┬───────────┘
                           │
                           ▼
                ┌──────────────────────┐
                │   CampusChain        │
                │  Solidity Contract   │
                └──────────┬───────────┘
                           │
                           ▼
                ┌──────────────────────┐
                │ Ethereum Sepolia     │
                │   Test Network       │
                └──────────────────────┘
