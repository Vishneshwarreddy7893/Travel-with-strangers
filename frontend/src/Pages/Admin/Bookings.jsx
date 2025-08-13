import React, { useEffect, useState } from "react";
import apiService from "../../services/api.service";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await apiService.bookings.getAllBookings();
        setBookings(res.data);
      } catch (err) {
        setError("Failed to fetch bookings");
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  return (
    <div className="p-10 min-h-screen h-screen bg-gray-50 flex flex-col">
      <h1 className="text-2xl font-bold text-blue-900 mb-6">Bookings & Payments</h1>
      <div className="bg-white rounded-xl shadow p-8 overflow-x-auto">
        {loading ? (
          <div className="text-center text-gray-500">Loading bookings...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <table className="min-w-full text-lg">
            <thead>
              <tr className="text-left text-blue-800 border-b">
                <th className="py-2 px-4">User</th>
                <th className="py-2 px-4">Trip</th>
                <th className="py-2 px-4">Amount</th>
                <th className="py-2 px-4">Status</th>
                <th className="py-2 px-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b._id} className="border-b last:border-b-0">
                  <td className="py-2 px-4">{b.user?.firstName} {b.user?.lastName}</td>
                  <td className="py-2 px-4">{b.trip?.destination}</td>
                  <td className="py-2 px-4">₹{b.paymentInfo?.amount}</td>
                  <td className="py-2 px-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${b.paymentInfo?.status === "success" || b.paymentInfo?.status === "Paid" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                      {b.paymentInfo?.status === "success" ? "Paid" : b.paymentInfo?.status || "Pending"}
                    </span>
                  </td>
                  <td className="py-2 px-4">{b.trip?.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Bookings;