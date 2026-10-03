# DIGICONNECT GHANA — WEBSITE

Official codebase for **DigiConnect Ghana** (*"Tech for Youth. Tech for Good."*).

The project is structured into separated **frontend** and **backend** directories:

```
WEBSITE/
├── frontend/               # Next.js 16 + React 19 + Tailwind CSS Frontend Application
│   ├── src/
│   │   ├── app/            # Next.js App Router (pages: home, about, programs, events, news, impact, connecthub, etc.)
│   │   ├── components/     # UI Components (Navbar, Footer, CTA, Badges, etc.)
│   │   ├── lib/            # Data store, types, and API client (api.ts)
│   │   └── context/        # React context providers
│   ├── public/             # Static images, logo, icons
│   ├── .env.local          # Frontend environment variables (API URL)
│   └── package.json
│
├── backend/                # Node.js + Express + TypeScript REST API Service
│   ├── src/
│   │   ├── routes/         # Express routes (applications, contacts, involvements, events, news, gallery, uploads)
│   │   ├── services/       # Persistent storage service (JSON store with atomic file writes)
│   │   ├── middleware/     # Multer file upload & error handlers
│   │   ├── data/           # Seed data & database store
│   │   ├── types/          # TypeScript interface definitions
│   │   └── server.ts       # Express server entry point
│   ├── uploads/            # Uploaded files directory
│   ├── .env                # Backend environment configuration
│   └── package.json
│
└── Assets/                 # Official brand graphics & logo files
```

---

## Quick Start Guide

### 🚀 1-Step Unified Runner (Recommended)
You can start both backend and frontend concurrently with a single command from the project root:
```bash
npm run dev
```
*(Or double-click `run.bat` on Windows!)*

Both services will automatically initialize:
- **Frontend Website**: [http://localhost:3000](http://localhost:3000)
- **ConnectHub Admin Portal**: [http://localhost:3000/connecthub](http://localhost:3000/connecthub)
- **Backend REST API**: [http://localhost:5000/api](http://localhost:5000/api)
- **API Health Check**: [http://localhost:5000/api/health](http://localhost:5000/api/health)

### 🛡️ Automated Security Regression Tests
To run the automated OWASP cybersecurity audit & test suite:
```bash
npm run test:security
```

### 🔐 ConnectHub Admin Credentials
- **Admin Email**: `admin@digiconnectghana.org`
- **Admin Password**: `DigiConnect@2026!Secure`
*(Configurable via `backend/.env`)*

---

## Key Modules & Endpoints

| Resource | Backend Endpoint | Frontend Path |
| :--- | :--- | :--- |
| **Home / Landing** | — | `/` |
| **Programs** | `GET /api/programs` | `/programs` |
| **Applications** | `POST /api/applications` | `/join` |
| **Events** | `GET /api/events` | `/events` |
| **News & Stories** | `GET /api/news` | `/news` |
| **Contact Submissions** | `POST /api/contacts` | `/contact` |
| **Involvement (Volunteer/Partner)** | `POST /api/involvements` | `/get-involved` |
| **Admin Portal** | `GET /api/stats` | `/connecthub` |
| **File Uploads** | `POST /api/upload` | `/api/upload` |
