# SMARTs IOT System + AgroMate Web App

This is the **web dashboard** and backend API server for **AgroMate** — a smart soil health monitoring system. Built with **Next.js**, it displays real-time and historical data from soil sensors (NPK, DHT11, Soil Moisture) stored in **MongoDB**.



## 🧱 Tech Stack

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![PNPM](https://img.shields.io/badge/pnpm-%234a4a4a.svg?style=for-the-badge&logo=pnpm&logoColor=f69220)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)
![Canva](https://img.shields.io/badge/Canva-%2300C4CC.svg?style=for-the-badge&logo=Canva&logoColor=white)


## 📁 Folder Structure

```
arduino/
├── docs/
│   ├── arduino_microcontroller.md     # Info about Arduino Uno/Nano setup
│   ├── dht11_sensor.md                # DHT11 wiring and usage
│   ├── esp32_microcontroller.md       # ESP32 setup guide
│   └── soil_moisture.md               # Capacitive soil moisture guide
├── sketches/
│   ├── SensorReader.ino               # Reads NPK + DHT11 + Soil Moisture
│   └── WifiModule.ino                 # Sends data to server via Wi-Fi
└── README.md                          # This file

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
