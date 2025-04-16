import { SearchIcon } from "../components/Icons";
import { useEffect, useState } from "react";
import axios from "axios";
import AddReservationForm from "../components/AddReservationForm";

const backendUrl = import.meta.env.VITE_BACKEND_URI;

const ReservationManagement = () => {
  const [reservations, setReservations] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterRoom, setFilterRoom] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showAddReservationForm, setShowAddReservationForm] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    fetchReservations();
    fetchRooms();
  }, []);

  const fetchReservations = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/reservations`);
      setReservations(data);
    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
  };

  const fetchRooms = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/rooms`);
      setRooms(data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  const onAddReservation = async (reservationData) => {
    try {
      const response = await axios.post(`${backendUrl}/api/reservations`, reservationData);
      alert(response.data.message);
      fetchReservations();
      closeModal(); // Refresh the reservations list
    } catch (error) {
      console.error("Error creating reservation:", error);
      alert("Failed to create reservation. Please try again.");
    }
  };


  const updateReservationStatus = async (reservationId, newStatus) => {
    try {
      // Send the status update request
      await axios.put(`${backendUrl}/api/reservations/${reservationId}`, { status: newStatus });

      // Update local state
      setReservations((prev) =>
        prev.map((res) => (res.reservation_id === reservationId ? { ...res, status: newStatus } : res))
      );

      // Update selected reservation if it matches
      if (selectedReservation?.reservation_id === reservationId) {
        setSelectedReservation((prev) => ({ ...prev, status: newStatus }));
      }
    } catch (error) {
      console.error("Error updating reservation status:", error);
      alert("Failed to update reservation status. Please try again.");
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-yellow-100 text-yellow-800";
      case "checked-in":
        return "bg-blue-100 text-blue-800";
      case "checked-out":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPaymentStatusBadgeClass = (paymentStatus) => {
    switch (paymentStatus) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const uniqueRooms = [...new Set(rooms.map(room => room.number))]; // Get unique room numbers

  const filteredReservations = reservations.filter(reservation => {
    const matchesStatus = filterStatus === "all" || reservation.status === filterStatus;
    const matchesRoom = filterRoom === "all" || reservation.room_number === filterRoom; // Ensure this matches your data structure
    const matchesSearchTerm = reservation.guest_name.toLowerCase().includes(searchTerm.toLowerCase()) || // Ensure this matches your data structure
      reservation.room_type.toLowerCase().includes(searchTerm.toLowerCase()); // Ensure this matches your data structure
    return matchesStatus && matchesRoom && matchesSearchTerm;
  });

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Reservation Management</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div>
          <button onClick={openModal} className="mb-4 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Add Reservation
          </button>

          {isModalOpen && (
            <AddReservationForm
              rooms={rooms} // Pass the list of rooms as a prop
              onAddReservation={onAddReservation} // Pass the submission handler
            />
          )}
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative w-full md:w-64">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search by guest..."
              className="pl-10 pr-4 py-2 border rounded-md w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <select
              className="border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="confirmed">Confirmed</option>
              <option value="checked-in">Checked In</option>
              <option value="checked-out">Checked Out</option>
              <option value="cancelled">Cancelled</option>
            </select>

            <select
              className="border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={filterRoom}
              onChange={(e) => setFilterRoom(e.target.value)}
            >
              <option value="all">All Rooms</option>
              {uniqueRooms.map((room) => (
                <option key={room} value={room}>
                  Room {room}
                </option>
              ))}
            </select>
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
                      Guest & Room
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Dates
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Payment
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredReservations.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                        No reservations found
                      </td>
                    </tr>
                  ) : (
                    filteredReservations.map((reservation) => (
                      <tr
                        key={reservation.reservation_id}
                        className={`hover:bg-gray-50 cursor-pointer ${selectedReservation?.reservation_id === reservation.reservation_id ? "bg-blue-50" : ""}`}
                        onClick={() => setSelectedReservation(reservation)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{reservation.guest_name}</div>
                          <div className="text-sm text-gray-500">
                            Room {reservation.room_number} - {reservation.room_type}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{formatDate(reservation.check_in)}</div>
                          <div className="text-sm text-gray-500">to {formatDate(reservation.check_out)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(reservation.status)}`}
                          >
                            {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex flex-col">
                            <span
                              className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getPaymentStatusBadgeClass(reservation.payment_status)}`}
                            >
                              {reservation.payment_status.charAt(0).toUpperCase() + reservation.payment_status.slice(1)}
                            </span>
                            {reservation.payment_method && (
                              <span className="text-xs text-gray-500 mt-1">
                                via{" "}
                                {reservation.payment_method.charAt(0).toUpperCase() + reservation.payment_method.slice(1)}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {reservation?.status === "confirmed" && (
                            <button
                              className="text-blue-600 hover:text-blue-900 mr-2"
                              onClick={(e) => {
                                e.stopPropagation(); // Prevents the click event from bubbling up to parent elements
                                updateReservationStatus(reservation.reservation_id, "checked-in"); // Calls the function to update the reservation status
                              }}
                            >
                              Check In
                            </button>
                          )}

                          {reservation.status === "checked-in" && (
                            <button
                              className="text-green-600 hover:text-green-900 mr-2"
                              onClick={(e) => {
                                e.stopPropagation();
                                updateReservationStatus(reservation.reservation_id, "checked-out");
                              }}
                            >
                              Check Out
                            </button>
                          )}
                          {(reservation.status === "confirmed" || reservation.status === "checked-in") && (
                            <button
                              className="text-red-600 hover:text-red-900"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (window.confirm("Are you sure you want to cancel this reservation?")) {
                                  updateReservationStatus(reservation.reservation_id, "cancelled");
                                }
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
          {selectedReservation ? (
            <div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Reservation #{selectedReservation.reservation_id}</h2>
                  <p className="text-sm text-gray-600">Booked on {formatDate(selectedReservation.booked_on)}</p>
                </div>
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeClass(selectedReservation.status)}`}
                >
                  {selectedReservation.status.charAt(0).toUpperCase() + selectedReservation.status.slice(1)}
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Guest Information</h3>
                  <p className="text-base font-semibold mt-1">{selectedReservation.guest_name}</p>
                  <p className="text-sm text-gray-600">{selectedReservation.guest_email}</p>
                  <p className="text-sm text-gray-600">{selectedReservation.guest_phone}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-700">Room Information</h3>
                  <p className="text-base font-semibold mt-1">{selectedReservation.room_type}</p>
                  <p className="text-sm text-gray-600">Room {selectedReservation.room_number}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">Check-in</h3>
                    <p className="text-base mt-1">{formatDate(selectedReservation.check_in)}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">Check-out</h3>
                    <p className="text-base mt-1">{formatDate(selectedReservation.check_out)}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-700">Guests</h3>
                  <p className="text-base mt-1">
                    {selectedReservation.adults} Adults, {selectedReservation.children} Children
                  </p>
                </div>

                {selectedReservation.special_requests && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">Special Requests</h3>
                    <p className="text-sm mt-1 bg-gray-50 p-2 rounded">{selectedReservation.special_requests}</p>
                  </div>
                )}

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-medium text-gray-700">Total Amount</h3>
                    <p className="text-lg font-bold">
                      ${selectedReservation.total_amount ? parseFloat(selectedReservation.total_amount).toFixed(2) : "0.00"}
                    </p>
                  </div>

                  <div className="flex justify-between items-center mt-2">
                    <h3 className="text-sm font-medium text-gray-700">Payment Status</h3>
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${getPaymentStatusBadgeClass(selectedReservation.payment_status)}`}
                    >
                      {selectedReservation.payment_status.charAt(0).toUpperCase() +
                        selectedReservation.payment_status.slice(1)}
                    </span>
                  </div>

                  {selectedReservation.payment_method && (
                    <div className="flex justify-between items-center mt-2">
                      <h3 className="text-sm font-medium text-gray-700">Payment Method</h3>
                      <span className="text-sm">
                        {selectedReservation.payment_method.charAt(0).toUpperCase() +
                          selectedReservation.payment_method.slice(1)}
                      </span>
                    </div>
                  )}
                </div>

                <div className="border-t pt-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Actions</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedReservation.status === "confirmed" && (
                      <button
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-md text-sm font-medium"
                        onClick={() => updateReservationStatus(selectedReservation.reservation_id, "checked-in")}
                      >
                        Check In
                      </button>
                    )}
                    {selectedReservation.status === "checked-in" && (
                      <button
                        className="px-3 py-1 bg-green-100 text-green-800 rounded-md text-sm font-medium"
                        onClick={() => updateReservationStatus(selectedReservation.reservation_id, "checked-out")}
                      >
                        Check Out
                      </button>
                    )}
                    {(selectedReservation.status === "confirmed" || selectedReservation.status === "checked-in") && (
                      <button
                        className="px-3 py-1 bg-red-100 text-red-800 rounded-md text-sm font-medium"
                        onClick={() => {
                          if (window.confirm("Are you sure you want to cancel this reservation?")) {
                            updateReservationStatus(selectedReservation.reservation_id, "cancelled");
                          }
                        }}
                      >
                        Cancel Reservation
                      </button>
                    )}

                    {selectedReservation.payment_status === "pending" && (
                      <button
                        className="px-3 py-1 bg-green-100 text-green-800 rounded-md text-sm font-medium"
                        onClick={() => {
                          setShowPaymentModal(true);
                        }}
                      >
                        Record Payment
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">Select a reservation to view details</div>
          )}
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && selectedReservation && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" onClick={() => setShowPaymentModal(false)}>
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                      Record Payment for Reservation #{selectedReservation.reservation_id}
                    </h3>

                    <div className="mb-4">
                      <p className="text-sm text-gray-600">
                        Guest: <span className="font-medium">{selectedReservation.guest_name}</span>
                      </p>
                      <p className="text-sm text-gray-600">
                        Total Amount: <span className="font-bold">${selectedReservation.total_amount.toFixed(2)}</span>
                      </p>
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <input
                            id="online"
                            name="paymentMethod"
                            type="radio"
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            checked={true}
                            onChange={() => { }}
                          />
                          <label htmlFor="online" className="ml-3 block text-sm font-medium text-gray-700">
                            Online Payment
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="cash"
                            name="paymentMethod"
                            type="radio"
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            checked={false}
                            onChange={() => { }}
                          />
                          <label htmlFor="cash" className="ml-3 block text-sm font-medium text-gray-700">
                            Cash
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Transaction ID/Reference</label>
                      <input
                        type="text"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter transaction reference"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                      <textarea
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        rows="2"
                        placeholder="Any additional payment notes"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => {
                    // Implement the payment update logic here
                    // updatePaymentStatus(selectedReservation.reservation_id, "paid", "online");
                    setShowPaymentModal(false);
                  }}
                >
                  Record Payment
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setShowPaymentModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationManagement;