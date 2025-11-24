# Social Media Analyzer (Updated)

This project implements the Social Media Content Analyzer assignment with improvements:
- PDF and Image upload (drag & drop + file picker)
- PDF parsing with pdfjs to better preserve formatting
- OCR for images using Tesseract
- Lightweight engagement analyzer (hashtags, readability, CTA detection)
- AI-driven social-media suggestions (Gemini integration when GEMINI_API is set)
- Improved UX: drag highlight, file info, loading states, error handling
- Basic DB storage of uploads (MongoDB)

## Local setup (development)

### Backend
1. Install dependencies:
```bash
cd backend
npm install
```
2. Make uploads directory:
```bash
mkdir uploads
```
3. Create `.env` in backend with:
```
MONGO_URI=<your mongo connection string>
GEMINI_API=<optional - your Gemini API key>
PORT=4000
```
4. Run:
```bash
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Notes / Changes made
- Replaced `pdf-parse` parsing with `pdfjs-dist` in backend/controllers/analyzeController.js for better text layout preservation.
- `backend/routes/upload.js` now enforces file size (10MB) and allowed MIME types.
- `backend/controllers/analyzeController.js` now:
  - Extracts text via PDF or OCR
  - Computes hashtags, readability, CTA presence
  - Builds a social-media-focused prompt for AI
  - Attempts to save a small preview in MongoDB (if configured)
- `backend/services/ai.services.js` will call Gemini if GEMINI_API env var is set. If not set, the controller falls back to safe local suggestions.
- Frontend improved UX: drag highlight, file info, clear button, disabled states and better error display.

## Deployment suggestions
- Frontend → Vercel or Netlify
- Backend → Render / Railway / Heroku (ensure uploads folder or use S3)
- For production, use cloud storage for uploaded files (S3/Cloud Storage) and secure the AI key server-side (do NOT expose GEMINI_API in the browser).

## Deliverables
- Hosted App URL: (deploy after making changes)
- GitHub repo: push changes
- 200-word write-up: see writeup-200-words.txt