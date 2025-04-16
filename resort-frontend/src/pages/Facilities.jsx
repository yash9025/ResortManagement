"use client"

import { useState } from "react"
import { DropletIcon } from "../components/Icons"
import Toggle from "../components/Toggle"

const Facilities = () => {
  const [facilities, setFacilities] = useState([
    {
      id: 1,
      name: "Main Swimming Pool",
      type: "Pool", //remove type
      status: "Operational",
      maintenance: false,
      details: {
        waterQuality: "Excellent",
        temperature: 82,
        chlorineLevel: "Normal",
        phLevel: 7.4,
        lastCleaned: "2023-06-15", 
      },
    },
    {
      id: 2,
      name: "Kids Swimming Pool",
      type: "Pool",
      status: "Operational",
      maintenance: false,
      details: {
        waterQuality: "Good",
        temperature: 84,
        chlorineLevel: "Normal",
        phLevel: 7.2,
        lastCleaned: "2023-06-14",
      },
    },
    {
      id: 3,
      name: "Luxury Spa",
      type: "Spa",
      status: "Operational",
      maintenance: false,
      details: {
        temperature: 102,
        waterQuality: "Excellent",
        lastCleaned: "2023-06-15",
        capacity: 8,
      },
    },
    {
      id: 4,
      name: "Fitness Center",
      type: "Gym",
      status: "Operational",
      maintenance: false,
      details: {
        temperature: 70,
        lastCleaned: "2023-06-15",
        equipmentStatus: "All Operational",
      },
    },
    {
      id: 5,
      name: "Tennis Court",
      type: "Sport",
      status: "Under Maintenance",
      maintenance: true,
      details: {
        surface: "Hard Court",
        lastMaintenance: "2023-06-10",
        nextAvailable: "2023-06-20",
      },
    },
    {
      id: 6,
      name: "Sauna Room",
      type: "Spa",
      status: "Operational",
      maintenance: false,
      details: {
        temperature: 105,
        lastCleaned: "2023-06-16",
        capacity: 5,
      },
    },
    {
      id: 7,
      name: "Bowling Alley",
      type: "Recreational",
      status: "Operational",
      maintenance: false,
      details: {
        lanes: 6,
        lastCleaned: "2023-06-14",
        equipmentStatus: "All Operational",
      },
    },
    {
      id: 8,
      name: "Golf Course",
      type: "Sport",
      status: "Operational",
      maintenance: false,
      details: {
        holes: 18,
        grassType: "Bermuda",
        lastMaintenance: "2023-06-12",
      },
    },
    {
      id: 9,
      name: "Basketball Court",
      type: "Sport",
      status: "Operational",
      maintenance: false,
      details: {
        surface: "Wooden",
        lastMaintenance: "2023-06-13",
      },
    },
    {
      id: 10,
      name: "Mini Theater",
      type: "Entertainment",
      status: "Operational",
      maintenance: false,
      details: {
        seatingCapacity: 50,
        lastCleaned: "2023-06-15",
        soundSystem: "Dolby Surround",
      },
    },
    {
      id: 11,
      name: "Jacuzzi",
      type: "Spa",
      status: "Under Maintenance",
      maintenance: true,
      details: {
        temperature: 104,
        lastMaintenance: "2023-06-18",
        nextAvailable: "2023-06-25",
      },
    },
    {
      id: 13,
      name: "Game Arcade",
      type: "Entertainment",
      status: "Operational",
      maintenance: false,
      details: {
        machinesAvailable: 25,
        lastMaintenance: "2023-06-16",
      },
    },
    {
      id: 14,
      name: "Library & Reading Lounge",
      type: "Recreational",
      status: "Operational",
      maintenance: false,
      details: {
        booksAvailable: 5000,
        lastRestocked: "2023-06-10",
        seatingCapacity: 40,
      },
    },
    {
      id: 15,
      name: "Private Beach Area",
      type: "Leisure",
      status: "Operational",
      maintenance: false,
      details: {
        beachLength: "2 miles",
        amenities: ["Sunbeds", "Umbrellas", "Bar Service"],
        lastCleaned: "2023-06-14",
      },
    },
  ]);

  const toggleFacilityStatus = (id) => {
    setFacilities(
      facilities.map((facility) => {
        if (facility.id === id) {
          const newMaintenance = !facility.maintenance
          const newStatus = newMaintenance ? "Under Maintenance" : "Operational"
          return { ...facility, maintenance: newMaintenance, status: newStatus }
        }
        return facility
      }),
    )
  }

  const updateWaterQuality = (id, quality) => {
    setFacilities(
      facilities.map((facility) => {
        if (facility.id === id) {
          return {
            ...facility,
            details: {
              ...facility.details,
              waterQuality: quality,
            },
          }
        }
        return facility
      }),
    )
  }

  const updateWaterTemperature = (id, temperature) => {
    setFacilities(
      facilities.map((facility) => {
        if (facility.id === id) {
          return {
            ...facility,
            details: {
              ...facility.details,
              temperature: Number(temperature),
            },
          }
        }
        return facility
      }),
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Facility Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {facilities.map((facility) => (
          <div key={facility.id} className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">{facility.name}</h2>
                  <p className="text-sm text-gray-500">{facility.type}</p>
                </div>
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${facility.status === "Operational" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                >
                  {facility.status}
                </span>
              </div>

              {facility.type === "Pool" || facility.type === "Spa" ? (
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Water Quality</label>
                    <select
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={facility.details.waterQuality}
                      onChange={(e) => updateWaterQuality(facility.id, e.target.value)}
                    >
                      <option value="Excellent">Excellent</option>
                      <option value="Good">Good</option>
                      <option value="Fair">Fair</option>
                      <option value="Poor">Poor</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Water Temperature (°F)</label>
                    <input
                      type="number"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={facility.details.temperature}
                      onChange={(e) => updateWaterTemperature(facility.id, e.target.value)}
                    />
                  </div>

                  {facility.type === "Pool" && (
                    <div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">pH Level</span>
                        <span
                          className={`text-sm ${facility.details.phLevel >= 7.2 && facility.details.phLevel <= 7.8
                              ? "text-green-600"
                              : "text-red-600"
                            }`}
                        >
                          {facility.details.phLevel}
                        </span>
                      </div>
                      <div className="mt-1 h-2 bg-gray-200 rounded-full">
                        <div
                          className={`h-2 rounded-full ${facility.details.phLevel >= 7.2 && facility.details.phLevel <= 7.8
                              ? "bg-green-500"
                              : "bg-red-500"
                            }`}
                          style={{ width: `${(facility.details.phLevel / 14) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Last Cleaned</span>
                    <span className="text-sm text-gray-600">{facility.details.lastCleaned}</span>
                  </div>
                </div>
              ) : (
                <div className="mt-4 space-y-2">
                  {facility.details.temperature && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">Temperature</span>
                      <span className="text-sm text-gray-600">{facility.details.temperature}°F</span>
                    </div>
                  )}

                  {facility.details.lastCleaned && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">Last Cleaned</span>
                      <span className="text-sm text-gray-600">{facility.details.lastCleaned}</span>
                    </div>
                  )}

                  {facility.details.equipmentStatus && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">Equipment Status</span>
                      <span className="text-sm text-gray-600">{facility.details.equipmentStatus}</span>
                    </div>
                  )}

                  {facility.details.surface && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">Surface</span>
                      <span className="text-sm text-gray-600">{facility.details.surface}</span>
                    </div>
                  )}

                  {facility.details.nextAvailable && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">Next Available</span>
                      <span className="text-sm text-gray-600">{facility.details.nextAvailable}</span>
                    </div>
                  )}
                </div>
              )}

              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center">
                  <Toggle
                    enabled={facility.maintenance}
                    onChange={() => toggleFacilityStatus(facility.id)}
                    label="Maintenance Mode"
                  />
                </div>

                {(facility.type === "Pool" || facility.type === "Spa" || facility.type === "Jacuzzi") && (
                  <button
                    className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                    onClick={() => {
                      if (facility.type === "Pool") {
                        alert("Scheduling pool cleaning...");
                      } else if (facility.type === "Spa") {
                        alert("Scheduling spa maintenance...");
                      } else if (facility.type === "Jacuzzi") {
                        alert("Scheduling jacuzzi cleaning...");
                      }
                    }}
                  >
                    <DropletIcon className="h-4 w-4 mr-1" />
                    {facility.type === "Pool" && "Schedule Cleaning"}
                    {facility.type === "Spa" && "Schedule Cleaning"}
                    {facility.type === "Jacuzzi" && "Schedule Cleaning"}
                  </button>
                )}

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Facilities

