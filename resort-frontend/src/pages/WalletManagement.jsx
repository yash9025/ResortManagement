"use client"

import { useState } from "react"
import { PlusIcon, SearchIcon, EditIcon, TrashIcon } from "../components/Icons"
import Modal from "../components/Modal"
import Toggle from "../components/Toggle"

const WalletManagement = () => {
  const [offers, setOffers] = useState([
    {
      id: 1,
      name: "Summer Special",
      description: "Get 20% off on all room bookings for summer season",
      discount: 20,
      type: "Percentage",
      validFrom: "2023-06-01",
      validTo: "2023-08-31",
      isActive: true,
      minSpend: 500,
      maxDiscount: 1000,
      applicableRooms: ["All"],
      usageCount: 45,
    },
    {
      id: 2,
      name: "Spa Package",
      description: "Book any spa service and get a free 30-minute massage",
      discount: 0,
      type: "Freebie",
      validFrom: "2023-06-15",
      validTo: "2023-07-15",
      isActive: true,
      minSpend: 200,
      maxDiscount: null,
      applicableRooms: [],
      usageCount: 12,
    },
    {
      id: 3,
      name: "Weekend Getaway",
      description: "Book 2 nights over the weekend and get $100 off",
      discount: 100,
      type: "Fixed",
      validFrom: "2023-06-01",
      validTo: "2023-12-31",
      isActive: false,
      minSpend: 0,
      maxDiscount: null,
      applicableRooms: ["Deluxe Room", "Ocean View Suite"],
      usageCount: 28,
    },
    {
      id: 4,
      name: "Loyalty Reward",
      description: "Earn 5% cashback in your wallet for every booking",
      discount: 5,
      type: "Cashback",
      validFrom: "2023-01-01",
      validTo: "2023-12-31",
      isActive: true,
      minSpend: 0,
      maxDiscount: null,
      applicableRooms: ["All"],
      usageCount: 156,
    },
  ])

  const [walletUsers, setWalletUsers] = useState([
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@example.com",
      walletBalance: 250.75,
      totalSpent: 1250.5,
      lastTransaction: "2023-06-10",
      memberSince: "2022-03-15",
      tier: "Gold",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      walletBalance: 120.0,
      totalSpent: 780.25,
      lastTransaction: "2023-06-05",
      memberSince: "2022-05-20",
      tier: "Silver",
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael.b@example.com",
      walletBalance: 500.5,
      totalSpent: 3200.75,
      lastTransaction: "2023-06-12",
      memberSince: "2021-11-08",
      tier: "Platinum",
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.d@example.com",
      walletBalance: 75.25,
      totalSpent: 450.0,
      lastTransaction: "2023-05-28",
      memberSince: "2023-01-15",
      tier: "Bronze",
    },
  ])

  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false)
  const [currentOffer, setCurrentOffer] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("offers")
  const [isUserModalOpen, setIsUserModalOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)

  const openOfferModal = (offer = null) => {
    setCurrentOffer(
      offer || {
        name: "",
        description: "",
        discount: 0,
        type: "Percentage",
        validFrom: "",
        validTo: "",
        isActive: false,
        minSpend: 0,
        maxDiscount: null,
        applicableRooms: [],
        usageCount: 0,
      },
    )
    setIsOfferModalOpen(true)
  }

  const closeOfferModal = () => {
    setIsOfferModalOpen(false)
    setCurrentOffer(null)
  }

  const handleSaveOffer = () => {
    if (currentOffer.id) {
      // Update existing offer
      setOffers(offers.map((offer) => (offer.id === currentOffer.id ? currentOffer : offer)))
    } else {
      // Add new offer
      setOffers([...offers, { ...currentOffer, id: Date.now() }])
    }
    closeOfferModal()
  }

  const toggleOfferStatus = (id) => {
    setOffers(
      offers.map((offer) => {
        if (offer.id === id) {
          return { ...offer, isActive: !offer.isActive }
        }
        return offer
      }),
    )
  }

  const deleteOffer = (id) => {
    if (window.confirm("Are you sure you want to delete this offer?")) {
      setOffers(offers.filter((offer) => offer.id !== id))
    }
  }

  const openUserModal = (user = null) => {
    setCurrentUser(user)
    setIsUserModalOpen(true)
  }

  const closeUserModal = () => {
    setIsUserModalOpen(false)
    setCurrentUser(null)
  }

  const handleAddFunds = () => {
    if (!currentUser) return

    const amount = prompt("Enter amount to add to wallet:")
    if (amount && !isNaN(amount) && Number(amount) > 0) {
      setWalletUsers(
        walletUsers.map((user) => {
          if (user.id === currentUser.id) {
            return {
              ...user,
              walletBalance: user.walletBalance + Number(amount),
              lastTransaction: new Date().toISOString().split("T")[0],
            }
          }
          return user
        }),
      )
      closeUserModal()
    }
  }

  const filteredOffers = offers.filter(
    (offer) =>
      offer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.type.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredUsers = walletUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.tier.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Wallet & Offers Management</h1>
        {activeTab === "offers" && (
          <button
            onClick={() => openOfferModal()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Add Offer
          </button>
        )}
      </div>

      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("offers")}
              className={`${
                activeTab === "offers"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Offers
            </button>
            <button
              onClick={() => setActiveTab("users")}
              className={`${
                activeTab === "users"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Wallet Users
            </button>
          </nav>
        </div>
      </div>

      <div className="mb-6">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder={activeTab === "offers" ? "Search offers..." : "Search wallet users..."}
            className="pl-10 pr-4 py-2 border rounded-md w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {activeTab === "offers" ? (
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
                    Validity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Usage
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
                      {offer.validFrom} to {offer.validTo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Toggle enabled={offer.isActive} onChange={() => toggleOfferStatus(offer.id)} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{offer.usageCount} uses</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3" onClick={() => openOfferModal(offer)}>
                        <EditIcon className="h-5 w-5" />
                      </button>
                      <button className="text-red-600 hover:text-red-900" onClick={() => deleteOffer(offer.id)}>
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Wallet Balance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Spent
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Transaction
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Member Since
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tier
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-700">{user.name.charAt(0)}</span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                      ${user.walletBalance.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${user.totalSpent.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.lastTransaction}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.memberSince}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.tier === "Platinum"
                            ? "bg-purple-100 text-purple-800"
                            : user.tier === "Gold"
                              ? "bg-yellow-100 text-yellow-800"
                              : user.tier === "Silver"
                                ? "bg-gray-100 text-gray-800"
                                : "bg-orange-100 text-orange-800"
                        }`}
                      >
                        {user.tier}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900" onClick={() => openUserModal(user)}>
                        Manage Wallet
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

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

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Valid From</label>
              <input
                type="date"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={currentOffer?.validFrom || ""}
                onChange={(e) => setCurrentOffer({ ...currentOffer, validFrom: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Valid To</label>
              <input
                type="date"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={currentOffer?.validTo || ""}
                onChange={(e) => setCurrentOffer({ ...currentOffer, validTo: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Minimum Spend ($)</label>
            <input
              type="number"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={currentOffer?.minSpend || ""}
              onChange={(e) => setCurrentOffer({ ...currentOffer, minSpend: Number(e.target.value) })}
            />
          </div>

          {(currentOffer?.type === "Percentage" || currentOffer?.type === "Cashback") && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Maximum Discount ($)</label>
              <input
                type="number"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={currentOffer?.maxDiscount || ""}
                onChange={(e) =>
                  setCurrentOffer({
                    ...currentOffer,
                    maxDiscount: e.target.value ? Number(e.target.value) : null,
                  })
                }
                placeholder="Leave empty for no maximum"
              />
            </div>
          )}

          <div className="flex items-center mt-4">
            <Toggle
              enabled={currentOffer?.isActive || false}
              onChange={(value) => setCurrentOffer({ ...currentOffer, isActive: value })}
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

      {/* User Wallet Modal */}
      <Modal isOpen={isUserModalOpen} onClose={closeUserModal} title="Manage User Wallet">
        {currentUser && (
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-700 text-lg">{currentUser.name.charAt(0)}</span>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">{currentUser.name}</h3>
                <p className="text-sm text-gray-500">{currentUser.email}</p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-500">Current Balance:</span>
                <span className="text-lg font-semibold text-green-600">${currentUser.walletBalance.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm font-medium text-gray-500">Membership Tier:</span>
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    currentUser.tier === "Platinum"
                      ? "bg-purple-100 text-purple-800"
                      : currentUser.tier === "Gold"
                        ? "bg-yellow-100 text-yellow-800"
                        : currentUser.tier === "Silver"
                          ? "bg-gray-100 text-gray-800"
                          : "bg-orange-100 text-orange-800"
                  }`}
                >
                  {currentUser.tier}
                </span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm font-medium text-gray-500">Total Spent:</span>
                <span className="text-sm text-gray-700">${currentUser.totalSpent.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm font-medium text-gray-500">Last Transaction:</span>
                <span className="text-sm text-gray-700">{currentUser.lastTransaction}</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm font-medium text-gray-500">Member Since:</span>
                <span className="text-sm text-gray-700">{currentUser.memberSince}</span>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-700">Transaction History</h4>
              <div className="border rounded-md divide-y">
                <div className="p-3 flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium">Room Booking - Ocean View Suite</p>
                    <p className="text-xs text-gray-500">2023-06-10</p>
                  </div>
                  <span className="text-sm text-red-600">-$450.00</span>
                </div>
                <div className="p-3 flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium">Cashback Reward</p>
                    <p className="text-xs text-gray-500">2023-06-10</p>
                  </div>
                  <span className="text-sm text-green-600">+$22.50</span>
                </div>
                <div className="p-3 flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium">Spa Service</p>
                    <p className="text-xs text-gray-500">2023-05-28</p>
                  </div>
                  <span className="text-sm text-red-600">-$120.00</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={closeUserModal}
              >
                Close
              </button>
              <button
                type="button"
                className="bg-green-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                onClick={handleAddFunds}
              >
                Add Funds
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default WalletManagement

