"use client"

import { useState } from "react"
import { PlusIcon, SearchIcon } from "../components/Icons"
import Modal from "../components/Modal"

const Guests = () => {
  const [guests, setGuests] = useState([
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "+1 (555) 123-4567",
      checkIn: "2023-06-15",
      checkOut: "2023-06-20",
      room: "101 - Ocean View Suite",
      status: "Active",
      preferences: {
        dietaryRestrictions: "None",
        roomTemperature: "Cool",
        specialRequests: "Extra pillows",
      },
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      phone: "+1 (555) 987-6543",
      checkIn: "2023-06-18",
      checkOut: "2023-06-25",
      room: "205 - Garden Villa",
      status: "Upcoming",
      preferences: {
        dietaryRestrictions: "Vegetarian",
        roomTemperature: "Warm",
        specialRequests: "Late check-out",
      },
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael.b@example.com",
      phone: "+1 (555) 456-7890",
      checkIn: "2023-05-25",
      checkOut: "2023-05-30",
      room: "302 - Presidential Suite",
      status: "Completed",
      preferences: {
        dietaryRestrictions: "Gluten-free",
        roomTemperature: "Normal",
        specialRequests: "Airport transfer",
      },
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.d@example.com",
      phone: "+1 (555) 789-0123",
      checkIn: "2023-06-10",
      checkOut: "2023-06-17",
      room: "118 - Beach Bungalow",
      status: "Active",
      preferences: {
        dietaryRestrictions: "Dairy-free",
        roomTemperature: "Cool",
        specialRequests: "Spa appointment",
      },
    },
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentGuest, setCurrentGuest] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")

  const openModal = (guest = null) => {
    setCurrentGuest(
      guest || {
        name: "",
        email: "",
        phone: "",
        checkIn: "",
        checkOut: "",
        room: "",
        status: "Upcoming",
        preferences: {
          dietaryRestrictions: "",
          roomTemperature: "",
          specialRequests: "",
        },
      },
    )
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setCurrentGuest(null)
  }

  const handleSaveGuest = () => {
    if (currentGuest.id) {
      // Update existing guest
      setGuests(guests.map((guest) => (guest.id === currentGuest.id ? currentGuest : guest)))
    } else {
      // Add new guest
      setGuests([...guests, { ...currentGuest, id: Date.now() }])
    }
    closeModal()
  }

  const filteredGuests = guests.filter(
    (guest) =>
      guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.room.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.status.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Guest Management</h1>
        <button
          onClick={() => openModal()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Guest
        </button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search guests..."
            className="pl-10 pr-4 py-2 border rounded-md w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Guest
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Check In
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Check Out
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Preferences
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredGuests.map((guest) => (
                <tr key={guest.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-700">{guest.name.charAt(0)}</span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{guest.name}</div>
                        <div className="text-sm text-gray-500">{guest.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{guest.room}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{guest.checkIn}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{guest.checkOut}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        guest.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : guest.status === "Upcoming"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {guest.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>Diet: {guest.preferences.dietaryRestrictions}</div>
                    <div>Temp: {guest.preferences.roomTemperature}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900" onClick={() => openModal(guest)}>
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} title={currentGuest?.id ? "Edit Guest" : "Add New Guest"}>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Guest Name</label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={currentGuest?.name || ""}
              onChange={(e) => setCurrentGuest({ ...currentGuest, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={currentGuest?.email || ""}
              onChange={(e) => setCurrentGuest({ ...currentGuest, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={currentGuest?.phone || ""}
              onChange={(e) => setCurrentGuest({ ...currentGuest, phone: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Room</label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={currentGuest?.room || ""}
              onChange={(e) => setCurrentGuest({ ...currentGuest, room: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Check In</label>
              <input
                type="date"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={currentGuest?.checkIn || ""}
                onChange={(e) => setCurrentGuest({ ...currentGuest, checkIn: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Check Out</label>
              <input
                type="date"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={currentGuest?.checkOut || ""}
                onChange={(e) => setCurrentGuest({ ...currentGuest, checkOut: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={currentGuest?.status || ""}
              onChange={(e) => setCurrentGuest({ ...currentGuest, status: e.target.value })}
            >
              <option value="Upcoming">Upcoming</option>
              <option value="Active">Active</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Dietary Restrictions</label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={currentGuest?.preferences?.dietaryRestrictions || ""}
              onChange={(e) =>
                setCurrentGuest({
                  ...currentGuest,
                  preferences: {
                    ...currentGuest.preferences,
                    dietaryRestrictions: e.target.value,
                  },
                })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Room Temperature Preference</label>
            <select
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={currentGuest?.preferences?.roomTemperature || ""}
              onChange={(e) =>
                setCurrentGuest({
                  ...currentGuest,
                  preferences: {
                    ...currentGuest.preferences,
                    roomTemperature: e.target.value,
                  },
                })
              }
            >
              <option value="">Select Preference</option>
              <option value="Cool">Cool</option>
              <option value="Normal">Normal</option>
              <option value="Warm">Warm</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Special Requests</label>
            <textarea
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              rows="3"
              value={currentGuest?.preferences?.specialRequests || ""}
              onChange={(e) =>
                setCurrentGuest({
                  ...currentGuest,
                  preferences: {
                    ...currentGuest.preferences,
                    specialRequests: e.target.value,
                  },
                })
              }
            ></textarea>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="button"
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-3"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              type="button"
              className="bg-blue-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={handleSaveGuest}
            >
              Save
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Guests

