"use client"

import { useState } from "react"
import { PlusIcon, EditIcon, SearchIcon } from "../components/Icons"
import Modal from "../components/Modal"
import Toggle from "../components/Toggle"

const Rooms = () => {
  const [rooms, setRooms] = useState([
    {
      id: 1,
      number: "101",
      type: "Ocean View Suite",
      price: 450,
      capacity: "2 Adults, 2 Children",
      status: "Available",
      maintenance: false,
      amenities: ["King Bed", "Balcony", "Mini Bar", "Ocean View"],
      ambiance: {
        temperature: 72,
        lighting: "Warm",
        cleanliness: "Excellent",
      },
    },
    {
      id: 2,
      number: "102",
      type: "Garden Villa",
      price: 550,
      capacity: "4 Adults, 2 Children",
      status: "Occupied",
      maintenance: false,
      amenities: ["2 Queen Beds", "Private Garden", "Jacuzzi", "Kitchenette"],
      ambiance: {
        temperature: 70,
        lighting: "Natural",
        cleanliness: "Excellent",
      },
    },
    {
      id: 3,
      number: "103",
      type: "Deluxe Room",
      price: 350,
      capacity: "2 Adults",
      status: "Available",
      maintenance: false,
      amenities: ["Queen Bed", "Work Desk", "Mini Fridge"],
      ambiance: {
        temperature: 71,
        lighting: "Bright",
        cleanliness: "Good",
      },
    },
    {
      id: 4,
      number: "104",
      type: "Presidential Suite",
      price: 950,
      capacity: "4 Adults, 2 Children",
      status: "Maintenance",
      maintenance: true,
      amenities: ["King Bed", "Living Room", "Dining Area", "Private Terrace", "Jacuzzi"],
      ambiance: {
        temperature: 73,
        lighting: "Customizable",
        cleanliness: "Under Renovation",
      },
    },
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentRoom, setCurrentRoom] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")

  const openModal = (room = null) => {
    setCurrentRoom(
      room || {
        number: "",
        type: "",
        price: 0,
        capacity: "",
        status: "Available",
        maintenance: false,
        amenities: [],
        ambiance: {
          temperature: 72,
          lighting: "Warm",
          cleanliness: "Excellent",
        },
      },
    )
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setCurrentRoom(null)
  }

  const handleSaveRoom = () => {
    if (currentRoom.id) {
      // Update existing room
      setRooms(rooms.map((room) => (room.id === currentRoom.id ? currentRoom : room)))
    } else {
      // Add new room
      setRooms([...rooms, { ...currentRoom, id: Date.now() }])
    }
    closeModal()
  }

  const toggleRoomAvailability = (id) => {
    setRooms(
      rooms.map((room) => {
        if (room.id === id) {
          const newStatus = room.status === "Available" ? "Unavailable" : "Available"
          return { ...room, status: newStatus }
        }
        return room
      }),
    )
  }

  const toggleRoomMaintenance = (id) => {
    setRooms(
      rooms.map((room) => {
        if (room.id === id) {
          const newMaintenance = !room.maintenance
          const newStatus = newMaintenance ? "Maintenance" : "Available"
          return { ...room, maintenance: newMaintenance, status: newStatus }
        }
        return room
      }),
    )
  }

  const updateRoomPrice = (id, price) => {
    setRooms(
      rooms.map((room) => {
        if (room.id === id) {
          return { ...room, price }
        }
        return room
      }),
    )
  }

  const filteredRooms = rooms.filter(
    (room) =>
      room.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.status.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Room Management</h1>
        <button
          onClick={() => openModal()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Room
        </button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search rooms..."
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Capacity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Maintenance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ambiance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRooms.map((room) => (
                <tr key={room.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{room.number}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{room.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <span>${room.price}</span>
                      <button
                        className="ml-2 text-blue-600 hover:text-blue-800"
                        onClick={() => {
                          const newPrice = prompt("Enter new price:", room.price)
                          if (newPrice && !isNaN(newPrice)) {
                            updateRoomPrice(room.id, Number(newPrice))
                          }
                        }}
                      >
                        <EditIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{room.capacity}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        room.status === "Available"
                          ? "bg-green-100 text-green-800"
                          : room.status === "Occupied"
                            ? "bg-blue-100 text-blue-800"
                            : room.status === "Maintenance"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {room.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Toggle enabled={room.maintenance} onChange={() => toggleRoomMaintenance(room.id)} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>Temp: {room.ambiance.temperature}°F</div>
                    <div>Light: {room.ambiance.lighting}</div>
                    <div>Clean: {room.ambiance.cleanliness}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3" onClick={() => openModal(room)}>
                      Edit
                    </button>
                    <button
                      className="text-indigo-600 hover:text-indigo-900"
                      onClick={() => toggleRoomAvailability(room.id)}
                    >
                      Toggle Availability
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} title={currentRoom?.id ? "Edit Room" : "Add New Room"}>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Room Number</label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={currentRoom?.number || ""}
              onChange={(e) => setCurrentRoom({ ...currentRoom, number: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Room Type</label>
            <select
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={currentRoom?.type || ""}
              onChange={(e) => setCurrentRoom({ ...currentRoom, type: e.target.value })}
            >
              <option value="">Select Type</option>
              <option value="Ocean View Suite">Ocean View Suite</option>
              <option value="Garden Villa">Garden Villa</option>
              <option value="Deluxe Room">Deluxe Room</option>
              <option value="Presidential Suite">Presidential Suite</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Price per Night</label>
            <input
              type="number"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={currentRoom?.price || ""}
              onChange={(e) => setCurrentRoom({ ...currentRoom, price: Number(e.target.value) })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Capacity</label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={currentRoom?.capacity || ""}
              onChange={(e) => setCurrentRoom({ ...currentRoom, capacity: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={currentRoom?.status || ""}
              onChange={(e) => setCurrentRoom({ ...currentRoom, status: e.target.value })}
            >
              <option value="Available">Available</option>
              <option value="Occupied">Occupied</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Unavailable">Unavailable</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Room Temperature (°F)</label>
            <input
              type="number"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={currentRoom?.ambiance?.temperature || 72}
              onChange={(e) =>
                setCurrentRoom({
                  ...currentRoom,
                  ambiance: {
                    ...currentRoom.ambiance,
                    temperature: Number(e.target.value),
                  },
                })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Lighting</label>
            <select
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={currentRoom?.ambiance?.lighting || ""}
              onChange={(e) =>
                setCurrentRoom({
                  ...currentRoom,
                  ambiance: {
                    ...currentRoom.ambiance,
                    lighting: e.target.value,
                  },
                })
              }
            >
              <option value="Warm">Warm</option>
              <option value="Bright">Bright</option>
              <option value="Natural">Natural</option>
              <option value="Customizable">Customizable</option>
            </select>
          </div>

          <div className="flex items-center mt-4">
            <Toggle
              enabled={currentRoom?.maintenance || false}
              onChange={(value) =>
                setCurrentRoom({
                  ...currentRoom,
                  maintenance: value,
                  status: value ? "Maintenance" : currentRoom.status,
                })
              }
              label="Under Maintenance"
            />
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
              onClick={handleSaveRoom}
            >
              Save
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Rooms

