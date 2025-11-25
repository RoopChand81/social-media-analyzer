<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Social Media Analyzer</title>
  <style>
    body {
      margin: 0;
      font-family: "Inter", Arial, sans-serif;
      background: #0b0c10;
      color: #c5c6c7;
      line-height: 1.6;
    }

    header {
      padding: 60px 20px;
      text-align: center;
      background: linear-gradient(135deg, #1f2833, #0b0c10);
      color: #66fcf1;
    }

    header h1 {
      font-size: 3rem;
      margin-bottom: 10px;
    }

    header p {
      font-size: 1.2rem;
      color: #c5c6c7;
    }

    .container {
      max-width: 1100px;
      margin: auto;
      padding: 40px 20px;
    }

    section {
      margin-bottom: 60px;
    }

    h2 {
      color: #45a29e;
      font-size: 2rem;
      margin-bottom: 15px;
      border-left: 4px solid #66fcf1;
      padding-left: 12px;
    }

    h3 {
      color: #66fcf1;
      margin-top: 25px;
    }

    .card {
      background: #1f2833;
      padding: 20px;
      border-radius: 12px;
      margin-bottom: 25px;
      border: 1px solid #45a29e;
    }

    .code {
      background: #0b0c10;
      color: #66fcf1;
      padding: 12px;
      border-radius: 8px;
      overflow-x: auto;
      border: 1px solid #45a29e;
      font-family: "Courier New", monospace;
    }

    ul {
      padding-left: 20px;
    }

    footer {
      text-align: center;
      padding: 20px;
      color: #c5c6c7;
      border-top: 1px solid #1f2833;
      margin-top: 40px;
    }

    .link-box {
      background: #0b0c10;
      padding: 15px;
      border-radius: 8px;
      border: 1px solid #45a29e;
      color: #66fcf1;
      margin-bottom: 10px;
    }

    .screenshots img {
      width: 100%;
      max-width: 650px;
      border-radius: 14px;
      margin: 20px auto;
      display: block;
      border: 2px solid #45a29e;
    }
  </style>
</head>

<body>

<header>
  <h1>🚀 Social Media Analyzer</h1>
  <p>AI-powered tool to extract, analyze & optimize content for top social platforms.</p>
</header>


<div class="container">

  <!-- FEATURES -->
  <section>
    <h2>✨ Features</h2>

    <div class="card">
      <h3>📝 Content Extraction</h3>
      <ul>
        <li>PDF extraction via <strong>pdfjs-dist</strong></li>
        <li>OCR extraction through <strong>Tesseract.js</strong></li>
        <li>Preserved formatting & text segmentation</li>
      </ul>

      <h3>🤖 AI-Driven Optimization</h3>
      <ul>
        <li>Platform-ready captions (Instagram & LinkedIn)</li>
        <li>Well-crafted improvement suggestions</li>
        <li>Hashtag generation per platform</li>
        <li>Social handles optimization tips</li>
        <li>Readability, CTA, & engagement scoring</li>
      </ul>

      <h3>🎨 Modern UI</h3>
      <ul>
        <li>Corporate dark theme</li>
        <li>Drag & drop upload interface</li>
        <li>Progress bar & error handling</li>
        <li>Tabbed AI result layout</li>
      </ul>
    </div>
  </section>

  <!-- LIVE LINKS -->
  <section>
    <h2>🌐 Live Links</h2>

    <div class="link-box">Frontend (Vercel): <em>Add your link</em></div>
    <div class="link-box">Backend (Render): <em>Add your link</em></div>
  </section>

  <!-- ARCHITECTURE -->
  <section>
    <h2>🏛 Project Architecture</h2>
    <div class="card">
<pre class="code">
root/
│
├── backend/ (Node + Express)
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── models/
│   ├── uploads/
│   └── server.js
│
└── frontend/ (React + Vite + Tailwind)
    ├── components/
    └── App.jsx
</pre>
    </div>

    <h3>Workflow:</h3>
<pre class="code">
[Upload File]
     ↓
[PDF/OCR Extraction]
     ↓
[Analyzer]
     ↓
[AI (Gemini)]
     ↓
[JSON Output]
     ↓
[Frontend Tab Display]
</pre>
  </section>

  <!-- SETUP -->
  <section>
    <h2>⚙️ Local Setup</h2>

    <h3>Backend Setup</h3>
    <div class="card">
<pre class="code">
cd backend
npm install
mkdir uploads
</pre>

<p>Create <strong>.env</strong>:</p>

<pre class="code">
PORT=4000
MONGO_URI=your_mongo_uri
GEMINI_API=your_api_key
</pre>

Run backend:
<pre class="code">
npm run dev
</pre>
    </div>

    <h3>Frontend Setup</h3>
    <div class="card">
<pre class="code">
cd frontend
npm install
npm run dev
</pre>
    </div>
  </section>

  <!-- API -->
  <section>
    <h2>🔌 API Endpoint</h2>
    <div class="card">
<pre class="code">
POST /api/upload

Response:
{
  "success": true,
  "extractedText": "",
  "aiSuggestions": {},
  "meta": {
    "hashtags": [],
    "readability": 75,
    "hasCTA": false
  }
}
</pre>
    </div>
  </section>

  <!-- HOW IT WORKS -->
  <section>
    <h2>🧠 How the System Works</h2>
    <div class="card">
      <ul>
        <li>User uploads a PDF or image</li>
        <li>OCR or PDF text extractor runs</li>
        <li>Analyzer extracts hashtags + CTA + readability</li>
        <li>AI (Gemini) generates marketing insights</li>
        <li>Frontend presents results in tab UI</li>
      </ul>
    </div>
  </section>

  <!-- SCREENSHOTS -->
  <section class="screenshots">
    <h2>📸 Screenshots</h2>

    <p>Add your images here:</p>
<pre class="code">
/screenshots/upload.png
/screenshots/results.png
</pre>
  </section>

</div>

<footer>
  © 2025 Social Media Analyzer — Built with ❤️ using AI, OCR & React
</footer>

</body>
</html>
