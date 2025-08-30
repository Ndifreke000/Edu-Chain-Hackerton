# Welcome to EduChain

Welcome to **EduChain**, the enhanced EduChain Admin dashboard powering a blockchain education platform designed for Northern Nigeria. EduChain addresses challenges like limited internet connectivity and digital literacy gaps, leveraging cutting-edge blockchain technology and the Gemini API to deliver an engaging and accessible learning experience.

[EduChain Link Hosted On Vercel](https://v0-edu-chain-admin.vercel.app/)

![Screenshot from 2025-03-20 14-41-23](https://github.com/user-attachments/assets/1d8e422c-ed66-4d49-bf10-3433fa87ce62)


---


## 🚀 Features

- **User & Course Management:** Seamlessly register students, onboard instructors, and organize blockchain-related courses.
- **AI-Enhanced Learning:** Create dynamic learning experiences with quizzes and interactive content via the Gemini API.
- **Offline Access:** Enable downloadable content for users with limited internet connectivity.
- **Multilingual Support:** Offer educational content in **English** and **Hausa**.
- **Community Engagement:** Support discussion forums and learning groups to enhance collaboration.
- **Progress Tracking:** Monitor learner progress and deliver personalized recommendations.
- **Cultural Relevance:** Tailor educational content to meet the unique needs of Northern Nigeria.

---

Wowwww 

## 🛠️ Technology Stack

- **Frontend:** Next.js (React framework)
- **Styling:** Tailwind CSS
- **AI Integration:** Gemini API

---

## 📌 Prerequisites

Before setting up the project, ensure you have:

- Node.js (v14 or higher)
- npm or yarn
- Git
- A text editor like VS Code

---

## 👥 Installation

1. **Clone the Repository:**
   ```bash
   git clone <repository-url>
   cd EduChain-Admin
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables:**
   Create a `.env` file in the root directory and add:
   ```env
   GEMINI_API_KEY=your_gemini_api_key
   ```
   **⚠️ Note:** Never hardcode sensitive information in the source code.

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   The application will be accessible at **http://localhost:3000**.

---

## 🔗 Gemini API Integration

1. **Obtain an API Key:**  
   Sign up with the Gemini API provider to receive your API key.

2. **Configure the API Key in `.env`:**
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```

3. **Test the API Call:**
   ```bash
   curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=$GEMINI_API_KEY" \
   -H 'Content-Type: application/json' \
   -X POST \
   -d '{ "contents": [{ "parts":[{"text": "Explain how AI works"}] }] }'
   ```

---

## 🛠️ Troubleshooting

### **Invalid or Unexpected Token Error**
- This issue in `components/ui/alert.tsx` can be resolved by ensuring proper syntax is used.

### **CssSyntaxError: Undefined font-lato**
- Ensure that `font-lato` is configured in `tailwind.config.js`:
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

---

## 🤝 Contributing

1. **Fork the Repository**
2. **Create a Feature Branch:**
   ```bash
   git checkout -b feature-name
   ```
3. **Commit Your Changes** and **Submit a Pull Request**

---

## 🐜 License

This project is licensed under the **MIT License**.

