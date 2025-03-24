"use client"

import { useState } from "react"
import { PlusIcon, EditIcon, SearchIcon } from "../components/Icons"
import Modal from "../components/Modal"

const Activities = () => {
  const [activities, setActivities] = useState([
    {
      id: 1,
      name: "Scuba Diving",
      type: "Water Sports",
      price: 120,
      duration: "3 hours",
      capacity: 8,
      status: "Available",
      description: "Explore the vibrant coral reefs with our experienced instructors.",
      equipment: "All equipment provided",
      minAge: 12,
    },
    {
      id: 2,
      name: "Yoga Retreat",
      type: "Wellness",
      price: 45,
      duration: "1.5 hours",
      capacity: 15,
      status: "Available",
      description: "Rejuvenate your mind and body with our beachside yoga sessions.",
      equipment: "Yoga mats provided",
      minAge: 16,
    },
    {
      id: 3,
      name: "Jungle Trekking",
      type: "Adventure",
      price: 85,
      duration: "4 hours",
      capacity: 12,
      status: "Unavailable",
      description: "Explore the lush tropical jungle with our expert guides.",
      equipment: "Hiking boots recommended",
      minAge: 10,
    },
    {
      id: 4,
      name: "Sunset Sailing",
      type: "Water Sports",
      price: 95,
      duration: "2.5 hours",
      capacity: 20,
      status: "Available",
      description: "Enjoy the breathtaking sunset views from our luxury catamaran.",
      equipment: "Life jackets provided",
      minAge: 5,
    },
    {
      id: 5,
      name: "Beach Bonfire & BBQ",
      type: "Leisure",
      price: 60,
      duration: "3 hours",
      capacity: 25,
      status: "Available",
      description: "Relax under the stars with live music, delicious BBQ, and a cozy bonfire.",
      equipment: "Seating and BBQ equipment provided",
      minAge: 0,
    },
    {
      id: 6,
      name: "Kayaking Adventure",
      type: "Water Sports",
      price: 50,
      duration: "2 hours",
      capacity: 10,
      status: "Available",
      description: "Paddle through scenic routes and discover hidden lagoons.",
      equipment: "Kayaks and safety gear provided",
      minAge: 8,
    },
    {
      id: 7,
      name: "Cooking Class with Local Chefs",
      type: "Culinary",
      price: 70,
      duration: "2.5 hours",
      capacity: 12,
      status: "Available",
      description: "Learn how to prepare authentic local dishes with professional chefs.",
      equipment: "All ingredients and utensils provided",
      minAge: 12,
    },
    {
      id: 8,
      name: "Stargazing Night",
      type: "Leisure",
      price: 40,
      duration: "1.5 hours",
      capacity: 30,
      status: "Available",
      description: "Observe the night sky through high-powered telescopes with an expert guide.",
      equipment: "Telescopes and star charts provided",
      minAge: 5,
    },
    {
      id: 9,
      name: "ATV Off-Road Experience",
      type: "Adventure",
      price: 100,
      duration: "2 hours",
      capacity: 6,
      status: "Available",
      description: "Ride through rugged trails and explore the wilderness on an ATV.",
      equipment: "Helmets and safety gear provided",
      minAge: 16,
    },
    {
      id: 10,
      name: "Zip Lining",
      type: "Adventure",
      price: 75,
      duration: "1.5 hours",
      capacity: 10,
      status: "Available",
      description: "Experience the thrill of soaring through the treetops on high-speed zip lines.",
      equipment: "Safety harnesses provided",
      minAge: 12,
    },
    {
      id: 11,
      name: "Deep Sea Fishing",
      type: "Water Sports",
      price: 110,
      duration: "4 hours",
      capacity: 8,
      status: "Available",
      description: "Embark on a deep-sea fishing trip with expert guides and top-quality gear.",
      equipment: "Fishing rods and bait provided",
      minAge: 10,
    },
    {
      id: 12,
      name: "Hot Air Balloon Ride",
      type: "Aerial Adventure",
      price: 250,
      duration: "1 hour",
      capacity: 6,
      status: "Available",
      description: "Enjoy breathtaking aerial views from a hot air balloon ride.",
      equipment: "Safety briefing and flight certificate provided",
      minAge: 10,
    },
    {
      id: 13,
      name: "Rock Climbing",
      type: "Adventure",
      price: 80,
      duration: "3 hours",
      capacity: 6,
      status: "Available",
      description: "Scale natural rock formations with expert guidance and safety gear.",
      equipment: "Helmets, harnesses, and climbing shoes provided",
      minAge: 14,
    },
    {
      id: 14,
      name: "Cave Exploration",
      type: "Adventure",
      price: 95,
      duration: "3.5 hours",
      capacity: 10,
      status: "Available",
      description: "Discover hidden caves and underground formations with experienced guides.",
      equipment: "Helmets and flashlights provided",
      minAge: 10,
    },
    {
      id: 15,
      name: "Archery Lessons",
      type: "Sports",
      price: 50,
      duration: "2 hours",
      capacity: 12,
      status: "Available",
      description: "Learn the art of archery with professional instructors in a scenic setting.",
      equipment: "Bows, arrows, and safety gear provided",
      minAge: 8,
    },
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentActivity, setCurrentActivity] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")

  const openModal = (activity = null) => {
    setCurrentActivity(
      activity || {
        name: "",
        type: "",
        price: 0,
        duration: "",
        capacity: 0,
        status: "Available",
        description: "",
        equipment: "",
        minAge: 0,
      },
    )
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setCurrentActivity(null)
  }

  const handleSaveActivity = () => {
    if (currentActivity.id) {
      // Update existing activity
      setActivities(activities.map((activity) => (activity.id === currentActivity.id ? currentActivity : activity)))
    } else {
      // Add new activity
      setActivities([...activities, { ...currentActivity, id: Date.now() }])
    }
    closeModal()
  }

  const toggleActivityStatus = (id) => {
    setActivities(
      activities.map((activity) => {
        if (activity.id === id) {
          const newStatus = activity.status === "Available" ? "Unavailable" : "Available"
          return { ...activity, status: newStatus }
        }
        return activity
      }),
    )
  }

  const updateActivityPrice = (id, price) => {
    setActivities(
      activities.map((activity) => {
        if (activity.id === id) {
          return { ...activity, price }
        }
        return activity
      }),
    )
  }

  const filteredActivities = activities.filter(
    (activity) =>
      activity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.status.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Activity Management</h1>
        <button
          onClick={() => openModal()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Activity
        </button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search activities..."
            className="pl-10 pr-4 py-2 border rounded-md w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredActivities.map((activity) => (
          <div key={activity.id} className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">{activity.name}</h2>
                  <p className="text-sm text-gray-500">{activity.type}</p>
                </div>
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${activity.status === "Available" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                >
                  {activity.status}
                </span>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Price:</span>
                  <div className="flex items-center">
                    <span className="font-medium">${activity.price}</span>
                    <button
                      className="ml-2 text-blue-600 hover:text-blue-800"
                      onClick={() => {
                        const newPrice = prompt("Enter new price:", activity.price)
                        if (newPrice && !isNaN(newPrice)) {
                          updateActivityPrice(activity.id, Number(newPrice))
                        }
                      }}
                    >
                      <EditIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">{activity.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Capacity:</span>
                  <span className="font-medium">{activity.capacity} people</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Min Age:</span>
                  <span className="font-medium">{activity.minAge} years</span>
                </div>
              </div>

              <p className="mt-4 text-sm text-gray-600">{activity.description}</p>

              <div className="mt-6 flex justify-between">
                <button
                  className="bg-white border border-gray-300 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-50"
                  onClick={() => openModal(activity)}
                >
                  Edit Details
                </button>
                <button
                  className={`px-3 py-1 rounded-md ${activity.status === "Available"
                      ? "bg-red-100 text-red-800 hover:bg-red-200"
                      : "bg-green-100 text-green-800 hover:bg-green-200"
                    }`}
                  onClick={() => toggleActivityStatus(activity.id)}
                >
                  {activity.status === "Available" ? "Mark Unavailable" : "Mark Available"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={currentActivity?.id ? "Edit Activity" : "Add New Activity"}
      >
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Activity Name</label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={currentActivity?.name || ""}
              onChange={(e) => setCurrentActivity({ ...currentActivity, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Activity Type</label>
            <select
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={currentActivity?.type || ""}
              onChange={(e) => setCurrentActivity({ ...currentActivity, type: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={currentActivity?.price || ""}
              onChange={(e) => setCurrentActivity({ ...currentActivity, price: Number(e.target.value) })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Duration</label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={currentActivity?.duration || ""}
              onChange={(e) => setCurrentActivity({ ...currentActivity, duration: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Capacity</label>
            <input
              type="number"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={currentActivity?.capacity || ""}
              onChange={(e) => setCurrentActivity({ ...currentActivity, capacity: Number(e.target.value) })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={currentActivity?.status || ""}
              onChange={(e) => setCurrentActivity({ ...currentActivity, status: e.target.value })}
            >
              <option value="Available">Available</option>
              <option value="Unavailable">Unavailable</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              rows="3"
              value={currentActivity?.description || ""}
              onChange={(e) => setCurrentActivity({ ...currentActivity, description: e.target.value })}
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Equipment</label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={currentActivity?.equipment || ""}
              onChange={(e) => setCurrentActivity({ ...currentActivity, equipment: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Minimum Age</label>
            <input
              type="number"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={currentActivity?.minAge || ""}
              onChange={(e) => setCurrentActivity({ ...currentActivity, minAge: Number(e.target.value) })}
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
              onClick={handleSaveActivity}
            >
              Save
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Activities

