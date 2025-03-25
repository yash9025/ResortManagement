import { Link } from "react-router-dom"

const UserDashboard = () => {
  return (
    <div className="fade-in">
      <h1 className="section-title gradient-text">Welcome to Sunset Resort</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="card card-hover">
          <img
            src="https://www.cfmedia.vfmleonardo.com/imageRepo/1/0/34/450/786/The_Oberoi_Udaivilas_-_Semi_private_pools_S.jpg"
            alt="Resort View"
            className="w-full h-100 object-cover"
          />
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Your Upcoming Stay</h2>
            <div className="space-y-2">
              <p className="text-gray-700">
                <span className="font-medium">Check-in:</span> June 20, 2023
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Check-out:</span> June 25, 2023
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Room:</span> Ocean View Suite
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Guests:</span> 2 Adults, 1 Child
              </p>
            </div>
            <div className="mt-4">
              <Link to="/rooms" className="btn-primary inline-block">
                View Booking Details
              </Link>
            </div>
          </div>
        </div>

        <div className="glass p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Wallet</h2>
          <div className="bg-blue-50 rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-700 font-medium">Available Balance</span>
              <span className="text-2xl font-bold gradient-text">$250.75</span>
            </div>
            <div className="mt-2 text-sm text-gray-600">You have 2 active offers available</div>
          </div>
          <div className="space-y-3">
            <div className="border border-green-200 bg-green-50 rounded-md p-3 transform transition-all duration-300 hover:scale-105">
              <div className="font-medium text-green-800">Summer Special</div>
              <div className="text-sm text-green-700">20% off on all room bookings</div>
              <div className="text-xs text-green-600 mt-1">Valid until Aug 31, 2023</div>
            </div>
            <div className="border border-blue-200 bg-blue-50 rounded-md p-3 transform transition-all duration-300 hover:scale-105">
              <div className="font-medium text-blue-800">Loyalty Reward</div>
              <div className="text-sm text-blue-700">5% cashback on all bookings</div>
              <div className="text-xs text-blue-600 mt-1">Valid until Dec 31, 2023</div>
            </div>
          </div>
          <div className="mt-4">
            <Link to="/wallet" className="btn-secondary inline-block">
              View Wallet Details
            </Link>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Explore Our Resort</h2>

      <div className="feature-grid">
        <div className="card card-hover animate-float">
          <img
            src="https://www.oberoihotels.com/-/media/oberoi-hotels/website-images/the-oberoi-udaivilas-udaipur/room-and-suites/premier-room-with-semi-private-pool/detail/touv-premier-city-palace-view-room-with-semi-private-pool-724x407.jpg?w=724&extension=webp&hash=5d0c78c19e8f6ebf96b596a91a8d79fc"
            alt="Rooms"
            className="w-full h-100 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Luxurious Rooms</h3>
            <p className="text-gray-600 mb-4">
              Experience comfort and luxury in our carefully designed rooms with stunning views.
            </p>
            <Link to="/rooms" className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
              Browse Rooms
              <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>

        <div className="card card-hover animate-float" style={{ animationDelay: "0.2s" }}>
          <img
            src="https://www.oberoihotels.com/-/media/oberoi-hotels/website-images/the-oberoi-udaivilas-udaipur/experiences/detail/off-the-track-724-x-426.jpg?w=724&extension=webp&hash=85bdb82a2725072e939e3bf4863927aa"
            alt="Activities"
            className="w-full h-100 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Exciting Activities</h3>
            <p className="text-gray-600 mb-4">
              From water sports to cultural experiences, we have activities for everyone.
            </p>
            <Link to="/activities" className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
              Explore Activities
              <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>

        <div className="card card-hover animate-float" style={{ animationDelay: "0.4s" }}>
          <img
            src="https://www.oberoihotels.com/-/media/oberoi-hotels/website-images/the-oberoi-udaivilas-udaipur/room-and-suites/premier-room-with-semi-private-pool/detail/touv-premier-room-with-semi-pvt-pool-pool-724x407.jpg?w=724&extension=webp&hash=381c30ebf7a9489e5613f413fe256e59"
            alt="Facilities"
            className="w-full h-100 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Premium Facilities</h3>
            <p className="text-gray-600 mb-4">Enjoy our world-class spa, swimming pools, fitness center, and more.</p>
            <Link to="/facilities" className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
              View Facilities
              <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDashboard

