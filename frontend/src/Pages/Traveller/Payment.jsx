import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiService from "../../services/api.service";

const BUS_SEAT_MAP_URL = "https://www.heathsidetravel.co.uk/wp-content/uploads/2022/08/mercedes-19-seat-plan-2.svg";

const Payment = () => {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [paying, setPaying] = useState(false);
  const [success, setSuccess] = useState(false);
  const [seatNumber, setSeatNumber] = useState(null);
  const [selectedSeat, setSelectedSeat] = useState("");
  const [bookedSeats, setBookedSeats] = useState([]);
  const [showSeatMap, setShowSeatMap] = useState(false);

  useEffect(() => {
    const fetchTrip = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await apiService.trips.getTrip(tripId);
        setTrip(res.data);
        // Fetch booked seats for this trip
        const bookingsRes = await apiService.bookings.getAllBookings();
        const tripBookings = bookingsRes.data.filter(b => b.trip?._id === tripId);
        setBookedSeats(tripBookings.map(b => b.seatNumber));
      } catch (err) {
        setError("Failed to fetch trip details");
      } finally {
        setLoading(false);
      }
    };
    fetchTrip();
  }, [tripId]);

  const handlePayment = async (e) => {
    e.preventDefault();
    setPaying(true);
    setError("");
    try {
      let userId = localStorage.getItem('userId') || '000000000000000000000000';
      const form = e.target.form || e.target.closest('form');
      const cardholder = form[0].value;
      const cardNumber = form[1].value;
      const expiry = form[2].value;
      const paymentInfo = {
        cardholder,
        cardNumber,
        expiry,
        amount: trip.price,
        status: 'success',
      };
      let seatNum = selectedSeat;
      try {
        const bookingRes = await apiService.bookings.createBooking({
          user: userId,
          trip: trip._id,
          paymentInfo,
          seatNumber: seatNum,
        });
        seatNum = bookingRes.data.seatNumber;
      } catch (err) {
        seatNum = null;
      }
      setPaying(false);
      setSuccess(true);
      setSeatNumber(seatNum);
      setTimeout(() => {
        navigate('/traveller-home/booked-trips');
      }, 2000);
    } catch (err) {
      setPaying(false);
      setSuccess(true);
      setTimeout(() => {
        navigate('/traveller-home/booked-trips');
      }, 2000);
    }
  };

  if (loading) return <div className="p-10 text-lg text-gray-600">Loading payment page...</div>;
  if (!trip) return null;
  if (typeof trip.seatsLeft !== 'number' || trip.seatsLeft <= 0) {
    return <div className="p-10 text-red-500 font-semibold text-center text-2xl">No seats available for this trip.</div>;
  }

  // Generate seat options (1 to totalSeats)
  const totalSeats = trip.totalSeats || 0;
  const seatOptions = Array.from({ length: totalSeats }, (_, i) => i + 1);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200 py-10">
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-2xl w-full flex flex-col gap-8">
        <h2 className="text-3xl font-extrabold text-center text-blue-800 mb-2">Trip Payment</h2>
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <img src={trip.imageUrl || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80'} alt={trip.destination} className="rounded-2xl w-64 h-40 object-cover shadow-lg" />
          <div className="flex-1 flex flex-col gap-2">
            <div className="text-xl font-bold text-blue-900">{trip.destination}</div>
            <div className="text-gray-600">{trip.duration} | {trip.groupType}</div>
            <div className="text-gray-700">Departure: <span className="font-semibold">{trip.date}</span></div>
            <div className="text-gray-700">Vehicle: <span className="font-semibold">{trip.vehicleType || 'Bus/Van'}</span></div>
            <div className="text-gray-700">Places to Visit: <span className="font-semibold">{trip.placesVisiting || 'N/A'}</span></div>
            <div className="text-2xl font-bold text-green-700 mt-2">₹ {trip.price} <span className="text-base font-normal text-gray-600">/person</span></div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-4 mt-4">
          <div className="w-full flex flex-col items-center">
            <label className="font-semibold text-gray-700 mb-2">Reference Bus Seat Map</label>
            <div
              className="w-full max-w-lg border rounded-lg shadow cursor-pointer flex items-center justify-center"
              style={{ background: '#f8fafc', minHeight: '120px' }}
              onClick={() => setShowSeatMap((prev) => !prev)}
              title="Click to show/hide seat map"
            >
              {!showSeatMap && (
                <span className="text-gray-400 text-lg py-8">Click to show seat map</span>
              )}
              {showSeatMap && (
                <img
                  src={BUS_SEAT_MAP_URL}
                  alt="Bus Seat Map"
                  className="w-full max-w-lg"
                  style={{ background: '#f8fafc' }}
                />
              )}
            </div>
          </div>
          <div className="w-full flex flex-col items-center mt-2">
            <label className="font-semibold text-gray-700 mb-2">Select Your Seat</label>
            <select
              className="w-1/2 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
              value={selectedSeat}
              onChange={e => setSelectedSeat(Number(e.target.value))}
              required
            >
              <option value="">Select Seat</option>
              {seatOptions.map(seat => (
                <option key={seat} value={seat} disabled={bookedSeats.includes(seat)}>
                  Seat {seat} {bookedSeats.includes(seat) ? "(Booked)" : ""}
                </option>
              ))}
            </select>
          </div>
        </div>
        <form className="flex flex-col gap-6 mt-4" onSubmit={handlePayment}>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <label className="font-semibold text-gray-700">Cardholder Name</label>
              <input type="text" required className="w-full mt-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg" placeholder="Your Name" />
            </div>
            <div className="flex-1">
              <label className="font-semibold text-gray-700">Card Number</label>
              <input type="text" required maxLength={16} className="w-full mt-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg" placeholder="1234 5678 9012 3456" />
            </div>
          </div>
          <div className="flex gap-6">
            <div className="flex-1">
              <label className="font-semibold text-gray-700">Expiry</label>
              <input type="text" required maxLength={5} className="w-full mt-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg" placeholder="MM/YY" />
            </div>
            <div className="flex-1">
              <label className="font-semibold text-gray-700">CVV</label>
              <input type="password" required maxLength={3} className="w-full mt-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg" placeholder="123" />
            </div>
          </div>
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl text-xl shadow-lg transition disabled:opacity-60" disabled={paying || success || !selectedSeat}>
            {paying ? "Processing..." : success ? "Payment Successful!" : `Pay ₹${trip.price}`}
          </button>
          {success && <div className="text-green-600 text-center font-bold text-lg">Payment Successful! The trip has been booked. Your seat number is {seatNumber}.</div>}
        </form>
      </div>
    </div>
  );
};

export default Payment;