# 🌐 AgroMate Web App (Frontend + API)

This is the **web dashboard** and backend API server for **AgroMate** — a smart soil health monitoring system. Built with **Next.js**, it displays real-time and historical data from soil sensors (NPK, DHT11, Soil Moisture) stored in **MongoDB**.



## 🧱 Tech Stack

* ⚛️ Frontend: React (via Next.js)
* 🌐 Backend: Node.js + Express-style API routes (in `/server`)
* 🛢️ Database: MongoDB (Mongoose ODM)
* 🧠 State & Utilities: Custom React hooks & functions
* 💨 Styling: Tailwind CSS (via PostCSS)
* 🔒 ESLint + Configs for clean code



## 📁 Folder Structure

```
web-app/
├── app/                   # App routing and layout (Next.js app directory)
├── components/            # React UI components (charts, cards, etc.)
├── functions/             # Data processing utilities
├── hooks/                 # Custom React hooks
├── lib/                   # API clients, DB setup, etc.
├── public/                # Static assets (images, icons)
├── server/                # Backend API routes & DB logic
│   ├── models/            # MongoDB models (e.g., NPKReading.js)
│   ├── routes/            # Express-style route handlers
│   └── server.js          # API server entry (if custom)
├── styles/                # (optional) Global CSS
├── README.md              # This file
├── .gitignore
├── next.config.mjs        # Next.js configuration
├── eslint.config.mjs      # ESLint setup
├── package.json
└── postcss.config.mjs     # Tailwind/PostCSS config
```



## 🚀 Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/your-username/agromate.git
cd web-app
npm install
```

### 2. Configure Environment

Create a `.env.local` file:

```
MONGO_URI=mongodb://localhost:27017/agromate
NEXT_PUBLIC_API_BASE=http://localhost:3000
```

### 3. Run the Dev Server

```bash
npm run dev
```


## 🧪 Features

* 📊 **Dashboard View**: Real-time NPK + Temp/Humidity + Soil Moisture
* 🗓️ **Historical Charts**: Line/Bar graphs using Chart.js or Recharts
* 📡 **API Integration**: REST endpoints under `/api`
* 🔄 **Data Sync**: Push data from ESP32 or Arduino using HTTP POST



## 📬 API Example (POST)

```http
POST /api/npk
Content-Type: application/json

{
  "nitrogen": 45,
  "phosphorus": 30,
  "potassium": 50,
  "temperature": 26.5,
  "humidity": 43,
  "moisture": 382
}
```


## 📊 Live Dashboard Preview

> Coming soon: Add screenshots or hosted demo link



## 📦 Build & Deploy

```bash
npm run build
npm start
```

## 🧠 Developer Notes

* Modular structure: Frontend & API decoupled
* Reusable chart components in `/components/`
* MongoDB models isolated in `/server/models/`
