"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Search,
  RefreshCw,
  Filter,
  ChevronDown,
  ChevronUp,
  Info,
  Calendar,
  Clock,
  Cpu,
  ChevronRight,
} from "lucide-react";
import {
  getTemperatureStatus,
  getHumidityStatus,
  getSoilMoistureStatus,
  getSoilPHStatus,
  getNitrogenStatus,
  getPhosphorusStatus,
  getPotassiumStatus,
} from "@/functions/ReadingStatus";
import { Button } from "../../components/UI/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../components/UI/card";
import { Skeleton } from "../../components/UI/skeleton";
import { Badge } from "../../components/UI/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/UI/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../components/UI/tooltip";

export default function Home() {
  const [sensorData, setSensorData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const [sortField, setSortField] = useState("timestamp");
  const [sortDirection, setSortDirection] = useState("desc");

  const fetchSensorData = async (page = 1, limit = 25) => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/fetch", {
        params: { page, limit, sortField, sortDirection },
      });
      console.log("Fetched data:", response.data);
      return Array.isArray(response.data) ? response.data : [];
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to fetch sensor data.");
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchSensorData(page, limit);
      // console.log("data",data);
      setSensorData(data);
      // console.log("sensor Data",sensorData);
    };
    loadData();
  }, [page, limit, sortField, sortDirection]);

  const handleRefresh = async () => {
    const data = await fetchSensorData(page, limit);
    setSensorData(data);
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? (
      <ChevronUp className="h-4 w-4" />
    ) : (
      <ChevronDown className="h-4 w-4" />
    );
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800 py-8 ">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div className="w-full flex flex-col">
            <h1 className="text-lg flex justify-center items-center gap-5 lg:text-3xl px-5 py-3 w-3/4 lg:w-1/2  font-bold bg-green-700 rounded-xl  text-white">
              <Cpu className="w-7 h-7" /> Sensor Readings
            </h1>
            <p className="text-gray-600 px-5 flex items-center gap-1 text-md lg:text-lg font-semibold my-1">
              <ChevronRight /> Real-time monitoring of your farm's vital
              statistics
            </p>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <Button
              variant="outline"
              className="flex items-center gap-2 bg-white dark:bg-gray-800 border-green-200 dark:border-green-800 hover:bg-green-100 dark:hover:bg-green-900/30"
              onClick={handleRefresh}
            >
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 bg-white dark:bg-gray-800 border-green-200 dark:border-green-800 hover:bg-green-100 dark:hover:bg-green-900/30"
                >
                  <Filter className="h-4 w-4" />
                  Filter
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLimit(10)}>
                  Show 10 entries
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLimit(25)}>
                  Show 25 entries
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLimit(50)}>
                  Show 50 entries
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLimit(100)}>
                  Show 100 entries
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {loading ? (
          <LoadingSkeleton />
        ) : error ? (
          <ErrorDisplay message={error} />
        ) : (
          <SensorDashboard
            sensorData={sensorData}
            handleSort={handleSort}
            getSortIcon={getSortIcon}
          />
        )}

        {!loading && !error && sensorData.length > 0 && (
          <div className="mt-6 flex justify-between items-center">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Showing {sensorData.length} of {limit} entries
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="bg-white dark:bg-gray-800 border-green-200 dark:border-green-800 hover:bg-green-100 dark:hover:bg-green-900/30"
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                className="bg-white dark:bg-gray-800 border-green-200 dark:border-green-800 hover:bg-green-100 dark:hover:bg-green-900/30"
                onClick={() => setPage(page + 1)}
                disabled={sensorData.length < limit}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export function LoadingSkeleton() {
  return (
    <Card className="border-green-200 dark:border-green-800 shadow-md rounded-2xl animate-pulse">
      <CardHeader className="bg-green-100/30 rounded-t-2xl pb-4 flex justify-center items-center flex-col">
        <CardTitle className=" text-green-800 font-bold text-2xl">
          Collecting Sensor Readings
        </CardTitle>
        <CardDescription className="text-lg font-medium text-green-700 ">
          Loading data...
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <Skeleton className="h-8 w-full rounded-md" />
        <Skeleton className="h-20 w-full rounded-md" />
        <Skeleton className="h-20 w-full rounded-md" />
        <Skeleton className="h-20 w-full rounded-md" />
      </CardContent>
    </Card>
  );
}

function ErrorDisplay({ message }) {
  return (
    <Card className="border-red-300 dark:border-red-800 shadow-md rounded-2xl">
      <CardContent className="p-6">
        <div className="flex flex-col items-center justify-center text-center py-10 space-y-4">
          <div className="text-red-600 dark:text-red-400">
            <Info className="w-14 h-14" />
          </div>
          <p className="text-xl font-semibold text-red-700 dark:text-red-300">
            {message}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 max-w-md">
            Please try again later or contact support if the issue persists.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function SensorDashboard({ sensorData, handleSort, getSortIcon }) {
  function formatDateFromTimestamp(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function formatTimeFromTimestamp(timestamp) {
    const date = new Date(timestamp);
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    const period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${hours
      .toString()
      .padStart(2, "0")}:${minutes}:${seconds} ${period}`;
  }

  // Get the latest reading for summary cards
  const latestReading = sensorData.length > 0 ? sensorData[0] : null;

  return (
    <div className="grid">
      <Card className="border-green-100  shadow-xl overflow-hidden">
        <CardHeader className="">
          <div>
            <CardDescription
              className={
                "font-semibold text-md flex items-center gap-1 text-black border-2 border-green-700 rounded-lg  px-4 py-2 lg:w-1/4 bg-green-200"
              }
            >
              <Clock className="w-4 h-4" />
              Last updated: {new Date().toLocaleString()}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="px-4 pb-4 overflow-x-auto">
            {sensorData.length === 0 && (
              <div className="flex justify-center items-center flex-col py-12">
                <div className="w-full max-w-md h-auto flex justify-center items-center flex-col py-8 rounded-2xl bg-green-500/10">
                  <div className="text-green-700 dark:text-green-500 mb-3">
                    <Search className="w-12 h-12" />
                  </div>
                  <p className="font-bold text-xl text-green-700 dark:text-green-500">
                    No Sensor Readings Available
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">
                    Check your sensor connections or try again later
                  </p>
                </div>
              </div>
            )}
            {sensorData.length !== 0 && (
              <div className="relative">
                <table className="w-full">
                  <thead className="sticky top-0 bg-green-200  text-left">
                    <tr className="text-black ">
                      <TableHeader
                        label="Date"
                        field="timestamp"
                        handleSort={() => handleSort("timestamp")}
                        sortIcon={getSortIcon("timestamp")}
                        icon={<Calendar className="h-4 w-4" />}
                      />
                      <TableHeader
                        label="Time"
                        field="timestamp"
                        handleSort={() => handleSort("timestamp")}
                        sortIcon={getSortIcon("timestamp")}
                        icon={<Clock className="h-4 w-4" />}
                      />
                      <TableHeader
                        label="Temperature (°C)"
                        field="temperature"
                        handleSort={() => handleSort("temperature")}
                        sortIcon={getSortIcon("temperature")}
                      />
                      <TableHeader
                        label="Humidity (%)"
                        field="humidity"
                        handleSort={() => handleSort("humidity")}
                        sortIcon={getSortIcon("humidity")}
                      />
                      <TableHeader
                        label="Soil Moisture (%)"
                        field="soilMoisture"
                        handleSort={() => handleSort("soilMoisture")}
                        sortIcon={getSortIcon("soilMoisture")}
                      />
                      <TableHeader
                        label="Soil pH"
                        field="soilPH"
                        handleSort={() => handleSort("soilPH")}
                        sortIcon={getSortIcon("soilPH")}
                      />
                      <TableHeader
                        label="Nitrogen (ppm)"
                        field="nitrogen"
                        handleSort={() => handleSort("nitrogen")}
                        sortIcon={getSortIcon("nitrogen")}
                      />
                      <TableHeader
                        label="Phosphorus (ppm)"
                        field="phosphorus"
                        handleSort={() => handleSort("phosphorus")}
                        sortIcon={getSortIcon("phosphorus")}
                      />
                      <TableHeader
                        label="Potassium (ppm)"
                        field="potassium"
                        handleSort={() => handleSort("potassium")}
                        sortIcon={getSortIcon("potassium")}
                      />
                    </tr>
                  </thead>
                  <tbody>
                    {sensorData.map((reading, index) => (
                      <tr
                        key={index}
                        className={`${
                          index % 2 === 0 ? "bg-white " : " bg-green-200/40 "
                        } hover:bg-green-100 dark:hover:bg-green-900/20 transition-colors`}
                      >
                        <td className="p-3 border-b border-green-100 dark:border-green-800 font-medium">
                          {formatDateFromTimestamp(reading.timestamp)}
                        </td>
                        <td className="p-3 border-b border-green-100 dark:border-green-800 font-medium">
                          {formatTimeFromTimestamp(reading.timestamp)}
                        </td>
                        <SensorCell
                          value={reading.temperature}
                          prevValue={sensorData[index + 1]?.temperature ?? null}
                          status={getTemperatureStatus(reading.temperature)}
                          precision={1}
                        />
                        <SensorCell
                          value={reading.humidity}
                          prevValue={sensorData[index + 1]?.humidity ?? null}
                          status={getHumidityStatus(reading.humidity)}
                        />
                        <SensorCell
                          value={parseFloat(
                            (100 - (reading.moisture / 1023) * 100).toFixed(2)
                          )}
                          prevValue={sensorData[index + 1]?.moisture ?? null}
                          status={getSoilMoistureStatus(reading.moisture)}
                          precision={2}
                        />
                        <SensorCell
                          value={reading.soilPH}
                          prevValue={sensorData[index + 1]?.soilPH ?? null}
                          status={getSoilPHStatus(reading.soilPH)}
                          precision={1}
                        />
                        <SensorCell
                          value={reading.nitrogen}
                          prevValue={sensorData[index + 1]?.nitrogen ?? null}
                          status={getNitrogenStatus(reading.nitrogen)}
                        />
                        <SensorCell
                          value={reading.phosphorus}
                          prevValue={sensorData[index + 1]?.phosphorus ?? null}
                          status={getPhosphorusStatus(reading.phosphorus)}
                        />
                        <SensorCell
                          value={reading.potassium}
                          prevValue={sensorData[index + 1]?.potassium ?? null}
                          status={getPotassiumStatus(reading.potassium)}
                        />
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function TableHeader({ label, field, handleSort, sortIcon, icon }) {
  return (
    <th
      className="p-3 font-semibold text-green-800 dark:text-green-300 border-b border-green-100 dark:border-green-800 cursor-pointer hover:bg-green-100 dark:hover:bg-green-800/50 transition-colors"
      onClick={handleSort}
    >
      <div className="flex items-center gap-1">
        {icon && (
          <span className="text-green-600 dark:text-green-400">{icon}</span>
        )}
        <span>{label}</span>
        {sortIcon && <span className="ml-1">{sortIcon}</span>}
      </div>
    </th>
  );
}

function SensorCell({ value, prevValue, status, precision = 0 }) {
  const isMissing = value === null || value === undefined || value === "--";
  const numericValue = isMissing ? null : Number(value); // Ensure value is a number
  const diff =
    !isMissing && prevValue !== null && prevValue !== undefined
      ? numericValue - prevValue
      : null;
  const significantChange = diff !== null && Math.abs(diff) >= 2;

  return (
    <td className="p-3 border-b border-green-100 dark:border-green-800">
      <div className="flex items-center gap-2">
        <span className="font-medium">
          {isMissing ? "--" : numericValue.toFixed(precision)}
        </span>

        {diff !== null && significantChange && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="text-xs">
                  {diff > 0 ? (
                    <svg
                      className="h-4 w-4 text-red-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 15l7-7 7 7"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="h-4 w-4 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {diff > 0 ? "Increased" : "Decreased"} by{" "}
                  {Math.abs(diff).toFixed(precision)}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}

        {!isMissing && status && (
          <Badge className={`${getStatusColor(status)} text-white font-medium`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        )}
      </div>
    </td>
  );
}
// Icon components for summary cards
function TempIcon({ status }) {
  const color =
    status === "optimal" || status === "moderate"
      ? "text-green-600 dark:text-green-400"
      : status === "cold" || status === "very cold"
      ? "text-blue-600 dark:text-blue-400"
      : "text-red-600 dark:text-red-400";

  return (
    <svg
      className={`h-6 w-6 ${color}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

function HumidityIcon({ status }) {
  const color =
    status === "optimal"
      ? "text-green-600 dark:text-green-400"
      : status === "dry" || status === "very dry"
      ? "text-amber-600 dark:text-amber-400"
      : "text-blue-600 dark:text-blue-400";

  return (
    <svg
      className={`h-6 w-6 ${color}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 14l-7 7m0 0l-7-7m7 7V3"
      />
    </svg>
  );
}

function MoistureIcon({ status }) {
  const color =
    status === "optimal"
      ? "text-green-600 dark:text-green-400"
      : status === "dry" || status === "very dry"
      ? "text-amber-600 dark:text-amber-400"
      : "text-blue-600 dark:text-blue-400";

  return (
    <svg
      className={`h-6 w-6 ${color}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
      />
    </svg>
  );
}

function PHIcon({ status }) {
  const color =
    status === "neutral"
      ? "text-green-600 dark:text-green-400"
      : status === "acidic" || status === "strongly acidic"
      ? "text-orange-600 dark:text-orange-400"
      : "text-purple-600 dark:text-purple-400";

  return (
    <svg
      className={`h-6 w-6 ${color}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
      />
    </svg>
  );
}

function getStatusColor(status) {
  switch (status) {
    case "very cold":
      return "bg-blue-600";
    case "cold":
      return "bg-blue-400";
    case "moderate":
      return "bg-green-500";
    case "warm":
      return "bg-yellow-500";
    case "hot":
      return "bg-red-500";
    case "very dry":
      return "bg-amber-500";
    case "dry":
      return "bg-amber-600";
    case "optimal":
      return "bg-green-500";
    case "humid":
      return "bg-yellow-500";
    case "very humid":
      return "bg-red-500";
    case "waterlogged":
      return "bg-blue-700";
    case "strongly acidic":
      return "bg-red-600";
    case "acidic":
      return "bg-orange-500";
    case "neutral":
      return "bg-green-500";
    case "alkaline":
      return "bg-blue-500";
    case "strongly alkaline":
      return "bg-purple-600";
    case "very low":
      return "bg-red-600";
    case "low":
      return "bg-orange-500";
    case "adequate":
      return "bg-green-500";
    case "high":
      return "bg-yellow-500";
    case "excessive":
      return "bg-amber-700";
    default:
      return "bg-gray-500";
  }
}
