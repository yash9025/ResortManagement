"use client"

import { useState } from "react"

const RoomBooking = () => {
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)

  const rooms = [
    {
      id: 1,
      name: "Ocean View Suite",
      description: "Luxurious suite with panoramic ocean views, king-size bed, and private balcony.",
      price: 450,
      capacity: "2 Adults, 2 Children",
      amenities: ["King Bed", "Ocean View", "Balcony", "Mini Bar", "Free Wi-Fi"],
      ambiance: {
        temperature: 72,
        lighting: "Warm",
        cleanliness: "Excellent",
      },
      images: ["https://www.oberoihotels.com/-/media/oberoi-hotels/website-images/the-oberoi-udaivilas-udaipur/room-and-suites/luxury-suite/detail/touv-luxury-suite-pool-724x407.jpg?w=724&extension=webp&hash=46128621e1ba96a6b76adc29415a2c31" , "https://www.oberoihotels.com/-/media/oberoi-hotels/website-images/the-oberoi-udaivilas-udaipur/room-and-suites/room-and-suite-gallery-1448x814/our-luxury-suites-with-private-pool/udaivilas-luxury-suite-drawing-room-1.jpg?w=310&extension=webp&hash=11691afe78ac71595cb10f7559f91b92"],
    },
    {
      id: 2,
      name: "Garden Villa",
      description: "Spacious villa surrounded by lush tropical gardens with private terrace.",
      price: 550,
      capacity: "4 Adults, 2 Children",
      amenities: ["2 Queen Beds", "Garden View", "Private Terrace", "Kitchenette", "Free Wi-Fi"],
      ambiance: {
        temperature: 70,
        lighting: "Natural",
        cleanliness: "Excellent",
      },
      images: ["https://www.oberoihotels.com/-/media/oberoi-hotels/website-images/the-oberoi-udaivilas-udaipur/room-and-suites/premier-room/detail/udaivilas---premier-room--2.jpg?w=724&extension=webp&hash=bda409281fc8dde42e7882f7990da23f"],
    },
    {
      id: 3,
      name: "Deluxe Room",
      description: "Comfortable room with modern amenities and resort view.",
      price: 350,
      capacity: "2 Adults",
      amenities: ["Queen Bed", "Resort View", "Work Desk", "Mini Fridge", "Free Wi-Fi"],
      ambiance: {
        temperature: 71,
        lighting: "Bright",
        cleanliness: "Good",
      },
      images: ["https://www.oberoihotels.com/-/media/oberoi-hotels/website-images/the-oberoi-udaivilas-udaipur/room-and-suites/premier-room-with-pool-view/detail/udaivilas---premier-room-with-pool-view-1.jpg?w=724&extension=webp&hash=4619951148ff7463ff383877baeefc0a"],
    },
    {
      id: 4,
      name: "Presidential Suite",
      description: "Our most luxurious accommodation with separate living areas and premium amenities.",
      price: 950,
      capacity: "4 Adults, 2 Children",
      amenities: ["King Bed", "Ocean View", "Living Room", "Dining Area", "Private Terrace", "Jacuzzi"],
      ambiance: {
        temperature: 73,
        lighting: "Customizable",
        cleanliness: "Excellent",
      },
      images: ["https://www.oberoihotels.com/-/media/oberoi-hotels/website-images/the-oberoi-udaivilas-udaipur/room-and-suites/room-and-suite-gallery-1448x814/our-luxury-suites-with-private-pool/udaivilas-luxury-suite-room-1.jpg?w=310&extension=webp&hash=7bb09f0321e7cbb888da07c15835c7aa"],
    },
  ]

  const handleRoomSelect = (room) => {
    setSelectedRoom(room)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleBookNow = () => {
    if (!checkIn || !checkOut) {
      alert("Please select check-in and check-out dates")
      return
    }

    alert(
      `Booking confirmed for ${selectedRoom.name} from ${checkIn} to ${checkOut} for ${adults} adults and ${children} children.`,
    )
    setSelectedRoom(null)
    setCheckIn("")
    setCheckOut("")
    setAdults(2)
    setChildren(0)
  }

  return (
    <div className="fade-in">
      <h1 className="section-title gradient-text">Room Booking</h1>

      {selectedRoom ? (
        <div className="glass mb-8">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img
                src={selectedRoom.images[0] || "/placeholder.svg"}
                alt={selectedRoom.name}
                className="w-full h-180 object-cover rounded-t-xl md:rounded-l-xl md:rounded-tr-none"
              />
            </div>
            <div className="p-6 md:w-1/2">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedRoom.name}</h2>
                  <p className="text-gray-600 mt-1">{selectedRoom.capacity}</p>
                </div>
                <div className="text-2xl font-bold gradient-text">
                  ${selectedRoom.price}
                  <span className="text-sm text-gray-600">/night</span>
                </div>
              </div>

              <p className="text-gray-700 mt-4">{selectedRoom.description}</p>

              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-900">Room Ambiance</h3>
                <div className="grid grid-cols-3 gap-4 mt-2">
                  <div className="bg-blue-50 p-3 rounded-md text-center transform transition-all duration-300 hover:scale-105">
                    <div className="text-sm text-gray-600">Temperature</div>
                    <div className="font-semibold text-blue-700">{selectedRoom.ambiance.temperature}°F</div>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-md text-center transform transition-all duration-300 hover:scale-105">
                    <div className="text-sm text-gray-600">Lighting</div>
                    <div className="font-semibold text-blue-700">{selectedRoom.ambiance.lighting}</div>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-md text-center transform transition-all duration-300 hover:scale-105">
                    <div className="text-sm text-gray-600">Cleanliness</div>
                    <div className="font-semibold text-blue-700">{selectedRoom.ambiance.cleanliness}</div>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-900">Amenities</h3>
                <ul className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2">
                  {selectedRoom.amenities.map((amenity, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <svg
                        className="h-5 w-5 text-green-500 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      {amenity}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Check In</label>
                    <input
                      type="date"
                      className="input-fancy"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Check Out</label>
                    <input
                      type="date"
                      className="input-fancy"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Adults</label>
                    <select className="select-fancy" value={adults} onChange={(e) => setAdults(Number(e.target.value))}>
                      {[1, 2, 3, 4].map((num) => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Children</label>
                    <select
                      className="select-fancy"
                      value={children}
                      onChange={(e) => setChildren(Number(e.target.value))}
                    >
                      {[0, 1, 2, 3, 4].map((num) => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex space-x-4">
                <button
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  onClick={() => setSelectedRoom(null)}
                >
                  Back to Rooms
                </button>
                <button className="btn-primary" onClick={handleBookNow}>
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mb-6 glass p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Find Your Perfect Room</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Check In</label>
              <input type="date" className="input-fancy" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Check Out</label>
              <input
                type="date"
                className="input-fancy"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Guests</label>
              <div className="flex mt-1">
                <select
                  className="block w-full border border-gray-300 rounded-l-xl shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={adults}
                  onChange={(e) => setAdults(Number(e.target.value))}
                >
                  {[1, 2, 3, 4].map((num) => (
                    <option key={num} value={num}>
                      {num} Adult{num !== 1 ? "s" : ""}
                    </option>
                  ))}
                </select>
                <select
                  className="block w-full border-t border-b border-r border-gray-300 rounded-r-xl shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={children}
                  onChange={(e) => setChildren(Number(e.target.value))}
                >
                  {[0, 1, 2, 3, 4].map((num) => (
                    <option key={num} value={num}>
                      {num} Child{num !== 1 ? "ren" : ""}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex items-end">
              <button className="btn-primary w-full">Search</button>
            </div>
          </div>
        </div>
      )}

      {!selectedRoom && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rooms.map((room, index) => (
            <div key={room.id} className="card card-hover animate-float" style={{ animationDelay: `${index * 0.1}s` }}>
              <img
                src={room.images[0] || "/placeholder.svg"}
                alt={room.name}
                className="w-full h-100 object-cover rounded-t-2xl"
              />
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">{room.name}</h2>
                    <p className="text-gray-600 mt-1">{room.capacity}</p>
                  </div>
                  <div className="text-xl font-bold gradient-text">
                    ${room.price}
                    <span className="text-sm text-gray-600">/night</span>
                  </div>
                </div>

                <p className="text-gray-700 mt-3">{room.description}</p>

                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-700">Room Ambiance</h3>
                  <div className="flex space-x-4 mt-2">
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Temperature:</span> {room.ambiance.temperature}°F
                    </div>
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Lighting:</span> {room.ambiance.lighting}
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-700">Amenities</h3>
                  <div className="flex flex-wrap mt-2">
                    {room.amenities.slice(0, 3).map((amenity, index) => (
                      <span key={index} className="badge badge-primary mr-2 mb-2">
                        {amenity}
                      </span>
                    ))}
                    {room.amenities.length > 3 && (
                      <span className="badge badge-primary mr-2 mb-2">+{room.amenities.length - 3} more</span>
                    )}
                  </div>
                </div>

                <div className="mt-6">
                  <button className="btn-primary w-full" onClick={() => handleRoomSelect(room)}>
                    View Details & Book
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default RoomBooking

