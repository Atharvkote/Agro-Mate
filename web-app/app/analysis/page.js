"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import {
  getTemperatureStatus,
  getHumidityStatus,
  getSoilMoistureStatus,
  getSoilPHStatus,
  getNitrogenStatus,
  getPhosphorusStatus,
  getPotassiumStatus,
} from "@/functions/ReadingStatus";
import {
  ArrowLeft,
  Calendar,
  Droplets,
  Leaf,
  Thermometer,
  ThermometerIcon,
  Waves,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/UI/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/UI/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/UI/select";
import { Button } from "../../components/UI/button";
import { ChartContainer } from "../../components/UI/chart";
import axios from "axios";

export default function AnalysisPage() {
  const [timeRange, setTimeRange] = useState("7d");
  const [temperatureData, settemperatureData] = useState([]);
  const [moistureData, setmoistureData] = useState([]);
  const [humidityData, sethumidityData] = useState([]);
  const [avg, setavg] = useState({});
  const [Loading, setLoading] = useState(false);

  const fetchTemperature = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:5000/api/fetch/temperature"
      );
      console.log("Fetched data:", response.data);
      return Array.isArray(response.data) ? response.data : [];
    } catch (err) {
      console.error("Error fetching data:", err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Updated avg:", avg);
  }, [avg]);

  const fetchMoisture = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:5000/api/fetch/soil-moisture"
      );
      console.log("Fetched data:", response.data);
      return Array.isArray(response.data) ? response.data : [];
    } catch (err) {
      console.error("Error fetching data:", err);
      return [];
    } finally {
      setLoading(false);
    }
  };
  const fetchHumidity = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:5000/api/fetch/humidity"
      );
      console.log("Fetched data:", response.data);
      return Array.isArray(response.data) ? response.data : [];
    } catch (err) {
      console.error("Error fetching data:", err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const capitalizeWords = (str) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const fetchAvg = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:5000/api/fetch/average"
      );
      console.log("Fetched Average Data:", response.data);
      return response.data || {};
    } catch (err) {
      console.error("Error fetching average data:", err);
      return {};
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      const [temperatureData, moistureData, humidityData, averageData] =
        await Promise.all([
          fetchTemperature(),
          fetchMoisture(),
          fetchHumidity(),
          fetchAvg(),
        ]);
      settemperatureData(temperatureData);
      sethumidityData(humidityData);
      setmoistureData(moistureData);
      setavg(averageData[0]);
      setLoading(false);
    };
    fetchAll();
  }, []);

  const phData = [
    { date: "Mon", value: 6.5, fill: "#eab308" },
    { date: "Tue", value: 6.7, fill: "#eab308" },
    { date: "Wed", value: 6.8, fill: "#eab308" },
    { date: "Thu", value: 6.6, fill: "#eab308" },
    { date: "Fri", value: 6.5, fill: "#eab308" },
    { date: "Sat", value: 6.4, fill: "#eab308" },
    { date: "Sun", value: 6.6, fill: "#eab308" },
  ];

  const npkData = [
    { name: "Nitrogen (N)", value: 65, color: "#22c55e" },
    { name: "Phosphorus (P)", value: 45, color: "#3b82f6" },
    { name: "Potassium (K)", value: 55, color: "#eab308" },
  ];

  const summaryCards = useMemo(
    () => [
      {
        icon: <Thermometer className="mr-2 h-7 w-7 text-green-600" />,
        title: "Temperature",
        value:
          avg.avgTemperture !== undefined
            ? `${parseFloat(avg.avgTemperture).toFixed(1)}°C`
            : "N/A",
        remark: "+2°C from yesterday",
      },
      {
        icon: <Droplets className="mr-2 h-7 w-7 text-green-600" />,
        title: "Humidity",
        value:
          avg.avgHumidity !== undefined
            ? `${parseFloat(avg.avgHumidity).toFixed(1)}%`
            : "N/A",
        remark: "-3% from yesterday",
      },
      {
        icon: <Waves className="mr-2 h-7 w-7 text-green-600" />,
        title: "Moisture",
        value:
          avg.avgMoisture !== undefined
            ? `${parseFloat(100 - (avg.avgMoisture / 1023) * 100).toFixed(1)}%`
            : "N/A",
        remark: "Optimal range",
      },
      {
        icon: <Leaf className="mr-2 h-7 w-7 text-green-600" />,
        title: "pH Level",
        value: "6.5",
        remark: "Slightly acidic",
      },
      {
        icon: <Leaf className="mr-2 h-7 w-7 text-green-600" />,
        title: "NPK Status",
        value: "Good",
        remark: "Balanced nutrients",
      },
    ],
    [avg]
  ); // <- dependency: updates whenever avg changes

  function getStatusColor(status) {
    switch (status.toLowerCase()) {
      case "very cold":
        return "#2563eb"; // blue-600
      case "cold":
        return "#60a5fa"; // blue-400
      case "moderate":
        return "#22c55e"; // green-500
      case "warm":
        return "#eab308"; // yellow-500
      case "hot":
        return "#ef4444"; // red-500

      case "very dry":
        return "#f59e0b"; // amber-500
      case "dry":
        return "#d97706"; // amber-600
      case "optimal":
        return "#22c55e"; // green-500

      case "humid":
        return "#eab308"; // yellow-500
      case "very humid":
        return "#ef4444"; // red-500
      case "waterlogged":
        return "#1e40af"; // blue-700

      case "strongly acidic":
        return "#dc2626"; // red-600
      case "acidic":
        return "#f97316"; // orange-500
      case "neutral":
        return "#22c55e"; // green-500
      case "alkaline":
        return "#3b82f6"; // blue-500
      case "strongly alkaline":
        return "#7c3aed"; // purple-600

      case "very low":
        return "#dc2626"; // red-600
      case "low":
        return "#f97316"; // orange-500
      case "adequate":
        return "#22c55e"; // green-500
      case "high":
        return "#eab308"; // yellow-500
      case "excessive":
        return "#92400e"; // amber-700

      default:
        return "#6b7280"; // gray-500
    }
  }

  function getSoilConditionDescription(status) {
    switch (status) {
      case "very cold":
        return "The soil is extremely cold. This can hinder plant growth. Consider protecting your plants during frosty conditions.";
      case "cold":
        return "The soil is cold. Growth may slow down for some plants, and water retention could increase.";
      case "moderate":
        return "The soil temperature is moderate and ideal for most plants to grow and thrive.";
      case "warm":
        return "The soil is warm. Perfect for growing heat-loving plants.";
      case "hot":
        return "The soil is very hot. It may cause stress to some plants, so ensure they are well-watered and protected.";

      case "very dry":
        return "The soil is extremely dry. This may stress plants, so water deeply and frequently.";
      case "dry":
        return "The soil is dry. Plants may need watering to maintain proper moisture levels.";
      case "optimal":
        return "The soil moisture is optimal. Plants will thrive in these conditions.";
      case "humid":
        return "The soil is quite humid. It's essential to check for signs of waterlogging in sensitive plants.";
      case "very humid":
        return "The soil is overly humid. This can lead to root rot and mold growth. Be cautious with watering.";
      case "waterlogged":
        return "The soil is waterlogged. Roots may be suffocating from lack of oxygen, and some plants may drown.";

      case "strongly acidic":
        return "The soil is strongly acidic. Some plants may struggle, and adjustments like lime may be needed.";
      case "acidic":
        return "The soil is acidic. Certain plants prefer acidic soil, but others may require amendments to balance it.";
      case "neutral":
        return "The soil is neutral. This is ideal for most plants, providing a balanced environment.";
      case "alkaline":
        return "The soil is alkaline. Certain plants may struggle in high pH soil, so consider amending it.";
      case "strongly alkaline":
        return "The soil is strongly alkaline. Many plants will find it difficult to thrive in such conditions.";

      case "very low":
        return "The moisture level is very low. The soil is extremely dry, and plants may suffer from dehydration.";
      case "low":
        return "The moisture level is low. You should water the plants to maintain proper hydration.";
      case "adequate":
        return "The soil moisture level is adequate. The soil has the right balance of moisture for plant health.";
      case "high":
        return "The soil moisture is high. Ensure that the soil isn’t waterlogged, which could lead to root rot.";
      case "excessive":
        return "The soil has excessive moisture. Overwatering may lead to drowning roots and fungal growth.";

      default:
        return "No description available.";
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <h1 className="text-lg mt-5 flex justify-center items-center gap-5 lg:text-3xl px-5 py-3 w-3/4 lg:w-1/2  font-bold bg-green-700 rounded-tr-xl rounded-br-xl  text-white">
        Soil Analysis Dashboard
      </h1>
      <main className="flex-1 pt-0 p-4 md:p-6 lg:p-8 bg-gradient-to-b from-white to-green-50">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <p className="text-gray-500 mt-1 font-semibold text-lg">
                Monitor and analyze your soil parameters in real-time
              </p>
            </div>
            <div className="flex items-center gap-2 mt-4 md:mt-0">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[180px] bg-white">
                  <SelectValue placeholder="Select time range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="24h">Last 24 hours</SelectItem>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon" className="bg-white">
                <Calendar className="h-7 w-7" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            {summaryCards.map((card, index) => (
              <Card
                key={index}
                className="bg-green-100 border-2 border-green-400 shadow-sm hover:shadow-md transition-all hover:scale-105 duration-500"
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl   font-bold flex items-center">
                    {card.icon}
                    {card.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">
                    {card.value}
                  </div>
                  <p className="text-sm font-semibold text-green-600">
                    {card.remark}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Charts */}
          <Tabs defaultValue="temperature" className="w-full">
            <TabsList className="grid grid-cols-5 mb-6 bg-green-100">
              <TabsTrigger
                value="temperature"
                className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
              >
                Temperature
              </TabsTrigger>
              <TabsTrigger
                value="humidity"
                className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
              >
                Humidity
              </TabsTrigger>
              <TabsTrigger
                value="moisture"
                className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
              >
                Moisture
              </TabsTrigger>
              <TabsTrigger
                value="ph"
                className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
              >
                pH Level
              </TabsTrigger>
              <TabsTrigger
                value="npk"
                className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
              >
                NPK
              </TabsTrigger>
            </TabsList>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="col-span-1 lg:col-span-2 bg-white overflow-hidden border-green-200 shadow-sm">
                <CardHeader>
                  <CardTitle>Soil Parameter Analysis</CardTitle>
                  <CardDescription>
                    Detailed view of soil parameters over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <TabsContent value="temperature" className="mt-0">
                    <div className="">
                      <ChartContainer
                        config={{
                          temperature: {
                            label: "Temperature (°C)",
                            color: "hsl(142, 76%, 36%)",
                          },
                        }}
                      >
                        <ResponsiveContainer className={"h-fit"}>
                          <LineChart
                            data={temperatureData}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid
                              strokeDasharray="3 3"
                              stroke="#f0f0f0"
                            />
                            <XAxis dataKey="timestamp" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line
                              type="monotone"
                              dataKey="temperature"
                              name="Temperature (°C)"
                              stroke="#22c55e"
                              strokeWidth={2}
                              dot={{ r: 4 }}
                              activeDot={{ r: 6 }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </div>
                  </TabsContent>

                  <TabsContent value="humidity" className="mt-0">
                    <div>
                      <ChartContainer
                        config={{
                          humidity: {
                            label: "Humidity (%)",
                            color: "hsl(217, 91%, 60%)",
                          },
                        }}
                      >
                        <ResponsiveContainer
                          className={"overflow-hidden"}
                          width="100%"
                          height="100%"
                        >
                          <LineChart
                            data={humidityData}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid
                              strokeDasharray="3 3"
                              stroke="#f0f0f0"
                            />
                            <XAxis dataKey="timestamp" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line
                              type="monotone"
                              dataKey="humidity"
                              name="Humidity (%)"
                              stroke="#3b82f6"
                              strokeWidth={2}
                              dot={{ r: 4 }}
                              activeDot={{ r: 6 }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </div>
                  </TabsContent>

                  <TabsContent value="moisture" className="mt-0">
                    <div>
                      <ChartContainer
                        config={{
                          moisture: {
                            label: "Moisture (%)",
                            color: "hsl(199, 89%, 48%)",
                          },
                        }}
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart
                            data={moistureData}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid
                              strokeDasharray="3 3"
                              stroke="#f0f0f0"
                            />
                            <XAxis dataKey="timestamp" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line
                              type="monotone"
                              dataKey="moisture"
                              name="Moisture (%)"
                              stroke="#0ea5e9"
                              strokeWidth={2}
                              dot={{ r: 4 }}
                              activeDot={{ r: 6 }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </div>
                  </TabsContent>

                  <TabsContent value="ph" className="mt-0">
                    <div>
                      <ChartContainer
                        config={{
                          ph: {
                            label: "pH Level",
                            color: "hsl(43, 96%, 48%)",
                          },
                        }}
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart
                            data={phData}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid
                              strokeDasharray="3 3"
                              stroke="#f0f0f0"
                            />
                            <XAxis dataKey="timestamp" />
                            <YAxis domain={[6, 7]} />
                            <Tooltip />
                            <Legend />
                            <Line
                              type="monotone"
                              dataKey="value"
                              name="pH Level"
                              stroke="#eab308"
                              strokeWidth={2}
                              dot={{ r: 4 }}
                              activeDot={{ r: 6 }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </div>
                  </TabsContent>

                  <TabsContent value="npk" className="mt-0">
                    <div>
                      <ChartContainer
                        config={{
                          npk: {
                            label: "NPK Levels (%)",
                            color: "hsl(142, 76%, 36%)",
                          },
                        }}
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={npkData}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid
                              strokeDasharray="3 3"
                              stroke="#f0f0f0"
                            />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar
                              dataKey="value"
                              name="Level (%)"
                              fill="#22c55e"
                            >
                              {npkData.map((entry, index) => (
                                <Cell
                                  key={`cell-${index}`}
                                  fill={entry.color}
                                />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </div>
                  </TabsContent>
                </CardContent>
              </Card>

              <Card className="bg-white border-green-200 shadow-sm">
                <CardHeader>
                  <CardTitle className={"text-xl font-bold text-green-600"}>
                    Soil Parameters Score
                  </CardTitle>
                  <CardDescription className={"font-semibold"}>
                    Overall assessment of your soil parameters
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <TabsContent value="temperature" className="mt-0">
                    <div className="flex flex-col items-center justify-center h-[300px]">
                      <div className="relative w-40 h-40 mb-4">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div
                            className="text-4xl font-bold"
                            style={{
                              color: getStatusColor(
                                getTemperatureStatus(avg.avgTemperture)
                              ), // Dynamically applying color
                            }}
                          >
                            {avg.avgTemperture?.toFixed(1)}
                          </div>
                        </div>
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={[
                                {
                                  name: "Score",
                                  value:
                                    (avg.avgTemperture?.toFixed(1) / 40) * 100,
                                  fill: getStatusColor(
                                    getTemperatureStatus(avg.avgTemperture)
                                  ),
                                },
                                {
                                  name: "Remaining",
                                  value:
                                    100 -
                                    (avg.avgTemperture?.toFixed(1) / 40) * 100,
                                  fill: "#e5e7eb",
                                },
                              ]}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={80}
                              startAngle={90}
                              endAngle={-270}
                              dataKey="value"
                            />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="text-center">
                        <div
                          className="flex items-center gap-2 justify-center"
                          style={{
                            color: getStatusColor(
                              getTemperatureStatus(avg.avgTemperture)
                            ), // Dynamically applying color
                          }}
                        >
                          <ThermometerIcon />
                          <h3
                            className="text-xl  font-bold  "
                            style={{
                              color: getStatusColor(
                                getTemperatureStatus(avg.avgTemperture)
                              ), // Dynamically applying color
                            }}
                          >
                            {capitalizeWords(
                              getTemperatureStatus(avg.avgTemperture)
                            )}
                          </h3>
                        </div>
                        <p className="text-md font-semibold text-gray-500 mt-1">
                          {getSoilConditionDescription(
                            getTemperatureStatus(avg.avgTemperture)
                          )}
                        </p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="humidity" className="mt-0">
                    <div className="flex flex-col items-center justify-center h-[300px]">
                      <div className="relative w-40 h-40 mb-4">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div
                            className="text-4xl font-bold"
                            style={{
                              color: getStatusColor(
                                getHumidityStatus(avg.avgHumidity)
                              ), // Dynamically applying color
                            }}
                          >
                            {avg.avgHumidity?.toFixed(1)}
                          </div>
                        </div>
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={[
                                {
                                  name: "Score",
                                  value: avg.avgHumidity,
                                  fill: getStatusColor(
                                    getHumidityStatus(avg.avgHumidity)
                                  ),
                                },
                                {
                                  name: "Remaining",
                                  value: 100 - avg.avgHumidity,
                                  fill: "#e5e7eb",
                                },
                              ]}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={80}
                              startAngle={90}
                              endAngle={-270}
                              dataKey="value"
                            />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="text-center">
                        <h3
                          className="text-xl  font-bold "
                          style={{
                            color: getStatusColor(
                              getHumidityStatus(avg.avgHumidity)
                            ), // Dynamically applying color
                          }}
                        >
                          {capitalizeWords(getHumidityStatus(avg.avgHumidity))}
                        </h3>
                        <p className="text-md font-semibold text-gray-500 mt-1">
                          {getSoilConditionDescription(
                            getHumidityStatus(avg.avgHumidity)
                          )}
                        </p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="moisture" className="mt-0">
                    <div className="flex flex-col items-center justify-center h-[300px]">
                      <div className="relative w-40 h-40 mb-4">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-4xl font-bold text-green-600"
                          style={{
                            color: getStatusColor(
                              getSoilMoistureStatus(avg.avgMoisture)
                            ), // Dynamically applying color
                          }}
                          >
                            {(100 - (avg.avgMoisture / 1023) * 100)?.toFixed(1)}
                          </div>
                        </div>
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={[
                                { name: "Score", value: (100 - (avg.avgMoisture / 1023) * 100)?.toFixed(1), fill: getStatusColor(getSoilMoistureStatus((100- ((avg.avgMoisture / 1023) * 100)))) },
                                {
                                  name: "Remaining",
                                  value: 18,
                                  fill: "#e5e7eb",
                                },
                              ]}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={80}
                              startAngle={90}
                              endAngle={-270}
                              dataKey="value"
                            />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="text-center">
                        <h3 className="text-xl font-semibold text-gray-900"
                        style={{
                          color: getStatusColor(
                            getSoilMoistureStatus(avg.avgMoisture)
                          ), // Dynamically applying color
                        }}
                        >
                          {capitalizeWords(getSoilMoistureStatus(avg.avgMoisture))}
                        </h3>
                        <p className="text-md font-semibold text-gray-500 mt-1">
                         {getSoilConditionDescription(getSoilMoistureStatus(avg.avgMoisture))}
                        </p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="ph" className="mt-0">
                    <div className="flex flex-col items-center justify-center h-[300px]">
                      <div className="relative w-40 h-40 mb-4">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-4xl font-bold text-green-600">
                            75%
                          </div>
                        </div>
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={[
                                { name: "Score", value: 75, fill: "#eab308" },
                                {
                                  name: "Remaining",
                                  value: 25,
                                  fill: "#e5e7eb",
                                },
                              ]}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={80}
                              startAngle={90}
                              endAngle={-270}
                              dataKey="value"
                            />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="text-center">
                        <h3 className="text-lg font-semibold text-gray-900">
                          Good
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          pH is slightly acidic, ideal for most crops
                        </p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="npk" className="mt-0">
                    <div className="flex flex-col items-center justify-center h-[300px]">
                      <div className="relative w-40 h-40 mb-4">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-4xl font-bold text-green-600">
                            80%
                          </div>
                        </div>
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={[
                                { name: "Score", value: 80, fill: "#22c55e" },
                                {
                                  name: "Remaining",
                                  value: 20,
                                  fill: "#e5e7eb",
                                },
                              ]}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={80}
                              startAngle={90}
                              endAngle={-270}
                              dataKey="value"
                            />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="text-center">
                        <h3 className="text-lg font-semibold text-gray-900">
                          Very Good
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          Balanced NPK levels for optimal growth
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <Card className="bg-white border-green-200 shadow-sm">
                <CardHeader>
                  <CardTitle className={'text-xl text-green-600 font-bold'}>Related Insight</CardTitle>
                  <CardDescription className={'font-medium'}>
                    Suggested actions based on soil analysis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <TabsContent value="temperature" className="mt-0 space-y-4">
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-green-50">
                      <div className="mt-0.5 bg-green-100 rounded-full p-1.5">
                        <Thermometer className="h-7 w-7 text-green-600" />
                      </div>
                      <div>
                        <h4 className="text-md font-medium text-gray-900">
                          {capitalizeWords(getTemperatureStatus(avg.avgTemperture))} Temperature
                        </h4>
                        <p className="text-sm font-medium text-gray-500 mt-1">
                         {getSoilConditionDescription(getTemperatureStatus(avg.avgTemperture))}
                        </p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="humidity" className="mt-0 space-y-4">
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50">
                      <div className="mt-0.5 bg-blue-100 rounded-full p-1.5">
                        <Droplets className="h-7 w-7 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="text-md font-medium text-gray-900">
                         Atmoshpere around is {capitalizeWords(getHumidityStatus(avg.avgHumidity))}
                        </h4>
                        <p className="text-sm font-medium text-gray-500 mt-1">
                          {getSoilConditionDescription(getHumidityStatus(avg.avgHumidity))}
                        </p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="moisture" className="mt-0 space-y-4">
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-sky-50">
                      <div className="mt-0.5 bg-sky-100 rounded-full p-1.5">
                        <Waves className="h-7 w-7 text-sky-600" />
                      </div>
                      <div>
                        <h4 className="text-md font-medium text-gray-900">
                         Soil is {capitalizeWords(getSoilMoistureStatus(avg.avgMoisture))}
                        </h4>
                        <p className="text-sm font-medium text-gray-500 mt-1">
                         {getSoilConditionDescription(getSoilMoistureStatus(avg.avgMoisture))}
                        </p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="ph" className="mt-0 space-y-4">
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-yellow-50">
                      <div className="mt-0.5 bg-yellow-100 rounded-full p-1.5">
                        <Leaf className="h-7 w-7 text-yellow-600" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">
                          Monitor pH Levels
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">
                          pH is slightly acidic, which is ideal for most crops.
                          Continue monitoring for any changes.
                        </p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="npk" className="mt-0 space-y-4">
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-green-50">
                      <div className="mt-0.5 bg-green-100 rounded-full p-1.5">
                        <Leaf className="h-7 w-7 text-green-600" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">
                          Balanced Nutrients
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">
                          NPK levels are well-balanced. Apply standard
                          fertilizer as per schedule.
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                </CardContent>
              </Card>

              <Card className="bg-white border-green-200 shadow-sm">
                <CardHeader>
                  <CardTitle>Historical Comparison</CardTitle>
                  <CardDescription>
                    Compare current values with historical data
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <TabsContent value="temperature" className="mt-0">
                    <div className="">
                      <ChartContainer
                        config={{
                          current: {
                            label: "Current Week",
                            color: "#22c55e",
                          },
                          previous: {
                            label: "Previous Week",
                            color: "#94a3b8",
                          },
                        }}
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={[
                              { day: "Mon", current: 22, previous: 20 },
                              { day: "Tue", current: 24, previous: 21 },
                              { day: "Wed", current: 27, previous: 23 },
                              { day: "Thu", current: 23, previous: 22 },
                              { day: "Fri", current: 25, previous: 24 },
                              { day: "Sat", current: 26, previous: 23 },
                              { day: "Sun", current: 24, previous: 22 },
                            ]}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid
                              strokeDasharray="3 3"
                              stroke="#f0f0f0"
                            />
                            <XAxis dataKey="day" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar
                              dataKey="current"
                              name="Current Week"
                              fill="#22c55e"
                            />
                            <Bar
                              dataKey="previous"
                              name="Previous Week"
                              fill="#94a3b8"
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </div>
                  </TabsContent>

                  <TabsContent value="humidity" className="mt-0">
                    <div>
                      <ChartContainer
                        config={{
                          current: {
                            label: "Current Week",
                            color: "#3b82f6",
                          },
                          previous: {
                            label: "Previous Week",
                            color: "#94a3b8",
                          },
                        }}
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={[
                              { day: "Mon", current: 65, previous: 68 },
                              { day: "Tue", current: 62, previous: 65 },
                              { day: "Wed", current: 58, previous: 63 },
                              { day: "Thu", current: 70, previous: 67 },
                              { day: "Fri", current: 68, previous: 70 },
                              { day: "Sat", current: 65, previous: 68 },
                              { day: "Sun", current: 67, previous: 69 },
                            ]}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid
                              strokeDasharray="3 3"
                              stroke="#f0f0f0"
                            />
                            <XAxis dataKey="day" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar
                              dataKey="current"
                              name="Current Week"
                              fill="#3b82f6"
                            />
                            <Bar
                              dataKey="previous"
                              name="Previous Week"
                              fill="#94a3b8"
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </div>
                  </TabsContent>

                  <TabsContent value="moisture" className="mt-0">
                    <div>
                      <ChartContainer
                        config={{
                          current: {
                            label: "Current Week",
                            color: "#0ea5e9",
                          },
                          previous: {
                            label: "Previous Week",
                            color: "#94a3b8",
                          },
                        }}
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={[
                              { day: "Mon", current: 45, previous: 42 },
                              { day: "Tue", current: 42, previous: 40 },
                              { day: "Wed", current: 38, previous: 37 },
                              { day: "Thu", current: 50, previous: 45 },
                              { day: "Fri", current: 48, previous: 46 },
                              { day: "Sat", current: 45, previous: 44 },
                              { day: "Sun", current: 47, previous: 45 },
                            ]}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid
                              strokeDasharray="3 3"
                              stroke="#f0f0f0"
                            />
                            <XAxis dataKey="day" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar
                              dataKey="current"
                              name="Current Week"
                              fill="#0ea5e9"
                            />
                            <Bar
                              dataKey="previous"
                              name="Previous Week"
                              fill="#94a3b8"
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </div>
                  </TabsContent>

                  <TabsContent value="ph" className="mt-0">
                    <div>
                      <ChartContainer
                        config={{
                          current: {
                            label: "Current Week",
                            color: "#eab308",
                          },
                          previous: {
                            label: "Previous Week",
                            color: "#94a3b8",
                          },
                        }}
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={[
                              { day: "Mon", current: 6.5, previous: 6.4 },
                              { day: "Tue", current: 6.7, previous: 6.5 },
                              { day: "Wed", current: 6.8, previous: 6.6 },
                              { day: "Thu", current: 6.6, previous: 6.5 },
                              { day: "Fri", current: 6.5, previous: 6.4 },
                              { day: "Sat", current: 6.4, previous: 6.3 },
                              { day: "Sun", current: 6.6, previous: 6.5 },
                            ]}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid
                              strokeDasharray="3 3"
                              stroke="#f0f0f0"
                            />
                            <XAxis dataKey="day" />
                            <YAxis domain={[6, 7]} />
                            <Tooltip />
                            <Legend />
                            <Bar
                              dataKey="current"
                              name="Current Week"
                              fill="#eab308"
                            />
                            <Bar
                              dataKey="previous"
                              name="Previous Week"
                              fill="#94a3b8"
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </div>
                  </TabsContent>

                  <TabsContent value="npk" className="mt-0">
                    <div>
                      <ChartContainer
                        config={{
                          current: {
                            label: "Current",
                            color: "#22c55e",
                          },
                          previous: {
                            label: "Previous Month",
                            color: "#94a3b8",
                          },
                        }}
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={[
                              {
                                nutrient: "Nitrogen (N)",
                                current: 65,
                                previous: 60,
                              },
                              {
                                nutrient: "Phosphorus (P)",
                                current: 45,
                                previous: 42,
                              },
                              {
                                nutrient: "Potassium (K)",
                                current: 55,
                                previous: 50,
                              },
                            ]}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid
                              strokeDasharray="3 3"
                              stroke="#f0f0f0"
                            />
                            <XAxis dataKey="nutrient" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar
                              dataKey="current"
                              name="Current"
                              fill="#22c55e"
                            />
                            <Bar
                              dataKey="previous"
                              name="Previous Month"
                              fill="#94a3b8"
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </div>
                  </TabsContent>
                </CardContent>
              </Card>
            </div>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
