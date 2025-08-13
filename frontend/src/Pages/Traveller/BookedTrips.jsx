import React, { useEffect, useState } from "react";
import apiService from "../../services/api.service";
import TicketDetails from "./TicketDetails";

const BookedTrips = () => {
  const [bookedTrips, setBookedTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cancelMsg, setCancelMsg] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);

  const fetchBookings = async () => {
    setLoading(true);
    setError("");
    try {
      const userId = localStorage.getItem('userId');
      const res = await apiService.bookings.getUserBookings(userId);
      setBookedTrips(res.data);
    } catch (err) {
      setError("Failed to fetch booked trips");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async (bookingId) => {
    setCancelMsg("");
    try {
      await apiService.bookings.cancelBooking(bookingId);
      setCancelMsg("Booking cancelled successfully.");
      fetchBookings();
    } catch (err) {
      setCancelMsg("Failed to cancel booking.");
    }
  };

  const closeModal = () => setSelectedBooking(null);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-extrabold mb-8 text-[#3B2F8C]">Booked Trips</h2>
      {cancelMsg && <div className={`text-center text-lg mb-4 ${cancelMsg.includes('success') ? 'text-green-600' : 'text-red-500'}`}>{cancelMsg}</div>}
      {loading ? (
        <div className="text-center text-gray-500 text-lg mt-20">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500 text-lg mt-20">{error}</div>
      ) : bookedTrips.length === 0 ? (
        <div className="text-center text-gray-500 text-lg mt-20">No trips currently booked</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bookedTrips.map((booking) => (
            <div key={booking._id} className="bg-white rounded-xl shadow p-6 flex flex-col gap-2">
              <div className="text-xl font-bold mb-2 text-[#3B2F8C]">{booking.trip?.destination}</div>
              <div className="text-gray-700 mb-1">Dates: <span className="font-semibold">{booking.trip?.date}</span></div>
              <div className="text-gray-700 mb-1">Status: <span className="font-semibold">Booked</span></div>
              <div className="text-gray-700 mb-1">Price: <span className="font-semibold">₹{booking.trip?.price}</span></div>
              <div className="flex gap-4 mt-2">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setSelectedBooking(booking)}>View Trip Details</button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleCancel(booking._id)}>Cancel Trip</button>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Modal for ticket details */}
      {selectedBooking && (
        <TicketDetails booking={selectedBooking} onClose={closeModal} />
      )}
    </div>
  );
};

export default BookedTrips;