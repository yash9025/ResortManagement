"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { HomeIcon, BedDoubleIcon, CalendarIcon, SwimmingPoolIcon, DollarIcon } from "./Icons"

const UserNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-gray-900"
  }

  return (
    <nav className="navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold gradient-text">Sunset Resort</span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link to="/" className={`inline-flex items-center px-1 pt-1 ${isActive("/")}`}>
                <HomeIcon className="mr-1 h-5 w-5" />
                Home
              </Link>
              <Link to="/rooms" className={`inline-flex items-center px-1 pt-1 ${isActive("/rooms")}`}>
                <BedDoubleIcon className="mr-1 h-5 w-5" />
                Rooms
              </Link>
              <Link to="/activities" className={`inline-flex items-center px-1 pt-1 ${isActive("/activities")}`}>
                <CalendarIcon className="mr-1 h-5 w-5" />
                Activities
              </Link>
              <Link to="/facilities" className={`inline-flex items-center px-1 pt-1 ${isActive("/facilities")}`}>
                <SwimmingPoolIcon className="mr-1 h-5 w-5" />
                Facilities
              </Link>
              <Link to="/wallet" className={`inline-flex items-center px-1 pt-1 ${isActive("/wallet")}`}>
                <DollarIcon className="mr-1 h-5 w-5" />
                My Wallet
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <Link
              to="/profile"
              className="p-1 rounded-full text-gray-600 hover:text-gray-900 focus:outline-none relative"
            >
              <span className="sr-only">View profile</span>
              <div className="avatar avatar-md">
                <img className="h-8 w-8 rounded-full" src="https://via.placeholder.com/150" alt="User" />
              </div>
              <span className="notification-badge">3</span>
            </Link>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isMenuOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${isMenuOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className={`${isMenuOpen ? "block" : "hidden"} sm:hidden`}>
        <div className="pt-2 pb-3 space-y-1">
          <Link
            to="/"
            className={`block pl-3 pr-4 py-2 border-l-4 ${
              location.pathname === "/"
                ? "border-blue-500 text-blue-700 bg-blue-50"
                : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
            }`}
          >
            Home
          </Link>
          <Link
            to="/rooms"
            className={`block pl-3 pr-4 py-2 border-l-4 ${
              location.pathname === "/rooms"
                ? "border-blue-500 text-blue-700 bg-blue-50"
                : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
            }`}
          >
            Rooms
          </Link>
          <Link
            to="/activities"
            className={`block pl-3 pr-4 py-2 border-l-4 ${
              location.pathname === "/activities"
                ? "border-blue-500 text-blue-700 bg-blue-50"
                : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
            }`}
          >
            Activities
          </Link>
          <Link
            to="/facilities"
            className={`block pl-3 pr-4 py-2 border-l-4 ${
              location.pathname === "/facilities"
                ? "border-blue-500 text-blue-700 bg-blue-50"
                : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
            }`}
          >
            Facilities
          </Link>
          <Link
            to="/wallet"
            className={`block pl-3 pr-4 py-2 border-l-4 ${
              location.pathname === "/wallet"
                ? "border-blue-500 text-blue-700 bg-blue-50"
                : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
            }`}
          >
            My Wallet
          </Link>
          <Link
            to="/profile"
            className={`block pl-3 pr-4 py-2 border-l-4 ${
              location.pathname === "/profile"
                ? "border-blue-500 text-blue-700 bg-blue-50"
                : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
            }`}
          >
            Profile
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default UserNavbar

