"use client"

import { useState } from "react"
import { SearchIcon } from "../components/Icons"

const FoodOrderManagement = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      room: "101",
      guest: "John Smith",
      items: [
        { name: "Grilled Salmon", quantity: 1, price: 28 },
        { name: "Caesar Salad", quantity: 1, price: 12 },
      ],
      total: 44,
      status: "pending",
      time: "2023-06-16 19:45",
      notes: "No spicy sauce please",
    },
    {
      id: 2,
      room: "205",
      guest: "Sarah Johnson",
      items: [
        { name: "Seafood Pasta", quantity: 1, price: 24 },
        { name: "Bruschetta", quantity: 1, price: 9 },
        { name: "Tropical Fruit Smoothie", quantity: 2, price: 16 },
      ],
      total: 49,
      status: "preparing",
      time: "2023-06-16 19:30",
      notes: "",
    },
    {
      id: 3,
      room: "302",
      guest: "Michael Brown",
      items: [
        { name: "Ribeye Steak", quantity: 1, price: 34 },
        { name: "Chocolate Lava Cake", quantity: 1, price: 10 },
      ],
      total: 44,
      status: "delivered",
      time: "2023-06-16 18:15",
      notes: "Medium rare steak",
    },
    {
      id: 4,
      room: "118",
      guest: "Emily Davis",
      items: [
        { name: "Caesar Salad", quantity: 1, price: 12 },
        { name: "Tiramisu", quantity: 1, price: 11 },
      ],
      total: 23,
      status: "pending",
      time: "2023-06-16 19:50",
      notes: "Dressing on the side",
    },
  ])

  const [filterStatus, setFilterStatus] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedOrder, setSelectedOrder] = useState(null)

  const filteredOrders = orders
    .filter((order) => filterStatus === "all" || order.status === filterStatus)
    .filter(
      (order) =>
        order.room.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.guest.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      // Sort by time (most recent first) and pending orders first
      if (a.status === "pending" && b.status !== "pending") return -1
      if (a.status !== "pending" && b.status === "pending") return 1
      return new Date(b.time) - new Date(a.time)
    })

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))

    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus })
    }
  }

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "preparing":
        return "bg-blue-100 text-blue-800"
      case "ready":
        return "bg-green-100 text-green-800"
      case "delivered":
        return "bg-gray-100 text-gray-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Food Order Management</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative w-full md:w-64">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search by room or guest..."
              className="pl-10 pr-4 py-2 border rounded-md w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex space-x-2">
            <button
              className={`px-3 py-1 rounded-md text-sm font-medium ${
                filterStatus === "all" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setFilterStatus("all")}
            >
              All
            </button>
            <button
              className={`px-3 py-1 rounded-md text-sm font-medium ${
                filterStatus === "pending" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setFilterStatus("pending")}
            >
              Pending
            </button>
            <button
              className={`px-3 py-1 rounded-md text-sm font-medium ${
                filterStatus === "preparing" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setFilterStatus("preparing")}
            >
              Preparing
            </button>
            <button
              className={`px-3 py-1 rounded-md text-sm font-medium ${
                filterStatus === "delivered" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setFilterStatus("delivered")}
            >
              Delivered
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order Info
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Items
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                        No orders found
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((order) => (
                      <tr
                        key={order.id}
                        className={`hover:bg-gray-50 cursor-pointer ${selectedOrder?.id === order.id ? "bg-blue-50" : ""}`}
                        onClick={() => setSelectedOrder(order)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">Room {order.room}</div>
                          <div className="text-sm text-gray-500">{order.guest}</div>
                          <div className="text-xs text-gray-500">{order.time}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            {order.items.slice(0, 2).map((item, index) => (
                              <div key={index}>
                                {item.quantity}x {item.name}
                              </div>
                            ))}
                            {order.items.length > 2 && (
                              <div className="text-xs text-gray-500">+{order.items.length - 2} more items</div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(order.status)}`}
                          >
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {order.status === "pending" && (
                            <button
                              className="text-blue-600 hover:text-blue-900 mr-2"
                              onClick={(e) => {
                                e.stopPropagation()
                                updateOrderStatus(order.id, "preparing")
                              }}
                            >
                              Accept
                            </button>
                          )}
                          {order.status === "preparing" && (
                            <button
                              className="text-green-600 hover:text-green-900 mr-2"
                              onClick={(e) => {
                                e.stopPropagation()
                                updateOrderStatus(order.id, "ready")
                              }}
                            >
                              Mark Ready
                            </button>
                          )}
                          {order.status === "ready" && (
                            <button
                              className="text-green-600 hover:text-green-900 mr-2"
                              onClick={(e) => {
                                e.stopPropagation()
                                updateOrderStatus(order.id, "delivered")
                              }}
                            >
                              Deliver
                            </button>
                          )}
                          {(order.status === "pending" || order.status === "preparing") && (
                            <button
                              className="text-red-600 hover:text-red-900"
                              onClick={(e) => {
                                e.stopPropagation()
                                updateOrderStatus(order.id, "cancelled")
                              }}
                            >
                              Cancel
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          {selectedOrder ? (
            <div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Order #{selectedOrder.id}</h2>
                  <p className="text-sm text-gray-600">
                    Room {selectedOrder.room} - {selectedOrder.guest}
                  </p>
                  <p className="text-xs text-gray-500">{selectedOrder.time}</p>
                </div>
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeClass(selectedOrder.status)}`}
                >
                  {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                </span>
              </div>

              <div className="border-t border-gray-200 pt-4 mb-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Order Items:</h3>
                <div className="space-y-2">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>
                        {item.quantity}x {item.name}
                      </span>
                      <span>${item.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-2 border-t border-gray-100">
                  <div className="flex justify-between font-medium">
                    <span>Total:</span>
                    <span>${selectedOrder.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {selectedOrder.notes && (
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-1">Special Instructions:</h3>
                  <p className="text-sm bg-gray-50 p-2 rounded">{selectedOrder.notes}</p>
                </div>
              )}

              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Update Status:</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedOrder.status !== "pending" && (
                    <button
                      className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-md text-sm font-medium"
                      onClick={() => updateOrderStatus(selectedOrder.id, "pending")}
                    >
                      Pending
                    </button>
                  )}
                  {selectedOrder.status !== "preparing" && (
                    <button
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-md text-sm font-medium"
                      onClick={() => updateOrderStatus(selectedOrder.id, "preparing")}
                    >
                      Preparing
                    </button>
                  )}
                  {selectedOrder.status !== "ready" && (
                    <button
                      className="px-3 py-1 bg-green-100 text-green-800 rounded-md text-sm font-medium"
                      onClick={() => updateOrderStatus(selectedOrder.id, "ready")}
                    >
                      Ready
                    </button>
                  )}
                  {selectedOrder.status !== "delivered" && (
                    <button
                      className="px-3 py-1 bg-gray-100 text-gray-800 rounded-md text-sm font-medium"
                      onClick={() => updateOrderStatus(selectedOrder.id, "delivered")}
                    >
                      Delivered
                    </button>
                  )}
                  {selectedOrder.status !== "cancelled" && (
                    <button
                      className="px-3 py-1 bg-red-100 text-red-800 rounded-md text-sm font-medium"
                      onClick={() => updateOrderStatus(selectedOrder.id, "cancelled")}
                    >
                      Cancelled
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">Select an order to view details</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default FoodOrderManagement

