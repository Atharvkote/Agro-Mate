// 🌡️ Temperature (°C)
export function getTemperatureStatus(val) {
  if (val < 10) return "very cold";
  if (val >= 10 && val < 17) return "cold";
  if (val >= 17 && val <= 24) return "moderate";
  if (val > 24 && val <= 30) return "warm";
  return "hot";
}

// 💧 Humidity (%)
export function getHumidityStatus(val) {
  if (val < 40) return "very dry";
  if (val >= 40 && val <= 55) return "dry";
  if (val > 55 && val <= 70) return "optimal";
  if (val > 70 && val <= 80) return "humid";
  return "very humid";
}

// 🌱 Soil Moisture (%)
export function getSoilMoistureStatus(rawVal) {
  const val = 100 - [(rawVal / 1023) * 100 ]; // Convert to percentage

  if (val < 45) return "very dry";
  if (val >= 45 && val < 60) return "dry";
  if (val >= 60 && val <= 75) return "optimal";
  if (val > 75 && val <= 82) return "wet";
  return "waterlogged";
}

// 🧪 Soil pH
export function getSoilPHStatus(val) {
  if (val < 5.5) return "strongly acidic";
  if (val >= 5.5 && val < 6.5) return "acidic";
  if (val >= 6.5 && val <= 7.5) return "neutral";
  if (val > 7.5 && val <= 8.2) return "alkaline";
  return "strongly alkaline";
}

// 🌾 Nitrogen (mg/kg or ppm)
export function getNitrogenStatus(val) {
  if (val < 100) return "very low";
  if (val >= 100 && val < 140) return "low";
  if (val >= 140 && val <= 200) return "adequate";
  if (val > 200 && val <= 220) return "high";
  return "excessive";
}

// 🌿 Phosphorus (mg/kg or ppm)
export function getPhosphorusStatus(val) {
  if (val < 25) return "very low";
  if (val >= 25 && val < 40) return "low";
  if (val >= 40 && val <= 60) return "adequate";
  if (val > 60 && val <= 70) return "high";
  return "excessive";
}

// 🍌 Potassium (mg/kg or ppm)
export function getPotassiumStatus(val) {
  if (val < 150) return "very low";
  if (val >= 150 && val < 200) return "low";
  if (val >= 200 && val <= 240) return "adequate";
  if (val > 240 && val <= 260) return "high";
  return "excessive";
}
