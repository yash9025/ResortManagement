import axios from "axios";
import { useState, useEffect } from "react";
import { PlusIcon, EditIcon, SearchIcon, TrashIcon } from "../components/Icons";
import Modal from "../components/Modal";


const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRoom, setCurrentRoom] = useState(null);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/rooms");
      setRooms(response.data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  const addRoom = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/rooms", currentRoom);
      fetchRooms();
      closeModal();
    } catch (error) {
      console.error("Error adding room:", error);
    }
  };

  const updateRoom = async () => {
    try {
      await axios.put(`http://localhost:5000/api/rooms/${currentRoom.room_id}`, currentRoom);
      fetchRooms();
      closeModal();
    } catch (error) {
      console.error("Error updating room:", error);
    }
  };

  const deleteRoom = async (room_id) => {
    if (!room_id) {
      console.error("Error: room_id is undefined.");
      return;
    }
    try {
      await axios.delete(`http://localhost:5000/api/rooms/${room_id}`);
      setRooms(rooms.filter((room) => room.room_id !== room_id));
    } catch (error) {
      console.error("Error deleting room:", error.response?.data || error);
    }
  };

  const toggleRoomStatus = async (room) => {
    try {
      let newStatus;

      // Cycle through statuses: Available → Occupied → Under Maintenance → Available
      if (room.status === "Available") {
        newStatus = "Occupied";
      } else if (room.status === "Occupied") {
        newStatus = "Under Maintenance";
      } else {
        newStatus = "Available";
      }

      await axios.put(`http://localhost:5000/api/rooms/${room.room_id}`, {
        ...room,
        status: newStatus,
      });

      fetchRooms(); // Refresh the list after update
    } catch (error) {
      console.error("❌ Error updating room status:", error.response?.data || error);
    }
  };

  const openModal = (room = null) => {
    console.log("Opening Modal with room:", room);
    setCurrentRoom(
      room || {
        number: "",
        type: "",
        price: "",
        capacity: "",
        status: "Available",
        temperature: "",
        lighting: "",
        cleanliness: ""
      }
    );
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentRoom(null);
  };

  const handleSaveRoom = () => {
    if (currentRoom?.room_id) {
      updateRoom();
    } else {
      addRoom();
    }
  };

  const filteredRooms = rooms.filter((room) =>
    room?.number?.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );



  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Room Management</h1>
        <button
          onClick={() => openModal()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Room
        </button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search rooms..."
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Room</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Capacity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ambiance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRooms.map((room, index) => (
                <tr key={room.id || room._id || index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{room.number}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{room.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${room.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{room.capacity}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex flex-col">
                      <span><strong>Temp:</strong> {room.temperature}°C</span>
                      <span><strong>Lighting:</strong> {room.lighting}</span>
                      <span><strong>Clean:</strong> {room.cleanliness}</span>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${room.status === "Available"
                        ? "bg-green-100 text-green-800"
                        : room.status === "Occupied"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-red-100 text-red-800"
                        }`}
                    >
                      {room.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3" onClick={() => openModal(room)}>
                      <EditIcon className="h-4 w-4" />
                    </button>

                    <button
                      className={`px-2 py-1 rounded-md text-white ${room.status === "Available" ? "bg-green-500" :
                        room.status === "Occupied" ? "bg-blue-500" :
                          "bg-yellow-500"
                        }`}
                      onClick={() => toggleRoomStatus(room)}
                    >
                      {room.status === "Available" ? "Set Occupied" :
                        room.status === "Occupied" ? "Set Maintenance" :
                          "Set Available"}
                    </button>

                    <button className="text-red-600 hover:text-red-900" onClick={() => deleteRoom(room.room_id)}>
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} title={currentRoom?.id ? "Edit Room" : "Add New Room"}>
        <div className="grid grid-cols-1 gap-4">
          {/* Room Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Room Number</label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3"
              value={currentRoom?.number || ""}
              onChange={(e) => setCurrentRoom({ ...currentRoom, number: e.target.value })}
            />
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Type</label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3"
              value={currentRoom?.type || ""}
              onChange={(e) => setCurrentRoom({ ...currentRoom, type: e.target.value })}
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3"
              value={currentRoom?.price || ""}
              onChange={(e) => setCurrentRoom({ ...currentRoom, price: Number(e.target.value) })}
            />
          </div>

          {/* Capacity */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Capacity</label>
            <input
              type="text"  // Change input type to "text"
              className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3"
              value={currentRoom?.capacity || ""}
              onChange={(e) => setCurrentRoom({ ...currentRoom, capacity: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Lighting</label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3"
              value={currentRoom?.lighting || ""}
              onChange={(e) => setCurrentRoom({ ...currentRoom, lighting: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Cleanliness</label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3"
              value={currentRoom?.cleanliness || ""}
              onChange={(e) => setCurrentRoom({ ...currentRoom, cleanliness: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Temperature</label>
            <input
              type="number"
              className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3"
              value={currentRoom?.temperature || ""}
              onChange={(e) => setCurrentRoom({ ...currentRoom, temperature: Number(e.target.value) })}
            />
          </div>


          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3"
              value={currentRoom?.status || "Available"}
              onChange={(e) => setCurrentRoom({ ...currentRoom, status: e.target.value })}
            >
              <option value="Available">Available</option>
              <option value="Under Maintenance">Under Maintenance</option>
              <option value="Occupied">Occupied</option>
            </select>
          </div>




          {/* Buttons */}
          <div className="flex justify-end mt-6">
            <button className="bg-gray-300 px-4 py-2 rounded-md" onClick={closeModal}>
              Cancel
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md ml-2" onClick={handleSaveRoom}>
              Save
            </button>
          </div>
        </div>
      </Modal>

    </div>
  );
};

export default Rooms;
