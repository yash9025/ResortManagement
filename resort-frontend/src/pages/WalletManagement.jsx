import { useState, useEffect } from "react"
import axios from "axios"
import { PlusIcon, SearchIcon, EditIcon, TrashIcon } from "../components/Icons"
import Modal from "../components/Modal"
import Toggle from "../components/Toggle"

const WalletManagement = () => {
  const [offers, setOffers] = useState([])
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false)
  const [currentOffer, setCurrentOffer] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")

  // Fetch offers on component mount
  useEffect(() => {
    fetchOffers()
  }, [])

  const fetchOffers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/wallet/offers")
      setOffers(response.data)
    } catch (error) {
      console.error("Error fetching offers:", error)
    }
  }

  const openOfferModal = (offer = null) => {
    setCurrentOffer(
      offer || {
        name: "",
        description: "",
        discount: 0,
        type: "Percentage",
        is_active: false,
        min_spend: 0,
        max_discount: null,
        applicable_rooms: "",
      }
    )
    setIsOfferModalOpen(true)
  }

  const closeOfferModal = () => {
    setIsOfferModalOpen(false)
    setCurrentOffer(null)
  }

  // Function to handle saving a new offer or updating an existing offer
  const handleSaveOffer = async () => {
    if (currentOffer.offer_id) {
      updateOffer(currentOffer.offer_id, currentOffer) // Update existing offer
    } else {
      addOffer(currentOffer) // Add new offer
    }
    closeOfferModal()
  }

  // Function to add a new offer
  const addOffer = async (offer) => {
    try {
      console.log("Adding offer:", offer); // Log the offer data
      await axios.post("http://localhost:5000/api/wallet/offers", offer)
      fetchOffers() // Re-fetch offers after adding
    } catch (error) {
      console.error("Error adding offer:", error.response || error); // Log more detailed error
    }
  }


  // Function to update an existing offer
  const updateOffer = async (offer_id, offer) => {
    try {
      await axios.put(`http://localhost:5000/api/wallet/offers/${offer_id}`, offer)
      fetchOffers() // Re-fetch offers after update
    } catch (error) {
      console.error("Error updating offer:", error)
    }
  }

  // Function to toggle the status of an offer
  const toggleOfferStatus = async (offer_id) => {
    const updatedOffer = offers.find((offer) => offer.offer_id === offer_id)
    const updatedStatus = !updatedOffer.is_active

    try {
      await axios.put(`http://localhost:5000/api/wallet/offers/${offer_id}`, { ...updatedOffer, is_active: updatedStatus })
      fetchOffers() // Re-fetch offers after status update
    } catch (error) {
      console.error("Error updating offer status:", error)
    }
  }

  // Function to delete an offer
  const deleteOffer = async (offer_id) => {
    if (window.confirm("Are you sure you want to delete this offer?")) {
      try {
        await axios.delete(`http://localhost:5000/api/wallet/offers/${offer_id}`)
        fetchOffers() // Re-fetch offers after delete
      } catch (error) {
        console.error("Error deleting offer:", error)
      }
    }
  }

  const filteredOffers = offers.filter(
    (offer) =>
      offer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.type.toLowerCase().includes(searchTerm.toLowerCase())
  )



  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Wallet & Offers Management</h1>

        <button
          onClick={() => openOfferModal()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Offer
        </button>
      </div>


      <div className="mb-6">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search offers..."
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
                  Offer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Minimum Spend
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Maximum Discount(Upto)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applicable Rooms
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Users
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOffers.map((offer) => (
                <tr key={offer.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{offer.name}</div>
                    <div className="text-sm text-gray-500">{offer.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{offer.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {offer.type === "Percentage" && `${offer.discount}%`}
                    {offer.type === "Fixed" && `$${offer.discount}`}
                    {offer.type === "Cashback" && `${offer.discount}% cashback`}
                    {offer.type === "Freebie" && "Free item"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {offer.min_spend}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {offer.max_discount || "No Limit"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {offer.applicable_rooms || "No Room"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Toggle enabled={offer.is_active} onChange={() => toggleOfferStatus(offer.offer_id)} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{offer.usageCount || 0}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3" onClick={() => openOfferModal(offer)}>
                      <EditIcon className="h-5 w-5" />
                    </button>
                    <button className="text-red-600 hover:text-red-900" onClick={() => deleteOffer(offer.offer_id)}>
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Offer Modal */}
      <Modal
        isOpen={isOfferModalOpen}
        onClose={closeOfferModal}
        title={currentOffer?.id ? "Edit Offer" : "Add New Offer"}
      >
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Offer Name</label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={currentOffer?.name || ""}
              onChange={(e) => setCurrentOffer({ ...currentOffer, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              rows="3"
              value={currentOffer?.description || ""}
              onChange={(e) => setCurrentOffer({ ...currentOffer, description: e.target.value })}
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Offer Type</label>
            <select
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={currentOffer?.type || ""}
              onChange={(e) => setCurrentOffer({ ...currentOffer, type: e.target.value })}
            >
              <option value="Percentage">Percentage Discount</option>
              <option value="Fixed">Fixed Amount</option>
              <option value="Cashback">Cashback</option>
              <option value="Freebie">Free Item/Service</option>
            </select>
          </div>

          {currentOffer?.type !== "Freebie" && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {currentOffer?.type === "Percentage" || currentOffer?.type === "Cashback"
                  ? "Discount Percentage (%)"
                  : "Discount Amount ($)"}
              </label>
              <input
                type="number"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={currentOffer?.discount || ""}
                onChange={(e) => setCurrentOffer({ ...currentOffer, discount: Number(e.target.value) })}
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">Minimum Spend ($)</label>
            <input
              type="number"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={currentOffer?.min_spend || ""}
              onChange={(e) => setCurrentOffer({ ...currentOffer, min_spend: Number(e.target.value) })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Maximum Discount(Upto) ($)</label>
            <input
              type="number"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={currentOffer?.max_discount || ""}
              onChange={(e) => setCurrentOffer({ ...currentOffer, max_discount: Number(e.target.value) })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Applicable Rooms</label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={currentOffer?.applicable_rooms || ""}  // Treat it as a string
              onChange={(e) => setCurrentOffer({ ...currentOffer, applicable_rooms: e.target.value })}  // Directly update applicable_rooms as string
            />
          </div>

          <div className="flex items-center mt-4">
            <Toggle
              enabled={currentOffer?.is_active || false}
              onChange={(value) => setCurrentOffer({ ...currentOffer, is_active: value })}
              label="Active"
            />
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="button"
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-3"
              onClick={closeOfferModal}
            >
              Cancel
            </button>
            <button
              type="button"
              className="bg-blue-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={handleSaveOffer}
            >
              Save
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default WalletManagement

