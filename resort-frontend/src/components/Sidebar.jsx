"use client"
import { Link, useLocation } from "react-router-dom"
import {
  UsersIcon,
  BedDoubleIcon,
  CalendarIcon,
  SwimmingPoolIcon,
  SettingsIcon,
  LogOutIcon,
  BarChartIcon,
  DollarIcon,
} from "./Icons"

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path
      ? "bg-blue-100 text-blue-700"
      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
  }

  return (
    <>
      {/* Mobile sidebar backdrop */}
      {isOpen && <div className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden" onClick={toggleSidebar}></div>}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-16 border-b">
            <span className="text-xl font-semibold text-blue-600">CozyForest</span>
          </div>

          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="px-2 space-y-1">
              <li>
                <Link to="/" className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${isActive("/")}`}>
                  <BarChartIcon className="mr-3 h-5 w-5" />
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/map"
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${isActive("/map")}`}
                >
                  <BedDoubleIcon className="mr-3 h-5 w-5" />
                  Live Map
                </Link>
              </li>
              <li>
                <Link
                  to="/rooms"
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${isActive("/rooms")}`}
                >
                  <BedDoubleIcon className="mr-3 h-5 w-5" />
                  Rooms
                </Link>
              </li>
              <li>
                <Link
                  to="/guests"
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${isActive("/guests")}`}
                >
                  <UsersIcon className="mr-3 h-5 w-5" />
                  Guests
                </Link>
              </li>
              <li>
                <Link
                  to="/staff"
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${isActive("/staff")}`}
                >
                  <UsersIcon className="mr-3 h-5 w-5" />
                  Staff
                </Link>
              </li>
              <li>
              <Link
                  to="/reservations"
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${isActive("/reservations")}`}
                >
                  <DollarIcon className="mr-3 h-5 w-5" />
                  Reservations
                </Link>
              </li>
              <li>
                <Link
                  to="/activities"
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${isActive("/activities")}`}
                >
                  <CalendarIcon className="mr-3 h-5 w-5" />
                  Activities
                </Link>
              </li>
              <li>
                <Link
                  to="/facilities"
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${isActive("/facilities")}`}
                >
                  <SwimmingPoolIcon className="mr-3 h-5 w-5" />
                  Facilities
                </Link>
              </li>
              <li>
              <Link
                  to="/wallet"
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${isActive("/wallet")}`}
                >
                  <DollarIcon className="mr-3 h-5 w-5" />
                  Wallet
                </Link>
              </li>
              <li>
              <Link
                  to="/room-services"
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${isActive("/room-services")}`}
                >
                  <DollarIcon className="mr-3 h-5 w-5" />
                  Room Services
                </Link>
              </li>
              <li>
              <Link
                  to="/food-orders"
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${isActive("/food-orders")}`}
                >
                  <DollarIcon className="mr-3 h-5 w-5" />
                  Food Orders
                </Link>
              </li>
              
            </ul>
          </nav>

          <div className="p-4 border-t">
            <button className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-100 hover:text-gray-900 w-full">
              <SettingsIcon className="mr-3 h-5 w-5" />
              Settings
            </button>
            <button className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-100 hover:text-gray-900 w-full mt-2">
              <LogOutIcon className="mr-3 h-5 w-5" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar

