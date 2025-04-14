"use client"

import { ReactNode } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const colorMap = {
  red: {
    bg: "bg-red-50/80",
    border: "border-red-200",
    text: "text-red-800",
    icon: "text-red-600",
    gradient: "from-red-500/40 to-red-200",
  },
  blue: {
    bg: "bg-blue-50/80",
    border: "border-blue-200",
    text: "text-blue-800",
    icon: "text-blue-600",
    gradient: "from-blue-500/40 to-blue-200",
  },
  green: {
    bg: "bg-green-50/80",
    border: "border-green-200",
    text: "text-green-800",
    icon: "text-green-600",
    gradient: "from-green-500/40 to-green-200",
  },
  purple: {
    bg: "bg-purple-50/80",
    border: "border-purple-200",
    text: "text-purple-800",
    icon: "text-purple-600",
    gradient: "from-purple-500/40 to-purple-200",
  },
  cyan: {
    bg: "bg-cyan-50/80",
    border: "border-cyan-200",
    text: "text-cyan-800",
    icon: "text-cyan-600",
    gradient: "from-cyan-500/40 to-cyan-200",
  },
  amber: {
    bg: "bg-amber-50/80",
    border: "border-amber-200",
    text: "text-amber-800",
    icon: "text-amber-600",
    gradient: "from-amber-500/40 to-amber-200",
  },
  indigo: {
    bg: "bg-indigo-50/80",
    border: "border-indigo-200",
    text: "text-indigo-800",
    icon: "text-indigo-600",
    gradient: "from-indigo-500/40 to-indigo-200",
  },
  // Add mappings for the new colors
  rose: {
    bg: "bg-rose-50/80",
    border: "border-rose-200",
    text: "text-rose-800",
    icon: "text-rose-600",
    gradient: "from-rose-500/40 to-rose-200",
  },
  sky: {
    bg: "bg-sky-50/80",
    border: "border-sky-200",
    text: "text-sky-800",
    icon: "text-sky-600",
    gradient: "from-sky-500/40 to-sky-200",
  },
  teal: {
    bg: "bg-teal-50/80",
    border: "border-teal-200",
    text: "text-teal-800",
    icon: "text-teal-600",
    gradient: "from-teal-500/40 to-teal-200",
  },
  emerald: {
    bg: "bg-emerald-50/80",
    border: "border-emerald-200",
    text: "text-emerald-800",
    icon: "text-emerald-600",
    gradient: "from-emerald-500/40 to-emerald-200",
  },
  violet: {
    bg: "bg-violet-50/80",
    border: "border-violet-200",
    text: "text-violet-800",
    icon: "text-violet-600",
    gradient: "from-violet-500/40 to-violet-200",
  },
}


export function SoilMetricCard({
  title,
  value,
  unit,
  icon,
  color = "green",
  children,
  loading = false,
  className = "",
}) {
  const colors = colorMap[color] || colorMap.green

  return (
    <Card
      className={`overflow-hidden border ${colors.border} ${colors.bg} shadow-lg transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px] ${className}`}
    >
      <div className={`h-1.5 w-full bg-gradient-to-r ${colors.gradient}`}></div>
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className={`text-2xl font-bold ${colors.text}`}>{title}</h2>
          <div className={`rounded-full text-2xl ${colors.bg} ${colors.icon}`}>{icon}</div>
        </div>

        {loading ? (
          <div className="flex items-end mb-4 space-x-2">
            <Skeleton className="h-10 w-16" />
            <Skeleton className="h-6 w-8" />
          </div>
        ) : (
          <div className="flex items-end mb-4">
            <div className={`text-3xl font-bold ${colors.text}`}>{value}</div>
            <div className="ml-1 text-lg text-gray-500">{unit}</div>
          </div>
        )}

        {children}
      </CardContent>
    </Card>
  )
}
