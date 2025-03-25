"use client"

import { useState } from "react"

const UserWallet = () => {
  const [walletBalance, setWalletBalance] = useState(250.75)
  const [activeTab, setActiveTab] = useState("overview")

  const transactions = [
    {
      id: 1,
      date: "2023-06-10",
      description: "Room Booking - Ocean View Suite",
      amount: -450.0,
      type: "debit",
    },
    {
      id: 2,
      date: "2023-06-10",
      description: "Cashback Reward",
      amount: 22.5,
      type: "credit",
    },
    {
      id: 3,
      date: "2023-05-28",
      description: "Spa Service",
      amount: -120.0,
      type: "debit",
    },
    {
      id: 4,
      date: "2023-05-15",
      description: "Wallet Top-up",
      amount: 500.0,
      type: "credit",
    },
    {
      id: 5,
      date: "2023-05-12",
      description: "Restaurant Charge - Seafood Grill",
      amount: -85.25,
      type: "debit",
    },
  ]

  const offers = [
    {
      id: 1,
      name: "Summer Special",
      description: "Get 20% off on all room bookings for summer season",
      validUntil: "2023-08-31",
      type: "discount",
      value: "20%",
      status: "active",
    },
    {
      id: 2,
      name: "Loyalty Reward",
      description: "Earn 5% cashback in your wallet for every booking",
      validUntil: "2023-12-31",
      type: "cashback",
      value: "5%",
      status: "active",
    },
    {
      id: 3,
      name: "Weekend Getaway",
      description: "Book 2 nights over the weekend and get $100 off",
      validUntil: "2023-12-31",
      type: "fixed",
      value: "$100",
      status: "active",
    },
    {
      id: 4,
      name: "Spa Package",
      description: "Book any spa service and get a free 30-minute massage",
      validUntil: "2023-07-15",
      type: "freebie",
      value: "Free massage",
      status: "active",
    },
  ]

  const handleAddFunds = () => {
    const amount = prompt("Enter amount to add to wallet:")
    if (amount && !isNaN(amount) && Number(amount) > 0) {
      setWalletBalance(walletBalance + Number(amount))
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">My Wallet</h1>

      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Wallet Balance</h2>
              <p className="text-3xl font-bold text-blue-600 mt-2">${walletBalance.toFixed(2)}</p>
            </div>
            <div className="mt-4 md:mt-0">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={handleAddFunds}
              >
                Add Funds
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex">
            <button
              onClick={() => setActiveTab("overview")}
              className={`${
                activeTab === "overview"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("transactions")}
              className={`${
                activeTab === "transactions"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
            >
              Transactions
            </button>
            <button
              onClick={() => setActiveTab("offers")}
              className={`${
                activeTab === "offers"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
            >
              Offers
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === "overview" && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Wallet Overview</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Recent Activity</h4>
                  <div className="space-y-3">
                    {transactions.slice(0, 3).map((transaction) => (
                      <div key={transaction.id} className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{transaction.description}</p>
                          <p className="text-xs text-gray-500">{transaction.date}</p>
                        </div>
                        <span
                          className={`font-medium ${transaction.type === "credit" ? "text-green-600" : "text-red-600"}`}
                        >
                          {transaction.type === "credit" ? "+" : "-"}${Math.abs(transaction.amount).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Available Offers</h4>
                  <div className="space-y-3">
                    {offers.slice(0, 3).map((offer) => (
                      <div key={offer.id} className="border border-gray-200 rounded-md p-3">
                        <p className="text-sm font-medium text-gray-900">{offer.name}</p>
                        <p className="text-xs text-gray-500">{offer.description}</p>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-xs text-blue-600">Valid until {offer.validUntil}</span>
                          <span className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                            {offer.value}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Wallet Benefits</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                  <li>Earn cashback on all resort bookings and purchases</li>
                  <li>Access exclusive offers and discounts</li>
                  <li>Convenient payment method throughout the resort</li>
                  <li>Easy tracking of all your expenses</li>
                  <li>Secure and contactless payments</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === "transactions" && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Transaction History</h3>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {transactions.map((transaction) => (
                      <tr key={transaction.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.description}</td>
                        <td
                          className={`px-6 py-4 whitespace-nowrap text-sm font-medium text-right ${
                            transaction.type === "credit" ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {transaction.type === "credit" ? "+" : "-"}${Math.abs(transaction.amount).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "offers" && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Offers</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {offers.map((offer) => (
                  <div key={offer.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-md font-semibold text-gray-900">{offer.name}</h4>
                        <p className="text-sm text-gray-600 mt-1">{offer.description}</p>
                      </div>
                      <span className="text-sm font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        {offer.value}
                      </span>
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-xs text-gray-500">Valid until {offer.validUntil}</span>
                      <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">Use Offer</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserWallet

