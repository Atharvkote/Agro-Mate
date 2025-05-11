"use client";

import { useState, useEffect } from "react";
import {
  Thermometer,
  Droplets,
  FlaskRound,
  Atom,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

import { Button } from "../../components/UI/button";
import { Card } from "../../components/UI/card";
import { SoilMetricCard } from "@/components/SoilMetricCard";
import { MetricGauge } from "@/components/MetricGauge";

export default function DashboardContent() {
  const [currentData, setCurrentData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5000/api/fetch/latest");
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        setCurrentData(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  const defaultData = {
    temperature: "--",
    humidity: "--",
    moisture: "--",
    ph: "--",
    nitrogen: "--",
    phosphorus: "--",
    potassium: "--",
    lastUpdated: new Date().toISOString(),
  };

  const data = { ...defaultData, ...currentData };

  const metrics = [
    {
      title: "Temperature",
      value: data.temperature,
      unit: "°C",
      icon: <Thermometer className="h-5 w-5" />,
      color: "red",
      min: 0,
      max: 40,
      optMin: 18,
      optMax: 26,
    },
    {
      title: "Humidity",
      value: data.humidity,
      unit: "%",
      icon: <Droplets className="h-5 w-5" />,
      color: "blue",
      min: 0,
      max: 100,
      optMin: 60,
      optMax: 80,
    },
    {
      title: "Soil Moisture",
      value: (100 - ( data.moisture / 1023)*100).toFixed(1),
      unit: "%",
      icon: <Droplets className="h-5 w-5" />,
      color: "cyan",
      min: 0,
      max: 100,
      optMin: 35,
      optMax: 65,
    },
    {
      title: "Nitrogen",
      value: data.nitrogen,
      unit: "ppm",
      icon: <Atom className="h-5 w-5" />,
      color: "green",
      min: 0,
      max: 100,
      optMin: 25,
      optMax: 60,
    },
    {
      title: "Phosphorus",
      value: data.phosphorus,
      unit: "ppm",
      icon: <Atom className="h-5 w-5" />,
      color: "amber",
      min: 0,
      max: 100,
      optMin: 20,
      optMax: 50,
    },
    {
      title: "Potassium",
      value: data.potassium,
      unit: "ppm",
      icon: <Atom className="h-5 w-5" />,
      color: "indigo",
      min: 0,
      max: 100,
      optMin: 30,
      optMax: 70,
    },
    {
      title: "Soil pH",
      value: data.ph,
      unit: "pH",
      icon: <FlaskRound className="h-5 w-5" />,
      color: "purple",
      min: 0,
      max: 14,
      optMin: 6,
      optMax: 7.5,
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-green-50 to-green-100/40">
      <main className="container mx-auto  py-8">
        <div className="mb-6 flex flex-col gap-2">
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center justify-between">
            <h2 className="text-lg flex justify-center items-center gap-5 lg:text-3xl px-5 py-3 w-3/4 lg:w-1/2  font-bold bg-green-700 rounded-xl  text-white">
              Current Readings
            </h2>
            <div className="mx-5 font-semibold text-md flex items-center gap-1 text-black border-2 border-green-700 rounded-lg  px-4 py-2 lg:w-1/4 bg-green-200">
              Last updated: {new Date(data.lastUpdated).toLocaleString()}
            </div>
          </div>
          <p className="flex items-center gap-1 text-green-700/80 font-semibold text-sm lg:text-lg">
            <ChevronRight /> Monitor your soil health metrics in real-time for
            optimal plant growth
          </p>
          <div className="ml-auto flex items-center gap-4">
            <Button
              variant="outline"
              className="border-green-200 text-green-700 hover:bg-green-50 hover:text-green-800"
            >
              Refresh Data
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-4">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="animate-in fade-in slide-in-from-bottom-4 duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <SoilMetricCard
                title={metric.title}
                value={metric.value}
                unit={metric.unit}
                icon={metric.icon}
                color={metric.color}
                loading={loading}
              >
                <MetricGauge
                  value={typeof metric.value === "string" ? 0 : metric.value}
                  min={metric.min}
                  max={metric.max}
                  optimumMin={metric.optMin}
                  optimumMax={metric.optMax}
                  colorScheme={metric.color}
                />
              </SoilMetricCard>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
