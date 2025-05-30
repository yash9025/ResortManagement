import { useState, useEffect } from "react";
import axios from "axios";
import { SearchIcon } from "../components/Icons";

// Get backend API base URL from the environment variable
const backendUrl = import.meta.env.VITE_BACKEND_URI;

const RoomServiceManagement = () => {
  const [requests, setRequests] = useState([]);
  const [staffMembers, setStaffMembers] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    fetchRequests();
    fetchStaffMembers();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/roomservices`);
      setRequests(response.data);
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  const fetchStaffMembers = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/staff`);
      setStaffMembers(response.data);
    } catch (error) {
      console.error("Error fetching staff members:", error);
    }
  };

  const filteredRequests = requests
    .filter((request) => filterStatus === "all" || request.status === filterStatus)
    .filter(
      (request) =>
        request.room_id.toString().includes(searchTerm) ||
        request.guest_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.service.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      // Sort by time (most recent first) and pending requests first
      if (a.status === "pending" && b.status !== "pending") return -1;
      if (a.status !== "pending" && b.status === "pending") return 1;
      return new Date(b.request_time) - new Date(a.request_time);
    });

  const updateRequestStatus = async (requestId, newStatus) => {
    try {
      await axios.put(`${backendUrl}/api/roomservices/${requestId}`, {
        status: newStatus,
        assigned_to_staff_id: selectedRequest?.assigned_to_staff_id || null,
      });
      setRequests(requests.map((request) => (request.service_id === requestId ? { ...request, status: newStatus } : request)));
      if (selectedRequest && selectedRequest.service_id === requestId) {
        setSelectedRequest({ ...selectedRequest, status: newStatus });
      }
    } catch (error) {
      console.error("Error updating request status:", error);
    }
  };

  const assignStaffToRequest = async (requestId, staffId) => {
    await updateRequestStatus(requestId, "in-progress");
    setRequests(
      requests.map((request) =>
        request.service_id === requestId
          ? { ...request, assigned_to_staff_id: staffId, status: "in-progress" }
          : request
      )
    );
    if (selectedRequest && selectedRequest.service_id === requestId) {
      setSelectedRequest({
        ...selectedRequest,
        assigned_to_staff_id: staffId,
        status: "in-progress",
      });
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };


  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Room Service Management</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative w-full md:w-64">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search by room, guest or service..."
              className="pl-10 pr-4 py-2 border rounded-md w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex space-x-2">
            <button
              className={`px-3 py-1 rounded-md text-sm font-medium ${filterStatus === "all" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
                }`}
              onClick={() => setFilterStatus("all")}
            >
              All
            </button>
            <button
              className={`px-3 py-1 rounded-md text-sm font-medium ${filterStatus === "pending" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
                }`}
              onClick={() => setFilterStatus("pending")}
            >
              Pending
            </button>
            <button
              className={`px-3 py-1 rounded-md text-sm font-medium ${filterStatus === "in-progress" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
                }`}
              onClick={() => setFilterStatus("in-progress")}
            >
              In Progress
            </button>
            <button
              className={`px-3 py-1 rounded-md text-sm font-medium ${filterStatus === "completed" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
                }`}
              onClick={() => setFilterStatus("completed")}
            >
              Completed
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
                      Request Info
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Service
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Assigned To
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredRequests.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                        No service requests found
                      </td>
                    </tr>
                  ) : (
                    filteredRequests.map((request) => (
                      <tr
                        key={request.service_id}
                        className={`hover:bg-gray-50 cursor-pointer ${selectedRequest?.service_id === request.service_id ? "bg-blue-50" : ""}`}
                        onClick={() => setSelectedRequest(request)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">Room {request.room_id}</div>
                          <div className="text-sm text-gray-500">{request.guest_id}</div>
                          <div className="text-xs text-gray-500">{new Date(request.request_time).toLocaleString()}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{request.service}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(request.status)}`}
                          >
                            {request.status === "in-progress"
                              ? "In Progress"
                              : request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{request.assigned_to_staff_id || "-"}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {request.status === "pending" && (
                            <button
                              className="text-blue-600 hover:text-blue-900 mr-2"
                              onClick={(e) => {
                                e.stopPropagation();
                                updateRequestStatus(request.service_id, "in-progress");
                              }}
                            >
                              Accept
                            </button>
                          )}
                          {request.status === "in-progress" && (
                            <button
                              className="text-green-600 hover:text-green-900 mr-2"
                              onClick={(e) => {
                                e.stopPropagation();
                                updateRequestStatus(request.service_id, "completed");
                              }}
                            >
                              Complete
                            </button>
                          )}
                          {(request.status === "pending" || request.status === "in-progress") && (
                            <button
                              className="text-red-600 hover:text-red-900"
                              onClick={(e) => {
                                e.stopPropagation();
                                updateRequestStatus(request.service_id, "cancelled");
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
          {selectedRequest ? (
            <div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Request #{selectedRequest.service_id}</h2>
                  <p className="text-sm text-gray-600">
                    Room {selectedRequest.room_id} - {selectedRequest.guest_id}
                  </p>
                  <p className="text-xs text-gray-500">{new Date(selectedRequest.request_time).toLocaleString()}</p>
                </div>
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeClass(selectedRequest.status)}`}
                >
                  {selectedRequest.status === "in-progress"
                    ? "In Progress"
                    : selectedRequest.status.charAt(0).toUpperCase() + selectedRequest.status.slice(1)}
                </span>
              </div>

              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-700 mb-1">Service Requested:</h3>
                <p className="text-sm font-semibold">{selectedRequest.service}</p>
              </div>

              {selectedRequest.notes && (
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-1">Special Instructions:</h3>
                  <p className="text-sm bg-gray-50 p-2 rounded">{selectedRequest.notes}</p>
                </div>
              )}

              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-700 mb-1">Assigned Staff:</h3>
                <select
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={selectedRequest.assigned_to_staff_id || ""}
                  onChange={(e) => assignStaffToRequest(selectedRequest.service_id, e.target.value)}
                  disabled={selectedRequest.status === "completed" || selectedRequest.status === "cancelled"}
                >
                  <option value="">Not Assigned</option>
                  {staffMembers.map((staff) => (
                    <option key={staff.staff_id} value={staff.staff_id}>
                      {staff.name} ({staff.position})
                    </option>
                  ))}
                </select>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Update Status:</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedRequest.status !== "pending" && (
                    <button
                      className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-md text-sm font-medium"
                      onClick={() => updateRequestStatus(selectedRequest.service_id, "pending")}
                      disabled={selectedRequest.status === "completed" || selectedRequest.status === "cancelled"}
                    >
                      Pending
                    </button>
                  )}
                  {selectedRequest.status !== "in-progress" && (
                    <button
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-md text-sm font-medium"
                      onClick={() => updateRequestStatus(selectedRequest.service_id, "in-progress")}
                      disabled={selectedRequest.status === "completed" || selectedRequest.status === "cancelled"}
                    >
                      In Progress
                    </button>
                  )}
                  {selectedRequest.status !== "completed" && (
                    <button
                      className="px-3 py-1 bg-green-100 text-green-800 rounded-md text-sm font-medium"
                      onClick={() => updateRequestStatus(selectedRequest.service_id, "completed")}
                      disabled={selectedRequest.status === "cancelled"}
                    >
                      Completed
                    </button>
                  )}
                  {selectedRequest.status !== "cancelled" && (
                    <button
                      className="px-3 py-1 bg-red-100 text-red-800 rounded-md text-sm font-medium"
                      onClick={() => updateRequestStatus(selectedRequest.service_id, "cancelled")}
                      disabled={selectedRequest.status === "completed"}
                    >
                      Cancelled
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">Select a service request to view details</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomServiceManagement;