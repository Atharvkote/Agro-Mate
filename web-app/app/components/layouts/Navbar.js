"use client"

import { useState, useEffect } from "react"
import { LineChart, BarChart, History, Leaf, Menu, X, Mail, LightbulbIcon, Home } from "lucide-react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import Logo from '@/public/agroLogo.png'
import Image from "next/image"
const Navbar = () => {
  const [view, setView] = useState("home")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()

  const views = {
    home: { link: "/", icon: Home, label: "Home" },
    current: { link: "/dashboard", icon: History, label: "Dashboard" },
    history: { link: "/history", icon: BarChart, label: "History" },
    analysis: { link: "/analysis", icon: LineChart, label: "Analysis" },
    insights: { link: "/insights", icon: LightbulbIcon, label: "Insights" },
    about: { link: "/about", icon: Leaf, label: "About" },
    contact: { link: "/contact", icon: Mail, label: "Contact Us" },
  }

  useEffect(() => {
    router.push(views[view].link)
  }, [view, router])

  // Close menu when a view is selected on mobile
  const handleViewChange = (newView) => {
    setView(newView)
    setIsMenuOpen(false)
  }

  // Close menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const nav = document.getElementById("mobile-menu-container")
      const button = document.getElementById("mobile-menu-button")

      if (isMenuOpen && nav && !nav.contains(event.target) && !button.contains(event.target)) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isMenuOpen])

  return (
    <div className="sticky top-0 z-50">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Image src={Logo} width={150} height={100} alt="img" className=""/>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {Object.entries(views).map(([key, { icon: Icon, label }]) => (
                <button
                  key={key}
                  onClick={() => setView(key)}
                  className={cn(
                    "px-3 py-2 rounded-md transition-colors flex items-center",
                    view === key ? "bg-green-100 text-green-700 font-medium" : "text-gray-600 hover:bg-gray-100",
                  )}
                >
                  <Icon className="h-5 w-5 mr-1" />
                  <span>{label}</span>
                </button>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center lg:hidden">
              <button
                id="mobile-menu-button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-green-700 hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
                aria-expanded={isMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          id="mobile-menu-container"
          className={cn(
            "fixed inset-0 top-16 bg-white z-40 transform transition-transform duration-300 ease-in-out lg:hidden",
            isMenuOpen ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="px-2 pt-2 pb-3 h-full space-y-2 overflow-y-auto shadow-lg">
            {Object.entries(views).map(([key, { icon: Icon, label }]) => (
              <button
                key={key}
                onClick={() => handleViewChange(key)}
                className={cn(
                  "w-full text-left px-4 py-3 rounded-md transition-colors flex items-center  bg-green-100",
                  view === key
                    ? "bg-green-50 text-green-700 font-medium "
                    : "font-semibold hover:bg-gray-50 border-transparent bg-green-200 hover:border-gray-300",
                )}
              >
                <Icon className="h-5 w-5 mr-3" />
                <span className="text-base">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
