Welcome to **EduChain**, an enhanced version of the EduChain Admin dashboard. This project serves as the administrative backbone of a blockchain education platform designed specifically for Northern Nigeria. It aims to address challenges like limited internet connectivity and digital literacy gaps while leveraging **blockchain technology** and the **Gemini API** to create an engaging, accessible learning experience. 

[EduChain Link Hosted On Vercel](https://v0-edu-chain-admin.vercel.app/)

This fork introduces key improvements, including:  
- **AI-powered content generation** using the Gemini API.  
- **Ethereum smart contract integration** for issuing blockchain-based certificates.  
- **Optimized performance** for low-bandwidth environments and diverse devices.  

## 🚀 Features  

- **User & Course Management:** Register students, onboard instructors, and organize blockchain-related courses.  
- **Blockchain-Based Certification:** Issue verifiable certificates using Solidity smart contracts.  
- **AI-Enhanced Learning:** Generate quizzes and interactive explanations via Gemini API.  
- **Offline Access:** Downloadable content for users with limited internet connectivity.  
- **Multilingual Support:** Content available in **English** and **Hausa**.  
- **Community Engagement:** Discussion forums and learning groups.  
- **Progress Tracking:** Monitor learner progress and provide personalized recommendations.  
- **Cultural Relevance:** Content tailored to Northern Nigeria’s unique needs.  

## 🛠️ Technology Stack  

- **Frontend:** Next.js (React framework)  
- **Backend:** Nest.js (optional)  
- **Blockchain:** Ethereum, Solidity  
- **AI Integration:** Gemini API  
- **Styling:** Tailwind CSS  
- **Smart Contract Development:** Hardhat  

## 📌 Prerequisites  

Before setting up the project, ensure you have:  
- Node.js (v14 or higher)  
- npm or yarn  
- Git  
- MetaMask (or any Ethereum-compatible wallet)  
- Hardhat for Solidity development  
- A text editor like VS Code  

## 📥 Installation  

1. **Clone the Repository**  
   ```bash
   git clone <repository-url>
   cd Fork-of-EduChain-Admin
   ```  

2. **Install Dependencies**  
   ```bash
   npm install
   ```  

3. **Set Up Environment Variables**  
   Create a `.env` file in the root directory and add:  
   ```env
   GEMINI_API_KEY=your_gemini_api_key
   BLOCKCHAIN_NODE_URL=https://your-ethereum-node-url
   ```  
   **⚠️ Note:** Never hardcode sensitive information in the source code.  

4. **Run the Development Server**  
   ```bash
   npm run dev
   ```  
   The application will be accessible at **http://localhost:3000**.  

## 🏗️ Smart Contracts with Solidity  

### ✍️ Writing Solidity Smart Contracts  

1. **Navigate to the Contracts Directory**  
   ```bash
   mkdir contracts
   ```  

2. **Create a New Solidity File**  
   ```bash
   touch contracts/Certificate.sol
   ```  

3. **Write the Smart Contract**  

   ```solidity
   // SPDX-License-Identifier: MIT
   pragma solidity ^0.8.0;

   contract Certificate {
       struct Cert {
           string studentName;
           string courseName;
           uint256 issueDate;
       }

       mapping(uint256 => Cert) public certificates;
       uint256 public certCount;

       event CertificateIssued(uint256 id, string studentName, string courseName);

       function issueCertificate(string memory _studentName, string memory _courseName) public {
           certCount++;
           certificates[certCount] = Cert(_studentName, _courseName, block.timestamp);
           emit CertificateIssued(certCount, _studentName, _courseName);
       }

       function getCertificate(uint256 _id) public view returns (string memory, string memory, uint256) {
           Cert memory cert = certificates[_id];
           return (cert.studentName, cert.courseName, cert.issueDate);
       }
   }
   ```  

### ⚙️ Compiling and Deploying  

1. **Initialize Hardhat (if not already set up)**  
   ```bash
   npx hardhat
   ```  

2. **Compile the Contract**  
   ```bash
   npx hardhat compile
   ```  

3. **Deploy the Contract**  
   Create `scripts/deploy.js`  
   ```javascript
   const hre = require("hardhat");

   async function main() {
     const Certificate = await hre.ethers.getContractFactory("Certificate");
     const certificate = await Certificate.deploy();
     await certificate.deployed();
     console.log("Certificate contract deployed to:", certificate.address);
   }

   main().catch((error) => {
     console.error(error);
     process.exitCode = 1;
   });
   ```  

4. **Configure Networks** (`hardhat.config.js`)  
   ```javascript
   require("@nomicfoundation/hardhat-toolbox");

   module.exports = {
     solidity: "0.8.0",
     networks: {
       localhost: {
         url: "http://127.0.0.1:8545"
       },
       rinkeby: {
         url: "https://rinkeby.infura.io/v3/YOUR_INFURA_PROJECT_ID",
         accounts: ["YOUR_PRIVATE_KEY"]
       }
     }
   };
   ```  

5. **Deploy to a Network**  
   ```bash
   npx hardhat run scripts/deploy.js --network <network-name>
   ```  

## 🔗 Gemini API Integration  

1. **Obtain an API Key**  
   Get your own Gemini API key from the provider.  

2. **Configure API Key in `.env`**  
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```  

3. **Test API Call**  
   ```bash
   curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=$GEMINI_API_KEY" \
   -H 'Content-Type: application/json' \
   -X POST \
   -d '{ "contents": [{ "parts":[{"text": "Explain how AI works"}] }] }'
   ```  

## 🛠️ Troubleshooting  

### **Invalid or Unexpected Token Error**  
This issue in `components/ui/alert.tsx` was fixed by correcting the syntax.  

### **CssSyntaxError: Undefined font-lato**  
Ensure `font-lato` is configured in `tailwind.config.js`:  
```javascript
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        lato: ['Lato', 'sans-serif']
      }
    }
  }
}
```  

## 🤝 Contributing  

1. **Fork the repository**  
2. **Create a feature branch** (`git checkout -b feature-name`)  
3. **Commit changes** and **submit a pull request**  

## 📜 License  

This project is licensed under the **MIT License**.  

