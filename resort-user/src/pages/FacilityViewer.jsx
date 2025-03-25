const FacilityViewer = () => {
  const facilities = [
    {
      id: 1,
      name: "Main Swimming Pool",
      description: "Our expansive main pool features a swim-up bar, comfortable loungers, and stunning ocean views.",
      type: "Pool",
      status: "Operational",
      hours: "7:00 AM - 8:00 PM",
      details: {
        waterQuality: "Excellent",
        temperature: 82,
        chlorineLevel: "Normal",
        phLevel: 7.4,
        lastCleaned: "2023-06-15",
      },
      image: "/placeholder.svg?height=300&width=500&text=Main+Swimming+Pool",
    },
    {
      id: 2,
      name: "Kids Swimming Pool",
      description: "A safe and fun environment for children with water slides and shallow areas.",
      type: "Pool",
      status: "Operational",
      hours: "8:00 AM - 7:00 PM",
      details: {
        waterQuality: "Good",
        temperature: 84,
        chlorineLevel: "Normal",
        phLevel: 7.2,
        lastCleaned: "2023-06-14",
      },
      image: "/placeholder.svg?height=300&width=500&text=Kids+Swimming+Pool",
    },
    {
      id: 3,
      name: "Luxury Spa",
      description:
        "Indulge in a variety of treatments including massages, facials, and body wraps in our tranquil spa.",
      type: "Spa",
      status: "Operational",
      hours: "10:00 AM - 8:00 PM",
      details: {
        temperature: 102,
        waterQuality: "Excellent",
        lastCleaned: "2023-06-15",
        capacity: 8,
      },
      image: "/placeholder.svg?height=300&width=500&text=Luxury+Spa",
    },
    {
      id: 4,
      name: "Fitness Center",
      description: "State-of-the-art fitness equipment, personal trainers, and daily fitness classes.",
      type: "Gym",
      status: "Operational",
      hours: "6:00 AM - 10:00 PM",
      details: {
        temperature: 70,
        lastCleaned: "2023-06-15",
        equipmentStatus: "All Operational",
      },
      image: "/placeholder.svg?height=300&width=500&text=Fitness+Center",
    },
    {
      id: 5,
      name: "Tennis Court",
      description: "Professional-grade tennis courts with equipment rental and coaching available.",
      type: "Sport",
      status: "Under Maintenance",
      hours: "7:00 AM - 9:00 PM",
      details: {
        surface: "Hard Court",
        lastMaintenance: "2023-06-10",
        nextAvailable: "2023-06-20",
      },
      image: "/placeholder.svg?height=300&width=500&text=Tennis+Court",
    },
    {
      id: 6,
      name: "Beach Area",
      description: "Private beach access with loungers, umbrellas, and beach service.",
      type: "Beach",
      status: "Operational",
      hours: "6:00 AM - 10:00 PM",
      details: {
        waterQuality: "Excellent",
        temperature: 78,
        waveCondition: "Calm",
        flagStatus: "Green",
      },
      image: "/placeholder.svg?height=300&width=500&text=Beach+Area",
    },
  ]

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Resort Facilities</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {facilities.map((facility) => (
          <div key={facility.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={facility.image || "/placeholder.svg"} alt={facility.name} className="w-full h-48 object-cover" />
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{facility.name}</h2>
                  <p className="text-gray-600 mt-1">{facility.type}</p>
                </div>
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    facility.status === "Operational" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}
                >
                  {facility.status}
                </span>
              </div>

              <p className="text-gray-700 mt-3">{facility.description}</p>

              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-700">Hours</h3>
                <p className="text-gray-900">{facility.hours}</p>
              </div>

              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-700">Current Conditions</h3>
                <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2">
                  {facility.type === "Pool" || facility.type === "Spa" || facility.type === "Beach" ? (
                    <>
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Water Quality:</span> {facility.details.waterQuality}
                      </div>
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Temperature:</span> {facility.details.temperature}°F
                      </div>
                      {facility.type === "Pool" && (
                        <>
                          <div className="text-sm text-gray-600">
                            <span className="font-medium">pH Level:</span> {facility.details.phLevel}
                          </div>
                          <div className="text-sm text-gray-600">
                            <span className="font-medium">Last Cleaned:</span> {facility.details.lastCleaned}
                          </div>
                        </>
                      )}
                      {facility.type === "Beach" && (
                        <>
                          <div className="text-sm text-gray-600">
                            <span className="font-medium">Wave Condition:</span> {facility.details.waveCondition}
                          </div>
                          <div className="text-sm text-gray-600">
                            <span className="font-medium">Flag Status:</span> {facility.details.flagStatus}
                          </div>
                        </>
                      )}
                    </>
                  ) : facility.type === "Gym" ? (
                    <>
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Temperature:</span> {facility.details.temperature}°F
                      </div>
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Equipment:</span> {facility.details.equipmentStatus}
                      </div>
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Last Cleaned:</span> {facility.details.lastCleaned}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Surface:</span> {facility.details.surface}
                      </div>
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Last Maintenance:</span> {facility.details.lastMaintenance}
                      </div>
                      {facility.status === "Under Maintenance" && (
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">Next Available:</span> {facility.details.nextAvailable}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FacilityViewer

