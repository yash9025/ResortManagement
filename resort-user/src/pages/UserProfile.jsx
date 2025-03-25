"use client"

import { useState } from "react"

const UserProfile = () => {
  const [user, setUser] = useState({
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, Anytown, USA",
    memberSince: "2022-03-15",
    tier: "Gold",
    preferences: {
      roomTemperature: "Cool",
      dietaryRestrictions: "None",
      specialRequests: "Extra pillows",
      communicationPreferences: ["Email", "SMS"],
    },
  })

  const [isEditing, setIsEditing] = useState(false)
  const [editedUser, setEditedUser] = useState({ ...user })

  const handleSaveProfile = () => {
    setUser(editedUser)
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    setEditedUser({ ...user })
    setIsEditing(false)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEditedUser({ ...editedUser, [name]: value })
  }

  const handlePreferenceChange = (e) => {
    const { name, value } = e.target
    setEditedUser({
      ...editedUser,
      preferences: {
        ...editedUser.preferences,
        [name]: value,
      },
    })
  }

  const handleCommunicationPreferenceChange = (preference) => {
    const currentPreferences = [...editedUser.preferences.communicationPreferences]

    if (currentPreferences.includes(preference)) {
      // Remove preference
      const updatedPreferences = currentPreferences.filter((p) => p !== preference)
      setEditedUser({
        ...editedUser,
        preferences: {
          ...editedUser.preferences,
          communicationPreferences: updatedPreferences,
        },
      })
    } else {
      // Add preference
      setEditedUser({
        ...editedUser,
        preferences: {
          ...editedUser.preferences,
          communicationPreferences: [...currentPreferences, preference],
        },
      })
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">My Profile</h1>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl font-bold">
                {user.name.charAt(0)}
              </div>
              <div className="ml-4">
                <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>
            {!isEditing ? (
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
            ) : (
              <div className="flex space-x-2">
                <button
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={handleSaveProfile}
                >
                  Save
                </button>
              </div>
            )}
          </div>

          <div className="border-t border-gray-200 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>

                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Name</label>
                      <input
                        type="text"
                        name="name"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        value={editedUser.name}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <input
                        type="email"
                        name="email"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        value={editedUser.email}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Phone</label>
                      <input
                        type="text"
                        name="phone"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        value={editedUser.phone}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Address</label>
                      <input
                        type="text"
                        name="address"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        value={editedUser.address}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-500">Name:</span>
                      <span className="text-sm text-gray-900">{user.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-500">Email:</span>
                      <span className="text-sm text-gray-900">{user.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-500">Phone:</span>
                      <span className="text-sm text-gray-900">{user.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-500">Address:</span>
                      <span className="text-sm text-gray-900">{user.address}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-500">Member Since:</span>
                      <span className="text-sm text-gray-900">{user.memberSince}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-500">Membership Tier:</span>
                      <span className="text-sm px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800 font-medium">
                        {user.tier}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Preferences</h3>

                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Room Temperature</label>
                      <select
                        name="roomTemperature"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        value={editedUser.preferences.roomTemperature}
                        onChange={handlePreferenceChange}
                      >
                        <option value="Cool">Cool</option>
                        <option value="Normal">Normal</option>
                        <option value="Warm">Warm</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Dietary Restrictions</label>
                      <input
                        type="text"
                        name="dietaryRestrictions"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        value={editedUser.preferences.dietaryRestrictions}
                        onChange={handlePreferenceChange}
                        placeholder="None"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Special Requests</label>
                      <textarea
                        name="specialRequests"
                        rows="3"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        value={editedUser.preferences.specialRequests}
                        onChange={handlePreferenceChange}
                      ></textarea>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Communication Preferences</label>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="email-pref"
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            checked={editedUser.preferences.communicationPreferences.includes("Email")}
                            onChange={() => handleCommunicationPreferenceChange("Email")}
                          />
                          <label htmlFor="email-pref" className="ml-2 block text-sm text-gray-900">
                            Email
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="sms-pref"
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            checked={editedUser.preferences.communicationPreferences.includes("SMS")}
                            onChange={() => handleCommunicationPreferenceChange("SMS")}
                          />
                          <label htmlFor="sms-pref" className="ml-2 block text-sm text-gray-900">
                            SMS
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="phone-pref"
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            checked={editedUser.preferences.communicationPreferences.includes("Phone")}
                            onChange={() => handleCommunicationPreferenceChange("Phone")}
                          />
                          <label htmlFor="phone-pref" className="ml-2 block text-sm text-gray-900">
                            Phone
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-500">Room Temperature:</span>
                      <span className="text-sm text-gray-900">{user.preferences.roomTemperature}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-500">Dietary Restrictions:</span>
                      <span className="text-sm text-gray-900">{user.preferences.dietaryRestrictions}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Special Requests:</span>
                      <p className="text-sm text-gray-900 mt-1">{user.preferences.specialRequests}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Communication Preferences:</span>
                      <div className="flex flex-wrap mt-1">
                        {user.preferences.communicationPreferences.map((pref) => (
                          <span key={pref} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2 mb-2">
                            {pref}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-6 pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Security</h3>

            <div className="space-y-4">
              <button className="text-blue-600 hover:text-blue-800 font-medium">Change Password</button>
              <button className="text-blue-600 hover:text-blue-800 font-medium">
                Enable Two-Factor Authentication
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile

