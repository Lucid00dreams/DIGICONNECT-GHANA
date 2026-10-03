# DigiConnect Ghana — Backend API

RESTful API backend for DigiConnect Ghana website and ConnectHub admin portal.

## Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Storage**: Persistent JSON database with thread-safe atomic file writing (ready for PostgreSQL / MongoDB / SQLite migration)
- **File Uploads**: Multer with size and mimetype validation

---

## Getting Started

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment
Copy `.env.example` to `.env` (or use default values):
```env
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
DATA_FILE_PATH=./src/data/db.json
UPLOAD_DIR=./uploads
```

### 3. Run Development Server
```bash
npm run dev
```
The server will start at `http://localhost:5000`.

### 4. Build for Production
```bash
npm run build
npm start
```

---

## API Endpoints

### Health Check
- `GET /api/health` — Verify API status and uptime

### Applications (Youth Program Applications)
- `GET /api/applications` — List applications (supports `?status=pending` and `?program=coding-technology`)
- `GET /api/applications/:id` — Get single application
- `POST /api/applications` — Submit new application
- `PATCH /api/applications/:id/status` — Update review status (`pending`, `under_review`, `accepted`, `rejected`)
- `DELETE /api/applications/:id` — Delete application

### Contact Messages
- `GET /api/contacts` — List all contact messages (supports `?status=unread`)
- `POST /api/contacts` — Submit new contact message
- `PATCH /api/contacts/:id/status` — Update status (`unread`, `read`, `replied`)
- `DELETE /api/contacts/:id` — Delete message

### Involvements (Volunteer / Partner / Donate)
- `GET /api/involvements` — List involvement inquiries (supports `?type=volunteer` and `?status=new`)
- `POST /api/involvements` — Submit new inquiry
- `PATCH /api/involvements/:id/status` — Update status
- `DELETE /api/involvements/:id` — Delete inquiry

### Events
- `GET /api/events` — List all events (supports `?status=upcoming` and `?category=workshop`)
- `GET /api/events/:idOrSlug` — Get single event
- `POST /api/events` — Create new event
- `DELETE /api/events/:id` — Delete event

### News & Stories
- `GET /api/news` — List news articles
- `GET /api/news/:idOrSlug` — Get single article
- `POST /api/news` — Publish new article
- `DELETE /api/news/:id` — Delete article

### Gallery
- `GET /api/gallery` — List gallery photos
- `POST /api/gallery` — Add gallery photo
- `DELETE /api/gallery/:id` — Delete photo

### Programs
- `GET /api/programs` — List all 4 core programs
- `GET /api/programs/:slug` — Get program details

### Stats & Dashboard Summary
- `GET /api/stats` — Overall statistics, counts, and contact info

### File Uploads
- `POST /api/upload` — Upload image file (`multipart/form-data`, key: `file`). Returns `{ url, filename }`
- Static files served at: `http://localhost:5000/uploads/<filename>`

### Cookies & Consent
- `GET /api/cookies/consent` — Read cookie consent status from request cookies
- `POST /api/cookies/consent` — Save cookie consent preferences and set `dcg_cookie_consent` cookie
- `POST /api/cookies/clear` — Clear all platform cookies

