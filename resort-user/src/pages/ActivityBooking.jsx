"use client"

import { useState } from "react"

const ActivityBooking = () => {
  const [selectedActivity, setSelectedActivity] = useState(null)
  const [selectedDate, setSelectedDate] = useState("")
  const [participants, setParticipants] = useState(1)

  const activities = [
    {
      id: 1,
      name: "Scuba Diving",
      description:
        "Explore the vibrant coral reefs with our experienced instructors. Perfect for beginners and advanced divers alike.",
      type: "Water Sports",
      price: 120,
      duration: "3 hours",
      capacity: 8,
      status: "Available",
      schedule: ["9:00 AM", "2:00 PM"],
      minAge: 12,
      equipment: "All equipment provided",
      image: "https://www.sunrise-divers.com/wp-content/uploads/2016/04/discover-scuba.jpg",
    },
    {
      id: 2,
      name: "Yoga Retreat",
      description: "Rejuvenate your mind and body with our beachside yoga sessions led by certified instructors.",
      type: "Wellness",
      price: 45,
      duration: "1.5 hours",
      capacity: 15,
      status: "Available",
      schedule: ["7:00 AM", "5:00 PM"],
      minAge: 16,
      equipment: "Yoga mats provided",
      image: "https://retreatmehappy.com/wp-content/uploads/2020/02/NSW-Yoga-Retreat.jpg",
    },
    {
      id: 3,
      name: "Jungle Trekking",
      description:
        "Explore the lush tropical jungle with our expert guides. Discover exotic plants and wildlife in their natural habitat.",
      type: "Adventure",
      price: 85,
      duration: "4 hours",
      capacity: 12,
      status: "Available",
      schedule: ["8:00 AM"],
      minAge: 10,
      equipment: "Hiking boots recommended",
      image: "https://static.toiimg.com/photo/msid-84408827,width-96,height-65.cms",
    },
    {
      id: 4,
      name: "Sunset Sailing",
      description:
        "Enjoy the breathtaking sunset views from our luxury catamaran while sipping on complimentary drinks.",
      type: "Water Sports",
      price: 95,
      duration: "2.5 hours",
      capacity: 20,
      status: "Available",
      schedule: ["5:30 PM"],
      minAge: 5,
      equipment: "Life jackets provided",
      image: "https://th.bing.com/th/id/OIP.VT_b8_7FO7r-fFptjCwV_wHaEo?rs=1&pid=ImgDetMain",
    },
    {
      id: 5,
      name: "Cooking Class",
      description: "Learn to prepare local delicacies with our master chef. Take home recipes and culinary skills.",
      type: "Cultural",
      price: 75,
      duration: "2 hours",
      capacity: 10,
      status: "Available",
      schedule: ["11:00 AM", "4:00 PM"],
      minAge: 8,
      equipment: "All cooking equipment provided",
      image: "https://th.bing.com/th/id/OIP.Q0X63Lb5akkAubBC2M0cdgHaE8?rs=1&pid=ImgDetMain",
    },
    {
      id: 6,
      name: "Spa Package",
      description: "Indulge in a luxurious spa treatment including massage, facial, and aromatherapy.",
      type: "Wellness",
      price: 180,
      duration: "3 hours",
      capacity: "Individual",
      status: "Available",
      schedule: ["10:00 AM", "1:00 PM", "4:00 PM"],
      minAge: 16,
      equipment: "Robes and slippers provided",
      image: "https://images.prestigeonline.com/wp-content/uploads/sites/8/2022/01/08141756/136119408_4221376651224112_6561750045379500471_n-1024x512.jpeg",
    },
  ]

  const [selectedTime, setSelectedTime] = useState("")
  const [filteredType, setFilteredType] = useState("All")

  const handleActivitySelect = (activity) => {
    setSelectedActivity(activity)
    setSelectedTime(activity.schedule[0])
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleBookNow = () => {
    if (!selectedDate) {
      alert("Please select a date")
      return
    }

    alert(
      `Booking confirmed for ${selectedActivity.name} on ${selectedDate} at ${selectedTime} for ${participants} participant(s).`,
    )
    setSelectedActivity(null)
    setSelectedDate("")
    setParticipants(1)
    setSelectedTime("")
  }

  const filteredActivities =
    filteredType === "All" ? activities : activities.filter((activity) => activity.type === filteredType)

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Activity Booking</h1>

      {selectedActivity ? (
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img
                src={selectedActivity.image || "/placeholder.svg"}
                alt={selectedActivity.name}
                className="w-full h-160 object-cover"
              />
            </div>
            <div className="p-6 md:w-1/2">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedActivity.name}</h2>
                  <p className="text-gray-600 mt-1">{selectedActivity.type}</p>
                </div>
                <div className="text-2xl font-bold text-blue-600">
                  ${selectedActivity.price}
                  <span className="text-sm text-gray-600">/person</span>
                </div>
              </div>

              <p className="text-gray-700 mt-4">{selectedActivity.description}</p>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Duration</h3>
                  <p className="text-gray-900">{selectedActivity.duration}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Group Size</h3>
                  <p className="text-gray-900">Up to {selectedActivity.capacity} people</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Minimum Age</h3>
                  <p className="text-gray-900">{selectedActivity.minAge} years</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Equipment</h3>
                  <p className="text-gray-900">{selectedActivity.equipment}</p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Select Date</label>
                  <input
                    type="date"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Select Time</label>
                  <select
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                  >
                    {selectedActivity.schedule.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Number of Participants</label>
                  <select
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={participants}
                    onChange={(e) => setParticipants(Number(e.target.value))}
                  >
                    {[
                      ...Array(
                        selectedActivity.capacity === "Individual" ? 1 : Math.min(10, selectedActivity.capacity),
                      ).keys(),
                    ].map((num) => (
                      <option key={num + 1} value={num + 1}>
                        {num + 1}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-6 flex space-x-4">
                <button
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  onClick={() => setSelectedActivity(null)}
                >
                  Back to Activities
                </button>
                <button
                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={handleBookNow}
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="mb-6 bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 sm:mb-0">Available Activities</h2>
              <div className="flex space-x-2">
                <select
                  className="border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={filteredType}
                  onChange={(e) => setFilteredType(e.target.value)}
                >
                  <option value="All">All Types</option>
                  <option value="Water Sports">Water Sports</option>
                  <option value="Wellness">Wellness</option>
                  <option value="Adventure">Adventure</option>
                  <option value="Cultural">Cultural</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredActivities.map((activity) => (
              <div key={activity.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src={activity.image || "/placeholder.svg"}
                  alt={activity.name}
                  className="w-full h-80 object-cover"
                />
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">{activity.name}</h2>
                      <p className="text-gray-600 mt-1">{activity.type}</p>
                    </div>
                    <div className="text-xl font-bold text-blue-600">${activity.price}</div>
                  </div>

                  <p className="text-gray-700 mt-3 line-clamp-2">{activity.description}</p>

                  <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                    <div className="text-gray-600">
                      <span className="font-medium">Duration:</span> {activity.duration}
                    </div>
                    <div className="text-gray-600">
                      <span className="font-medium">Capacity:</span> {activity.capacity}
                    </div>
                    <div className="text-gray-600">
                      <span className="font-medium">Min Age:</span> {activity.minAge}+
                    </div>
                    <div className="text-gray-600">
                      <span className="font-medium">Times:</span> {activity.schedule.join(", ")}
                    </div>
                  </div>

                  <div className="mt-6">
                    <button
                      className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onClick={() => handleActivitySelect(activity)}
                    >
                      View Details & Book
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default ActivityBooking

