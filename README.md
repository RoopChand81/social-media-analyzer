# 🚀 Social Media Analyzer

An AI-powered tool that extracts text from PDFs and images, analyzes it, and generates optimized captions, hashtags, and engagement improvements for Instagram and LinkedIn.

---

## 🌐 Live Deployment  
**Live Link :** https://social-media-analyzer-frontend-delta.vercel.app/

---

## 📌 Overview

The Social Media Analyzer takes any PDF or image upload, extracts text using OCR/PDF parsing, analyzes it for social‑media quality, and uses **Google Gemini AI** to generate:

- Optimized Instagram caption + hashtags  
- Optimized LinkedIn caption + hashtags  
- 5–7 improvement suggestions  
- 3–5 platform-specific social tips  
- Engagement, readability, and CTA scores  

---

## 🏛 Project Architecture

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
    │   │   └── ResultPane.jsx
    │   ├── App.jsx
    ├── index.html
    └── vite.config.js
```

---

## 🔁 Workflow

```
User Uploads File
        ↓
PDF/OCR Extraction
        ↓
Content Analyzer (hashtags, readability, CTA)
        ↓
AI Prompt → Gemini API
        ↓
AI JSON Output
        ↓
Frontend Tab Display (corporate dark UI)
```

---

## ✨ Features

### 📝 Content Extraction
- PDF text extraction (`pdfjs-dist`)
- Image OCR extraction (Tesseract.js)
- Preserves readable formatting

### 🤖 AI Optimization
- Instagram caption + 4–6 hashtags
- LinkedIn caption + 4–6 hashtags
- 5–7 smart suggestions
- 3–5 platform tips
- Readability, CTA, engagement scoring

### 🎨 Modern UI
- Corporate-themed dark UI
- Drag-and-drop upload
- Live progress bar
- Tab-based results

### 💾 Database (optional)
- Upload history stored in MongoDB

---

## ⚙️ Backend Setup

```bash
cd backend
npm install
mkdir uploads
```

Create **.env**:

```
PORT=4000
MONGO_URI=your_mongo_uri
GEMINI_API=your_api_key
```

Start server:

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

Runs on:

```
http://localhost:5173
```

---

## 🔌 API Endpoint

### `POST /api/upload`

Responds with:

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
    "readability": 78,
    "hasCTA": false
  }
}
```

---

## 📸 Screenshots

Add your screenshot image links inside the code block below:

```
/screenshots/upload.png
/screenshots/result1.png
/screenshots/result2.png
/screenshots/result3.png
/screenshots/result4.png
/screenshots/result5.png
/screenshots/result6.png

```

(Just replace the filenames with actual image paths.)

---

## 📄 About

This tool helps creators, professionals, and marketers instantly convert raw text from PDFs or images into high-performing social media posts.

---

## 📝 Footer

**© 2025 Social Media Analyzer — Built with ❤️ using Roopchand**

