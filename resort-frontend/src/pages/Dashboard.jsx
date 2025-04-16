import StatCard from "../components/StatCard"
import { UsersIcon, BedDoubleIcon, DollarIcon, CalendarIcon, SwimmingPoolIcon } from "../components/Icons"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

const Dashboard = () => {
  // Sample data for charts
  const revenueData = [
    { month: "Jan", revenue: 30000 },
    { month: "Feb", revenue: 35000 },
    { month: "Mar", revenue: 40000 },
    { month: "Apr", revenue: 45000 },
    { month: "May", revenue: 50000 },
    { month: "Jun", revenue: 55000 },
  ]

  const occupancyData = [
    { month: "Jan", occupancy: 65 },
    { month: "Feb", occupancy: 70 },
    { month: "Mar", occupancy: 75 },
    { month: "Apr", occupancy: 80 },
    { month: "May", occupancy: 85 },
    { month: "Jun", occupancy: 78 },
  ]

  // Recent bookings data
  const recentBookings = [
    {
      name: "John Smith",
      email: "john.smith@example.com",
      room: "Ocean View Suite",
      checkIn: "Jun 15, 2023",
      checkOut: "Jun 20, 2023",
      status: "Confirmed",
    },
    {
      name: "Emily Johnson",
      email: "emily.johnson@example.com",
      room: "Deluxe King Room",
      checkIn: "Jul 01, 2023",
      checkOut: "Jul 05, 2023",
      status: "Pending",
    },
    {
      name: "Michael Brown",
      email: "michael.brown@example.com",
      room: "Standard Twin Room",
      checkIn: "Jul 10, 2023",
      checkOut: "Jul 15, 2023",
      status: "Checked Out",
    },
  ]

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total Revenue" value="$245,890" icon={<DollarIcon className="h-6 w-6" />} color="green" />
        <StatCard title="Total Guests" value="250" icon={<UsersIcon className="h-6 w-6" />} color="blue" />
        <StatCard title="Available Rooms" value="43/100" icon={<BedDoubleIcon className="h-6 w-6" />} color="purple" />
        <StatCard title="Active Bookings" value="50" icon={<CalendarIcon className="h-6 w-6" />} color="yellow" />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Revenue Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Occupancy Rate</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={occupancyData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="occupancy" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

       {/* Facility Status Section */}
       <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Facility Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="border rounded-lg p-4">
            <div className="flex items-center">
              <SwimmingPoolIcon className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <h3 className="font-medium">Swimming Pool</h3>
                <span className="text-sm text-gray-600">Operational</span>
              </div>
            </div>
          </div>
          <div className="border rounded-lg p-4">
            <div className="flex items-center">
              <span className="text-purple-500 text-xl">🧖</span>
              <div className="ml-4">
                <h3 className="font-medium">Spa & Wellness</h3>
                <span className="text-sm text-gray-600">Operational</span>
              </div>
            </div>
          </div>
          <div className="border rounded-lg p-4">
            <div className="flex items-center">
              <span className="text-yellow-500 text-xl">🏄</span>
              <div className="ml-4">
                <h3 className="font-medium">Adventure Activities</h3>
                <span className="text-sm text-gray-600">Weather Dependent</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Bookings Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <h2 className="text-lg font-semibold text-gray-800 p-6 pb-0">Recent Bookings</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guest</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check In</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check Out</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentBookings.map((booking, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-700">{booking.name.charAt(0)}</span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{booking.name}</div>
                        <div className="text-sm text-gray-500">{booking.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.room}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.checkIn}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.checkOut}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        booking.status === "Confirmed"
                          ? "bg-green-100 text-green-800"
                          : booking.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
