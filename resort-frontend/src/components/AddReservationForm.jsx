import React, { useState } from "react";

const AddReservationForm = ({ rooms, onAddReservation }) => {
    const [roomId, setRoomId] = useState("");
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [guests, setGuests] = useState([{ name: "", email: "", phone: "" }]);
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [paymentStatus, setPaymentStatus] = useState("pending");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [specialRequests, setSpecialRequests] = useState("");

    const handleAddGuest = () => {
        setGuests([...guests, { name: "", email: "", phone: "" }]);
    };

    const handleGuestChange = (index, field, value) => {
        const newGuests = [...guests];
        newGuests[index][field] = value;
        setGuests(newGuests);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const reservationData = {
            room_id: roomId,
            check_in: checkIn,
            check_out: checkOut,
            adults,
            children,
            total_amount: totalAmount,
            payment_status: paymentStatus,
            payment_method: paymentMethod,
            booked_on: new Date().toISOString().split('T')[0],
            special_requests: specialRequests,
            guests: guests.filter(guest => guest.name), // Filter out empty guests
        };
        await onAddReservation(reservationData);
        // Reset form
        resetForm();
    };

    const resetForm = () => {
        setRoomId("");
        setCheckIn("");
        setCheckOut("");
        setGuests([{ name: "", email: "", phone: "" }]);
        setAdults(1);
        setChildren(0);
        setTotalAmount(0);
        setPaymentStatus("pending");
        setPaymentMethod("");
        setSpecialRequests("");
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            <h2 className="text-lg font-semibold">Add Reservation</h2>
            <div>
                <label>Room</label>
                <select
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                    required
                >
                    <option value="">Select Room</option>
                    {rooms.map((room) => (
                        <option key={room.id} value={room.id}>
                            Room {room.number}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Check-in Date</label>
                <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Check-out Date</label>
                <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Adults</label>
                <input
                    type="number"
                    value={adults}
                    onChange={(e) => setAdults(e.target.value)}
                    min="1"
                    required
                />
            </div>
            <div>
                <label>Children</label>
                <input
                    type="number"
                    value={children}
                    onChange={(e) => setChildren(e.target.value)}
                    min="0"
                />
            </div>
            <div>
                <label>Total Amount</label>
                <input
                    type="number"
                    value={totalAmount}
                    onChange={(e) => setTotalAmount(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Payment Status</label>
                <select
                    value={paymentStatus}
                    onChange={(e) => setPaymentStatus(e.target.value)}
                >
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                    <option value="failed">Failed</option>
                </select>
            </div>
            <div>
                <label>Payment Method</label>
                <input
                    type="text"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Special Requests</label>
                <textarea
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                />
            </div>
            <div>
                <h3>Guests</h3>
                {guests.map((guest, index) => (
                    <div key={index} className="flex space-x-2">
                        <input
                            type="text"
                            placeholder="Name"
                            value={guest.name}
                            onChange={(e) => handleGuestChange(index, "name", e.target.value)}
                            required
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={guest.email}
                            onChange={(e) => handleGuestChange(index, "email", e.target.value)}
                        />
                        <input
                            type="tel"
                            placeholder="Phone"
                            value={guest.phone}
                            onChange={(e) => handleGuestChange(index, "phone", e.target.value)}
                        />
                    </div>
                ))}
                <button type="button" onClick={handleAddGuest} className="mt-2">
                    Add Guest
                </button>
            </div>
            <button type="submit" className="mt-4 py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700">
                Add Reservation
            </button>
        </form>
    );
};

export default AddReservationForm;