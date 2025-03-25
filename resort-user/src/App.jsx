import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import UserNavbar from "./components/UserNavbar"
import UserDashboard from "./pages/UserDashboard"
import RoomBooking from "./pages/RoomBooking"
import ActivityBooking from "./pages/ActivityBooking"
import FacilityViewer from "./pages/FacilityViewer"
import UserWallet from "./pages/UserWallet"
import UserProfile from "./pages/UserProfile"
import "./index.css"

function UserApp() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <UserNavbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<UserDashboard />} />
            <Route path="/rooms" element={<RoomBooking />} />
            <Route path="/activities" element={<ActivityBooking />} />
            <Route path="/facilities" element={<FacilityViewer />} />
            <Route path="/wallet" element={<UserWallet />} />
            <Route path="/profile" element={<UserProfile />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default UserApp

