"use client"

import { useState } from "react"

const FoodAndServices = () => {
  const [activeTab, setActiveTab] = useState("food")
  const [cart, setCart] = useState([])
  const [orderHistory, setOrderHistory] = useState([
    {
      id: 1,
      type: "food",
      items: [
        { name: "Grilled Salmon", quantity: 1, price: 28 },
        { name: "Caesar Salad", quantity: 1, price: 12 },
      ],
      total: 40,
      status: "delivered",
      room: "101",
      date: "2023-06-15 19:30",
      notes: "No spicy sauce please",
    },
    {
      id: 2,
      type: "service",
      service: "Room Cleaning",
      status: "completed",
      room: "101",
      date: "2023-06-14 10:00",
      notes: "Please clean after 10 AM",
    },
  ])

  const [foodCategory, setFoodCategory] = useState("all")
  const [serviceType, setServiceType] = useState("")
  const [serviceNotes, setServiceNotes] = useState("")
  const [orderNotes, setOrderNotes] = useState("")

  const foodMenu = [
    {
      id: 1,
      name: "Grilled Salmon",
      description: "Fresh salmon fillet grilled to perfection with herbs and lemon",
      price: 28,
      category: "main",
      image: "/placeholder.svg?height=200&width=300&text=Grilled+Salmon",
    },
    {
      id: 2,
      name: "Caesar Salad",
      description: "Crisp romaine lettuce with Caesar dressing, croutons, and parmesan",
      price: 12,
      category: "starter",
      image: "/placeholder.svg?height=200&width=300&text=Caesar+Salad",
    },
    {
      id: 3,
      name: "Chocolate Lava Cake",
      description: "Warm chocolate cake with a molten chocolate center",
      price: 10,
      category: "dessert",
      image: "/placeholder.svg?height=200&width=300&text=Chocolate+Lava+Cake",
    },
    {
      id: 4,
      name: "Seafood Pasta",
      description: "Linguine with mixed seafood in a light tomato sauce",
      price: 24,
      category: "main",
      image: "/placeholder.svg?height=200&width=300&text=Seafood+Pasta",
    },
    {
      id: 5,
      name: "Tropical Fruit Smoothie",
      description: "Blend of mango, pineapple, and banana with coconut milk",
      price: 8,
      category: "beverage",
      image: "/placeholder.svg?height=200&width=300&text=Tropical+Smoothie",
    },
    {
      id: 6,
      name: "Bruschetta",
      description: "Toasted bread topped with tomatoes, basil, and olive oil",
      price: 9,
      category: "starter",
      image: "/placeholder.svg?height=200&width=300&text=Bruschetta",
    },
    {
      id: 7,
      name: "Ribeye Steak",
      description: "12oz ribeye steak cooked to your preference with seasonal vegetables",
      price: 34,
      category: "main",
      image: "/placeholder.svg?height=200&width=300&text=Ribeye+Steak",
    },
    {
      id: 8,
      name: "Tiramisu",
      description: "Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone",
      price: 11,
      category: "dessert",
      image: "/placeholder.svg?height=200&width=300&text=Tiramisu",
    },
  ]

  const roomServices = [
    {
      id: 1,
      name: "Room Cleaning",
      description: "Standard room cleaning service",
      icon: "🧹",
    },
    {
      id: 2,
      name: "Laundry Service",
      description: "Wash, dry, and fold your clothes",
      icon: "👕",
    },
    {
      id: 3,
      name: "Extra Towels",
      description: "Request additional towels for your room",
      icon: "🧖",
    },
    {
      id: 4,
      name: "Bed Making",
      description: "Fresh sheets and bed making service",
      icon: "🛏️",
    },
    {
      id: 5,
      name: "Technical Support",
      description: "Assistance with TV, Wi-Fi, or other technical issues",
      icon: "🔧",
    },
    {
      id: 6,
      name: "Extra Amenities",
      description: "Request additional toiletries or amenities",
      icon: "🧴",
    },
  ]

  const filteredMenu = foodCategory === "all" ? foodMenu : foodMenu.filter((item) => item.category === foodCategory)

  const addToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id)

    if (existingItem) {
      setCart(
        cart.map((cartItem) => (cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem)),
      )
    } else {
      setCart([...cart, { ...item, quantity: 1 }])
    }
  }

  const removeFromCart = (itemId) => {
    setCart(cart.filter((item) => item.id !== itemId))
  }

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return

    setCart(cart.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item)))
  }

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const placeOrder = () => {
    if (cart.length === 0) {
      alert("Your cart is empty")
      return
    }

    const newOrder = {
      id: orderHistory.length + 1,
      type: "food",
      items: [...cart],
      total: calculateTotal(),
      status: "pending",
      room: "101", // This would come from the user's current room
      date: new Date().toLocaleString(),
      notes: orderNotes,
    }

    setOrderHistory([newOrder, ...orderHistory])
    setCart([])
    setOrderNotes("")
    alert("Your order has been placed!")
  }

  const requestService = () => {
    if (!serviceType) {
      alert("Please select a service")
      return
    }

    const selectedService = roomServices.find((service) => service.id === Number.parseInt(serviceType))

    const newRequest = {
      id: orderHistory.length + 1,
      type: "service",
      service: selectedService.name,
      status: "pending",
      room: "101", // This would come from the user's current room
      date: new Date().toLocaleString(),
      notes: serviceNotes,
    }

    setOrderHistory([newRequest, ...orderHistory])
    setServiceType("")
    setServiceNotes("")
    alert("Your service request has been submitted!")
  }

  return (
    <div className="fade-in">
      <h1 className="section-title gradient-text">Food & Room Services</h1>

      <div className="tabs-fancy mb-6">
        <button
          className={`tab-fancy ${activeTab === "food" ? "bg-white shadow" : ""}`}
          onClick={() => setActiveTab("food")}
          data-active={activeTab === "food"}
        >
          Food & Dining
        </button>
        <button
          className={`tab-fancy ${activeTab === "services" ? "bg-white shadow" : ""}`}
          onClick={() => setActiveTab("services")}
          data-active={activeTab === "services"}
        >
          Room Services
        </button>
        <button
          className={`tab-fancy ${activeTab === "history" ? "bg-white shadow" : ""}`}
          onClick={() => setActiveTab("history")}
          data-active={activeTab === "history"}
        >
          Order History
        </button>
      </div>

      {activeTab === "food" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="glass p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">In-Room Dining Menu</h2>

              <div className="flex flex-wrap gap-2 mb-4">
                <button
                  className={`px-3 py-1 rounded-full text-sm font-medium ${foodCategory === "all" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
                  onClick={() => setFoodCategory("all")}
                >
                  All
                </button>
                <button
                  className={`px-3 py-1 rounded-full text-sm font-medium ${foodCategory === "starter" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
                  onClick={() => setFoodCategory("starter")}
                >
                  Starters
                </button>
                <button
                  className={`px-3 py-1 rounded-full text-sm font-medium ${foodCategory === "main" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
                  onClick={() => setFoodCategory("main")}
                >
                  Main Courses
                </button>
                <button
                  className={`px-3 py-1 rounded-full text-sm font-medium ${foodCategory === "dessert" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
                  onClick={() => setFoodCategory("dessert")}
                >
                  Desserts
                </button>
                <button
                  className={`px-3 py-1 rounded-full text-sm font-medium ${foodCategory === "beverage" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
                  onClick={() => setFoodCategory("beverage")}
                >
                  Beverages
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredMenu.map((item) => (
                  <div key={item.id} className="card card-hover">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-40 object-cover rounded-t-2xl"
                    />
                    <div className="p-4">
                      <div className="flex justify-between">
                        <h3 className="text-lg font-semibold">{item.name}</h3>
                        <span className="font-bold text-blue-600">${item.price}</span>
                      </div>
                      <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                      <button
                        className="mt-3 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
                        onClick={() => addToCart(item)}
                      >
                        Add to Order
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="glass p-6 h-fit sticky top-20">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Order</h2>

            {cart.length === 0 ? (
              <div className="text-center py-8 text-gray-500">Your cart is empty</div>
            ) : (
              <>
                <div className="space-y-4 mb-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between items-center border-b pb-2">
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <div className="flex items-center mt-1">
                          <button
                            className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            -
                          </button>
                          <span className="mx-2">{item.quantity}</span>
                          <button
                            className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                        <button className="text-red-500 text-sm" onClick={() => removeFromCart(item.id)}>
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Special Instructions</label>
                  <textarea
                    className="input-fancy"
                    rows="3"
                    placeholder="Any special requests for your order?"
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                  ></textarea>
                </div>

                <div className="border-t pt-4 mb-4">
                  <div className="flex justify-between font-medium">
                    <span>Subtotal:</span>
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mt-1">
                    <span>Service Charge (10%):</span>
                    <span>${(calculateTotal() * 0.1).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg mt-2">
                    <span>Total:</span>
                    <span>${(calculateTotal() * 1.1).toFixed(2)}</span>
                  </div>
                </div>

                <button className="btn-primary w-full" onClick={placeOrder}>
                  Place Order
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {activeTab === "services" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="glass p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Available Room Services</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {roomServices.map((service) => (
                  <div
                    key={service.id}
                    className={`card card-hover p-4 cursor-pointer ${Number.parseInt(serviceType) === service.id ? "ring-2 ring-blue-500" : ""}`}
                    onClick={() => setServiceType(service.id.toString())}
                  >
                    <div className="flex items-center">
                      <div className="text-3xl mr-3">{service.icon}</div>
                      <div>
                        <h3 className="font-semibold">{service.name}</h3>
                        <p className="text-sm text-gray-600">{service.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="glass p-6 h-fit sticky top-20">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Request Service</h2>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Service</label>
              <select className="select-fancy" value={serviceType} onChange={(e) => setServiceType(e.target.value)}>
                <option value="">Select a service</option>
                {roomServices.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Special Instructions</label>
              <textarea
                className="input-fancy"
                rows="4"
                placeholder="Any specific details for your request?"
                value={serviceNotes}
                onChange={(e) => setServiceNotes(e.target.value)}
              ></textarea>
            </div>

            <button className="btn-primary w-full" onClick={requestService} disabled={!serviceType}>
              Submit Request
            </button>
          </div>
        </div>
      )}

      {activeTab === "history" && (
        <div className="glass p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Order & Request History</h2>

          {orderHistory.length === 0 ? (
            <div className="text-center py-8 text-gray-500">You don't have any orders or requests yet</div>
          ) : (
            <div className="space-y-4">
              {orderHistory.map((order) => (
                <div key={order.id} className="card p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center">
                        <span className="text-lg font-semibold">
                          {order.type === "food" ? "Food Order" : "Service Request"}
                        </span>
                        <span
                          className={`ml-2 badge ${
                            order.status === "pending"
                              ? "badge-warning"
                              : order.status === "delivered" || order.status === "completed"
                                ? "badge-success"
                                : "badge-primary"
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{order.date}</p>
                    </div>
                    {order.type === "food" && <span className="font-bold">${order.total.toFixed(2)}</span>}
                  </div>

                  {order.type === "food" ? (
                    <div className="mt-3">
                      <h4 className="font-medium text-sm text-gray-700">Items:</h4>
                      <ul className="mt-1 space-y-1">
                        {order.items.map((item, index) => (
                          <li key={index} className="text-sm flex justify-between">
                            <span>
                              {item.quantity}x {item.name}
                            </span>
                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <div className="mt-3">
                      <h4 className="font-medium text-sm text-gray-700">Service:</h4>
                      <p className="text-sm">{order.service}</p>
                    </div>
                  )}

                  {order.notes && (
                    <div className="mt-2">
                      <h4 className="font-medium text-sm text-gray-700">Notes:</h4>
                      <p className="text-sm text-gray-600">{order.notes}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default FoodAndServices

