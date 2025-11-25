# 🚀 Social Media Analyzer

An AI-powered tool that extracts text from PDFs and images, analyzes it, and generates optimized social media captions, hashtags, suggestions, and engagement insights.

---

## 🏷️ Badges

<p align="center">
  <img src="https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Version-1.0.0-blue?style=for-the-badge" />
  <br/>
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-black?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <br/>
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/A.I.-Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white" />
  <img src="https://img.shields.io/badge/OCR-Tesseract.js-3F51B5?style=for-the-badge" />
</p>

---

## 📌 Overview

The Social Media Analyzer takes any PDF or image upload, extracts its text using OCR/PDF parsing, analyzes it for structure and engagement signals, and uses **Google Gemini AI** to generate:

- Optimized Instagram captions  
- Optimized LinkedIn captions  
- Separate hashtag sets  
- 5–7 improvement suggestions  
- 3–5 social media optimization tips  
- Engagement, readability, and CTA scoring  

---

## 📁 Project Architecture

```
root/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── models/
│   ├── uploads/
│   └── server.js
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Upload.jsx
    │   │   ├── ResultPane.jsx
    │   ├── App.jsx
    ├── index.html
    └── vite.config.js
```

---

## 🔁 System Workflow

```
User Uploads File
        ↓
PDF/OCR Extraction
        ↓
Content Analyzer (hashtags, readability, CTA)
        ↓
AI Prompt → Gemini API
        ↓
AI JSON Output (captions + hashtags + tips)
        ↓
Frontend Tab Display (corporate dark UI)
```

---

## ⚙️ Backend Setup

```bash
cd backend
npm install
mkdir uploads
```

Create `.env`:

```
PORT=4000
MONGO_URI=your_mongo_uri
GEMINI_API=your_gemini_api_key
```

Run the backend:

```bash
npm run dev
```

---

## 🎨 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Runs at:

```
http://localhost:5173
```

---

## 🌐 Deployment Links

| Service | URL |
|--------|-----|
| **Frontend (Vercel)** | Add your link |
| **Backend (Render)**  | Add your link |

---

## 🔌 API Endpoint

### `POST /api/upload`

Returns:

```json
{
  "success": true,
  "extractedText": "text...",
  "aiSuggestions": {
    "suggestions": [],
    "instagram": { "caption": "", "hashtags": [] },
    "linkedin": { "caption": "", "hashtags": [] },
    "social_tips": [],
    "scores": { "engagement": 0, "readability": 0, "cta": 0 }
  },
  "meta": {
    "hashtags": [],
    "readability": 75,
    "hasCTA": false
  }
}
```

---

## 📸 Screenshots

Add your screenshots here:

```
/screenshots/upload.png
/screenshots/results.png
/screenshots/mobile.png
```

Embed like:

```md
![Upload Screen](screenshots/upload.png)
![Results Screen](screenshots/results.png)
```

---

## 📄 About

The Social Media Analyzer helps creators, marketers, and brands transform long-form content into **platform-optimized posts** with AI—making content distribution faster, smarter, and more effective.

---

## 📝 License

This project is for educational and non-commercial use.
