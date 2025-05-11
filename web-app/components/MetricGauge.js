"use client"

import { useState, useEffect, useRef } from "react"

const colorSchemeMap = {
  red: {
    low: "#fecaca", // red-200
    optimum: ["#f87171", "#dc2626"], // red-400 to red-600
    high: "#fecaca", // red-200
    needle: "#b91c1c", // red-700
    lowText: "text-red-700",
    optimumText: "text-green-600",
    highText: "text-red-700",
  },
  blue: {
    low: "#bfdbfe", // blue-200
    optimum: ["#60a5fa", "#2563eb"], // blue-400 to blue-600
    high: "#bfdbfe", // blue-200
    needle: "#1d4ed8", // blue-700
    lowText: "text-blue-700",
    optimumText: "text-green-600",
    highText: "text-blue-700",
  },
  green: {
    low: "#bbf7d0", // green-200
    optimum: ["#4ade80", "#16a34a"], // green-400 to green-600
    high: "#bbf7d0", // green-200
    needle: "#15803d", // green-700
    lowText: "text-green-700",
    optimumText: "text-green-600",
    highText: "text-green-700",
  },
  purple: {
    low: "#e9d5ff", // purple-200
    optimum: ["#c084fc", "#9333ea"], // purple-400 to purple-600
    high: "#e9d5ff", // purple-200
    needle: "#7e22ce", // purple-700
    lowText: "text-purple-700",
    optimumText: "text-green-600",
    highText: "text-purple-700",
  },
  cyan: {
    low: "#a5f3fc", // cyan-200
    optimum: ["#22d3ee", "#0891b2"], // cyan-400 to cyan-600
    high: "#a5f3fc", // cyan-200
    needle: "#0e7490", // cyan-700
    lowText: "text-cyan-700",
    optimumText: "text-green-600",
    highText: "text-cyan-700",
  },
  amber: {
    low: "#fde68a", // amber-200
    optimum: ["#fbbf24", "#d97706"], // amber-400 to amber-600
    high: "#fde68a", // amber-200
    needle: "#b45309", // amber-700
    lowText: "text-amber-700",
    optimumText: "text-green-600",
    highText: "text-amber-700",
  },
  indigo: {
    low: "#c7d2fe", // indigo-200
    optimum: ["#818cf8", "#4f46e5"], // indigo-400 to indigo-600
    high: "#c7d2fe", // indigo-200
    needle: "#4338ca", // indigo-700
    lowText: "text-indigo-700",
    optimumText: "text-green-600",
    highText: "text-indigo-700",
  },
  // Add mappings for the new colors
  rose: {
    low: "#fecdd3", // rose-200
    optimum: ["#fb7185", "#e11d48"], // rose-400 to rose-600
    high: "#fecdd3", // rose-200
    needle: "#be123c", // rose-700
    lowText: "text-rose-700",
    optimumText: "text-green-600",
    highText: "text-rose-700",
  },
  sky: {
    low: "#bae6fd", // sky-200
    optimum: ["#38bdf8", "#0284c7"], // sky-400 to sky-600
    high: "#bae6fd", // sky-200
    needle: "#0369a1", // sky-700
    lowText: "text-sky-700",
    optimumText: "text-green-600",
    highText: "text-sky-700",
  },
  teal: {
    low: "#99f6e4", // teal-200
    optimum: ["#2dd4bf", "#0d9488"], // teal-400 to teal-600
    high: "#99f6e4", // teal-200
    needle: "#0f766e", // teal-700
    lowText: "text-teal-700",
    optimumText: "text-green-600",
    highText: "text-teal-700",
  },
  emerald: {
    low: "#a7f3d0", // emerald-200
    optimum: ["#34d399", "#059669"], // emerald-400 to emerald-600
    high: "#a7f3d0", // emerald-200
    needle: "#047857", // emerald-700
    lowText: "text-emerald-700",
    optimumText: "text-green-600",
    highText: "text-emerald-700",
  },
  violet: {
    low: "#ddd6fe", // violet-200
    optimum: ["#a78bfa", "#7c3aed"], // violet-400 to violet-600
    high: "#ddd6fe", // violet-200
    needle: "#6d28d9", // violet-700
    lowText: "text-violet-700",
    optimumText: "text-green-600",
    highText: "text-violet-700",
  },
}

export function MetricGauge({ value, min, max, optimumMin, optimumMax, colorScheme = "green" }) {
  const canvasRef = useRef(null);
  const [animatedValue, setAnimatedValue] = useState(min);
  const [statusText, setStatusText] = useState("Optimal");
  const [statusColor, setStatusColor] = useState("text-green-600");

  const colors = colorSchemeMap[colorScheme] || colorSchemeMap.green;

  // Calculate moisture percentage
  const moisturePercent = 100 - (value / 1023) * 100;

  useEffect(() => {
    // Animate the value change
    const startValue = animatedValue;
    const endValue = isNaN(moisturePercent) ? min : moisturePercent;
    const duration = 1000;
    const startTime = performance.now();

    const animateValue = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const easeProgress = 1 - (1 - progress) * (1 - progress);
      const currentValue = startValue + (endValue - startValue) * easeProgress;

      setAnimatedValue(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animateValue);
      }
    };

    requestAnimationFrame(animateValue);
  }, [moisturePercent, min]);

  useEffect(() => {
    // Update status text and color based on animated value
    if (animatedValue < optimumMin) {
      setStatusText("Low");
      setStatusColor(colors.lowText);
    } else if (animatedValue > optimumMax) {
      setStatusText("High");
      setStatusColor(colors.highText);
    } else {
      setStatusText("Optimal");
      setStatusColor(colors.optimumText);
    }
  }, [animatedValue, optimumMin, optimumMax, colors]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set up dimensions
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height * 0.75; // Position gauge lower in canvas
    const radius = Math.min(width, height) * 0.4;

    // Define angles (in radians)
    const startAngle = Math.PI * 0.8; // Start at 144 degrees
    const endAngle = Math.PI * 0.2; // End at 36 degrees
    const totalAngle = 2 * Math.PI - (endAngle - startAngle);

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw gauge background (light gray)
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, startAngle + totalAngle);
    ctx.lineWidth = 20;
    ctx.strokeStyle = "#e5e7eb"; // Light gray
    ctx.stroke();

    // Calculate angles for different ranges
    const minAngle = startAngle;
    const maxAngle = startAngle + totalAngle;
    const optimumMinAngle = minAngle + ((optimumMin - min) / (max - min)) * totalAngle;
    const optimumMaxAngle = minAngle + ((optimumMax - min) / (max - min)) * totalAngle;

    // Draw low range
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, minAngle, optimumMinAngle);
    ctx.lineWidth = 20;
    ctx.strokeStyle = colors.low;
    ctx.stroke();

    // Draw optimum range with gradient
    const gradient = ctx.createLinearGradient(
      centerX + radius * Math.cos(optimumMinAngle),
      centerY + radius * Math.sin(optimumMinAngle),
      centerX + radius * Math.cos(optimumMaxAngle),
      centerY + radius * Math.sin(optimumMaxAngle)
    );
    gradient.addColorStop(0, colors.optimum[0]);
    gradient.addColorStop(1, colors.optimum[1]);

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, optimumMinAngle, optimumMaxAngle);
    ctx.lineWidth = 20;
    ctx.strokeStyle = gradient;
    ctx.stroke();

    // Draw high range
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, optimumMaxAngle, maxAngle);
    ctx.lineWidth = 20;
    ctx.strokeStyle = colors.high;
    ctx.stroke();

    // Calculate needle angle based on animated value
    const valueAngle = minAngle + ((animatedValue - min) / (max - min)) * totalAngle;

    // Draw needle
    const needleLength = radius * 0.85;
    const needleBaseWidth = 8;

    const tipX = centerX + needleLength * Math.cos(valueAngle);
    const tipY = centerY + needleLength * Math.sin(valueAngle);

    const baseLeftX = centerX + needleBaseWidth * Math.cos(valueAngle + Math.PI / 2);
    const baseLeftY = centerY + needleBaseWidth * Math.sin(valueAngle + Math.PI / 2);

    const baseRightX = centerX + needleBaseWidth * Math.cos(valueAngle - Math.PI / 2);
    const baseRightY = centerY + needleBaseWidth * Math.sin(valueAngle - Math.PI / 2);

    ctx.beginPath();
    ctx.moveTo(tipX, tipY);
    ctx.lineTo(baseLeftX, baseLeftY);
    ctx.lineTo(baseRightX, baseRightY);
    ctx.closePath();

    ctx.fillStyle = colors.needle;
    ctx.fill();

    // Draw needle center cap
    ctx.beginPath();
    ctx.arc(centerX, centerY, 10, 0, Math.PI * 2);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.strokeStyle = colors.needle;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw value text
    ctx.font = "bold 16px sans-serif";
    ctx.fillStyle = colors.needle;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(animatedValue.toFixed(1), centerX, centerY + radius * 0.5);
  }, [animatedValue, min, max, optimumMin, optimumMax, colors]);

  return (
    <div className="w-full">
      <canvas ref={canvasRef} width={300} height={200} className="w-full h-auto" />
      <div className="flex justify-center mt-1">
        <span className={`font-semibold ${statusColor}`}>{statusText}</span>
      </div>
    </div>
  );
}