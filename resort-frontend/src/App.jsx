"use client"

import { useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import Dashboard from "./pages/Dashboard"
import Rooms from "./pages/Rooms"
import Guests from "./pages/Guests"
import Staff from "./pages/Staff"
import Activities from "./pages/Activities"
import Facilities from "./pages/Facilities"
import "./index.css"

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-white shadow-sm z-10">
            <div className="px-4 py-3 flex items-center justify-between">
              <button
                onClick={toggleSidebar}
                className="text-gray-500 focus:outline-none focus:text-gray-700 md:hidden"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div className="flex items-center">
                <div className="relative">
                  <button className="flex items-center text-gray-500 focus:outline-none">
                    <img
                      className="h-8 w-8 rounded-full object-cover p-0.5"
                      src="/admin.svg"
                      alt="Admin"
                    />
                    <span className="ml-2 text-sm font-medium">Admin User</span>
                  </button>
                </div>
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-y-auto bg-gray-100">
            <div className="container mx-auto px-4 py-6">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/rooms" element={<Rooms />} />
                <Route path="/guests" element={<Guests />} />
                <Route path="/staff" element={<Staff />} />
                <Route path="/activities" element={<Activities />} />
                <Route path="/facilities" element={<Facilities />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </Router>
  )
}

export default App

