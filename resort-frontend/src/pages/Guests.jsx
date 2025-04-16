import { useState, useEffect } from "react"
import axios from "axios"
import { PlusIcon, SearchIcon, EditIcon, TrashIcon } from "../components/Icons"
import Modal from "../components/Modal"

const Guests = () => {
  const [guests, setGuests] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentGuest, setCurrentGuest] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")

  // Fetch guests data from the backend
  useEffect(() => {
    fetchGuests()
  }, [])

  const fetchGuests = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/guests")
      setGuests(response.data)
    } catch (error) {
      console.error("Error fetching guests:", error)
    }
  }

  const openModal = (guest = null) => {
    setCurrentGuest(
      guest || {
        name: "",
        email: "",
        phone: "",
        tier: "Bronze",
        dietaryrestrictions: "",
        preferredroomtemperature: "22",
        specialrequest: "",
      }
    )
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false);  // Close the modal
    setCurrentGuest({});    // Reset the guest data to an empty object, not null
  };


  // Add new guest function
  const addGuest = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/guests", currentGuest);
      console.log("Guest added:", response.data); // Verify the response
      fetchGuests(); // Refresh the guest list after adding
      closeModal();
    } catch (error) {
      console.error("Error adding guest:", error);
      alert("Failed to add guest. Please try again.");
    }
  };


  // Update existing guest function
  const updateGuest = async () => {
    try {
      await axios.put(`http://localhost:5000/api/guests/${currentGuest.guest_id}`, currentGuest);
      fetchGuests(); // Refresh the guest list after updating
      closeModal();
    } catch (error) {
      console.error("Error updating guest:", error);
    }
  }


  const handleSaveGuest = () => {
    console.log("Saving guest:", currentGuest);  // Debugging step
    if (currentGuest.guest_id) {
      updateGuest();  // If guest already has a guest_id, update
    } else {
      addGuest();  // If no guest_id, add as a new guest
    }
  };



  const handleDeleteGuest = async (guest_id) => {
    try {
      await axios.delete(`http://localhost:5000/api/guests/${guest_id}`);
      fetchGuests(); // Refresh the guest list after deleting
    } catch (error) {
      console.error("Error deleting guest:", error);
    }
  }


  const filteredGuests = guests.filter(
    (guest) =>
      guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.status.toLowerCase().includes(searchTerm.toLowerCase())
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tier
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
                <tr key={guest.id || guest.email}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
  
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-700">{guest.guest_id}{guest.name.charAt(0)}</span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{guest.name}</div>
                        <div className="text-sm text-gray-500">{guest.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{guest.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{guest.tier}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>Diet: {guest.dietaryrestrictions || "Not Provided"}</div>
                    <div>Temp: {guest.preferredroomtemperature || "Not Provided"}</div>
                    <div>Special: {guest.specialrequest || "Not Provided"}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      className="text-blue-600 hover:text-blue-900 mr-3"
                      onClick={() => openModal(guest)}
                    >
                      <EditIcon className="h-4 w-4" />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-900"
                      onClick={() => handleDeleteGuest(guest.guest_id)}
                    >
                      <TrashIcon className="h-4 w-4" />
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
            <label className="block text-sm font-medium text-gray-700">Tier</label>
            <select
              value={currentGuest?.tier || "Bronze"}
              onChange={(e) => setCurrentGuest({ ...currentGuest, tier: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Bronze">Bronze</option>
              <option value="Silver">Silver</option>
              <option value="Gold">Gold</option>
            </select>

          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Dietary Restrictions</label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={currentGuest?.dietaryrestrictions || ""}
              onChange={(e) => setCurrentGuest({ ...currentGuest, dietaryrestrictions: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Preferred Room Temperature (°C)</label>
            <input
              type="range"
              min="15"
              max="30"
              step="1"
              value={currentGuest?.preferredroomtemperature || 22}
              onChange={(e) => setCurrentGuest({ ...currentGuest, preferredroomtemperature: e.target.value })}
              className="mt-1 block w-full"
            />
            <div className="mt-1 text-sm text-gray-500">
              {currentGuest?.preferredroomtemperature || 22}°C
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Special Request</label>
            <textarea
              rows="4"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={currentGuest?.specialrequest || ""}
              onChange={(e) => setCurrentGuest({ ...currentGuest, specialrequest: e.target.value })}
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

