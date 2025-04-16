import { useState, useEffect } from "react";
import { PlusIcon, EditIcon, SearchIcon, TrashIcon } from "../components/Icons";
import Modal from "../components/Modal";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URI;

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentActivity, setCurrentActivity] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Default structure for a new activity
  const defaultActivity = {
    name: "",
    type: "",
    price: 0,
    duration: "",
    capacity: 0,
    status: "Available",
    description: "",
    equipment: "",
    min_age: 0,
    start_time: "",
    end_time: "",
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/activities`);
      setActivities(response.data);
    } catch (error) {
      console.error("Error fetching activities:", error);
    }
  };

  const openModal = (activity = null) => {
    setCurrentActivity(activity || defaultActivity);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentActivity(null);
  };

  const handleAddActivity = async () => {
    try {
      await axios.post(`${API_BASE_URL}/api/activities`, currentActivity);
      fetchActivities();
      closeModal();
    } catch (error) {
      console.error("Error adding activity:", error);
    }
  };

  const handleUpdateActivity = async () => {
    try {
      await axios.put(
        `${API_BASE_URL}/api/activities/${currentActivity.activity_id}`,
        currentActivity
      );
      fetchActivities();
      closeModal();
    } catch (error) {
      console.error("Error updating activity:", error);
    }
  };

  const handleSaveActivity = () => {
    if (currentActivity.activity_id) {
      handleUpdateActivity();
    } else {
      handleAddActivity();
    }
  };

  const toggleActivityStatus = async (activity_id) => {
    const activityToUpdate = activities.find((a) => a.activity_id === activity_id);
    if (!activityToUpdate) return;

    const newStatus = activityToUpdate.status === "Available" ? "Unavailable" : "Available";

    const updatedActivities = activities.map((a) =>
      a.activity_id === activity_id ? { ...a, status: newStatus } : a
    );
    setActivities(updatedActivities);

    try {
      await axios.put(`${API_BASE_URL}/api/activities/${activity_id}`, {
        ...activityToUpdate,
        status: newStatus,
      });
    } catch (error) {
      console.error("Error toggling status:", error);
      setActivities(activities); // Revert if failed
    }
  };

  const deleteActivity = async (activity_id) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/activities/${activity_id}`);
      fetchActivities();
    } catch (error) {
      console.error("Error deleting activity:", error);
    }
  };

  const filteredActivities = activities.filter(
    (activity) =>
      activity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatTime = (timeStr) => {
    if (!timeStr) return "";
    const [hour, minute] = timeStr.split(":");
    const date = new Date();
    date.setHours(parseInt(hour), parseInt(minute));
    return date.toLocaleTimeString([], { hour: "numeric", hour12: true });
  };


  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Activity Management</h1>
        <button
          onClick={() => openModal()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Activity
        </button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search activities..."
            className="pl-10 pr-4 py-2 border rounded-md w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredActivities.map((activity) => (
          <div key={activity.id} className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">{activity.name}</h2>
                  <p className="text-sm text-gray-500">{activity.type}</p>
                </div>
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${activity.status === "Available" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                >
                  {activity.status}
                </span>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Price:</span>
                  <div className="flex items-center">
                    <span className="font-medium">${activity.price}</span>
                    <button
                      className="ml-2 text-blue-600 hover:text-blue-800"
                      onClick={() => {
                        const newPrice = prompt("Enter new price:", activity.price)
                        if (newPrice && !isNaN(newPrice)) {
                          updateActivityPrice(activity.id, Number(newPrice))
                        }
                      }}
                    >
                      <EditIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">{activity.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Capacity:</span>
                  <span className="font-medium">{activity.capacity} people</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Min Age:</span>
                  <span className="font-medium">{activity.min_age} </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Schedule:</span>
                  <span className="font-medium">
                    {formatTime(activity.start_time)} - {formatTime(activity.end_time)}
                  </span>
                </div>


              </div>

              <p className="mt-4 text-sm text-gray-600">{activity.description}</p>

              <div className="mt-6 flex justify-between">
                <button
                  className="bg-blue-500 border border-gray-300 text-white px-3 py-1 rounded-md hover:bg-gray-50"
                  onClick={() => openModal(activity)}
                >
                  Edit Details
                </button>
                <button
                  className={`px-3 py-1 rounded-md ${activity.status === "Available"
                    ? "bg-red-100 text-red-800 hover:bg-red-200"
                    : "bg-green-100 text-green-800 hover:bg-green-200"
                    }`}
                  onClick={() => toggleActivityStatus(activity.activity_id)}
                >
                  {activity.status === "Available" ? "Mark Unavailable" : "Mark Available"}
                </button>
                <button
                  className="bg-red-500 border border-gray-300 text-white px-3 py-1 rounded-md hover:bg-gray-50"
                  onClick={() => deleteActivity(activity.activity_id)}
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={currentActivity?.id ? "Edit Activity" : "Add New Activity"}
      >
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Activity Name</label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={currentActivity?.name || ""}
              onChange={(e) => setCurrentActivity({ ...currentActivity, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Activity Type</label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={currentActivity?.type || ""}
              onChange={(e) => setCurrentActivity({ ...currentActivity, type: e.target.value })}
            />
          </div>


          <div>
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={currentActivity?.price || ""}
              onChange={(e) => setCurrentActivity({ ...currentActivity, price: Number(e.target.value) })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Duration</label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={currentActivity?.duration || ""}
              onChange={(e) => setCurrentActivity({ ...currentActivity, duration: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Capacity</label>
            <input
              type="number"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={currentActivity?.capacity || ""}
              onChange={(e) => setCurrentActivity({ ...currentActivity, capacity: Number(e.target.value) })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={currentActivity?.status || ""}
              onChange={(e) => setCurrentActivity({ ...currentActivity, status: e.target.value })}
            >
              <option value="Available">Available</option>
              <option value="Unavailable">Unavailable</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              rows="3"
              value={currentActivity?.description || ""}
              onChange={(e) => setCurrentActivity({ ...currentActivity, description: e.target.value })}
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Equipment</label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={currentActivity?.equipment || ""}
              onChange={(e) => setCurrentActivity({ ...currentActivity, equipment: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Minimum Age</label>
            <input
              type="number"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={currentActivity?.min_age || ""}
              onChange={(e) => setCurrentActivity({ ...currentActivity, min_age: Number(e.target.value) })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Start Time</label>
            <input
              type="time"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={currentActivity?.start_time || ""}
              onChange={(e) =>
                setCurrentActivity({ ...currentActivity, start_time: e.target.value })
              }
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">End Time</label>
            <input
              type="time"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={currentActivity?.end_time || ""}
              onChange={(e) =>
                setCurrentActivity({ ...currentActivity, end_time: e.target.value })
              }
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
              onClick={handleSaveActivity}
            >
              Save
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Activities

