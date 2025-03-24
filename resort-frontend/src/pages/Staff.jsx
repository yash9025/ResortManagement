"use client"

import { useState } from "react"
import { PlusIcon, SearchIcon } from "../components/Icons"
import Modal from "../components/Modal"

const Staff = () => {
  const [staffMembers, setStaffMembers] = useState([
    {
      id: 1,
      name: "James Wilson",
      email: "james.w@resortname.com",
      position: "General Manager",
      department: "Management",
      phone: "+1 (555) 123-4567",
      status: "Active",
      joined: "2018-03-15",
      schedule: "Mon-Fri, 9AM-5PM",
    },
    {
      id: 2,
      name: "Maria Garcia",
      email: "maria.g@resortname.com",
      position: "Front Desk Manager",
      department: "Front Office",
      phone: "+1 (555) 234-5678",
      status: "Active",
      joined: "2019-06-22",
      schedule: "Wed-Sun, 7AM-3PM",
    },
    {
      id: 3,
      name: "Robert Chen",
      email: "robert.c@resortname.com",
      position: "Executive Chef",
      department: "Food & Beverage",
      phone: "+1 (555) 345-6789",
      status: "Active",
      joined: "2017-11-10",
      schedule: "Tue-Sat, 2PM-10PM",
    },
    {
      id: 4,
      name: "Sophia Patel",
      email: "sophia.p@resortname.com",
      position: "Spa Director",
      department: "Wellness",
      phone: "+1 (555) 456-7890",
      status: "On Leave",
      joined: "2020-02-15",
      schedule: "Mon-Fri, 10AM-6PM",
    },
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentStaff, setCurrentStaff] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")

  const openModal = (staff = null) => {
    setCurrentStaff(
      staff || {
        name: "",
        email: "",
        position: "",
        department: "",
        phone: "",
        status: "Active",
        joined: "",
        schedule: "",
      },
    )
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setCurrentStaff(null)
  }

  const handleSaveStaff = () => {
    if (currentStaff.id) {
      // Update existing staff
      setStaffMembers(staffMembers.map((staff) => (staff.id === currentStaff.id ? currentStaff : staff)))
    } else {
      // Add new staff
      setStaffMembers([...staffMembers, { ...currentStaff, id: Date.now() }])
    }
    closeModal()
  }

  const filteredStaff = staffMembers.filter(
    (staff) =>
      staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.status.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Staff Management</h1>
        <button
          onClick={() => openModal()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Staff
        </button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search staff..."
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
                  Staff
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Position
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Schedule
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStaff.map((staff) => (
                <tr key={staff.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-700">{staff.name.charAt(0)}</span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{staff.name}</div>
                        <div className="text-sm text-gray-500">{staff.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{staff.position}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{staff.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{staff.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        staff.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : staff.status === "On Leave"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {staff.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{staff.schedule}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900" onClick={() => openModal(staff)}>
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} title={currentStaff?.id ? "Edit Staff" : "Add New Staff"}>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={currentStaff?.name || ""}
              onChange={(e) => setCurrentStaff({ ...currentStaff, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={currentStaff?.email || ""}
              onChange={(e) => setCurrentStaff({ ...currentStaff, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Position</label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={currentStaff?.position || ""}
              onChange={(e) => setCurrentStaff({ ...currentStaff, position: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Department</label>
            <select
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={currentStaff?.department || ""}
              onChange={(e) => setCurrentStaff({ ...currentStaff, department: e.target.value })}
            >
              <option value="">Select Department</option>
              <option value="Management">Management</option>
              <option value="Front Office">Front Office</option>
              <option value="Housekeeping">Housekeeping</option>
              <option value="Food & Beverage">Food & Beverage</option>
              <option value="Wellness">Wellness</option>
              <option value="Maintenance">Maintenance</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={currentStaff?.phone || ""}
              onChange={(e) => setCurrentStaff({ ...currentStaff, phone: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={currentStaff?.status || ""}
              onChange={(e) => setCurrentStaff({ ...currentStaff, status: e.target.value })}
            >
              <option value="Active">Active</option>
              <option value="On Leave">On Leave</option>
              <option value="Terminated">Terminated</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Join Date</label>
            <input
              type="date"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={currentStaff?.joined || ""}
              onChange={(e) => setCurrentStaff({ ...currentStaff, joined: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Schedule</label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={currentStaff?.schedule || ""}
              onChange={(e) => setCurrentStaff({ ...currentStaff, schedule: e.target.value })}
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
              onClick={handleSaveStaff}
            >
              Save
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Staff

