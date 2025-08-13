import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../../services/api.service";

const icons = {
  hotel: "🏨",
  sightseeing: "🔭",
  transfer: "🚗",
  meal: "🍽️",
  flight: "✈️",
};

const AllTrips = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrips = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await apiService.trips.getAllTrips();
        setTrips(res.data);
      } catch (err) {
        setError("Failed to fetch trips");
      } finally {
        setLoading(false);
      }
    };
    fetchTrips();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-extrabold mb-8 text-[#3B2F8C]">Popular Destinations</h2>
      {loading ? (
        <div className="text-lg text-gray-600">Loading trips...</div>
      ) : error ? (
        <div className="text-red-500 font-semibold">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trips.map((trip) => {
            // For now, assume no bookings, so available = totalSeats
            const totalSeats = trip.totalSeats || 0;
            const bookedSeats = 0; // Replace with real booking count when available
            const availableSeats = totalSeats - bookedSeats;
            return (
              <div key={trip._id} className="bg-white rounded-2xl shadow-lg p-0 flex flex-col border border-gray-200 hover:shadow-2xl transition overflow-hidden">
                <div className="relative">
                  <img src={trip.imageUrl || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80'} alt={trip.destination} className="w-full h-48 object-cover" />
                  <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">{trip.duration || '3 Nights'}</span>
                  <span className="absolute top-3 right-3 bg-purple-100 text-purple-700 text-xs font-bold px-3 py-1 rounded-full border border-purple-300">Add to Compare</span>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="text-lg font-bold mb-1 text-gray-800">{trip.destination} {trip.title ? `- ${trip.title}` : ''}</div>
                  <div className="text-gray-500 text-sm mb-2">{trip.duration || '03 Nights'}</div>
                  <div className="flex gap-3 text-base mb-2">
                    <span className="font-semibold text-blue-700">Vehicle:</span> {trip.vehicleType || 'N/A'}
                  </div>
                  <div className="flex gap-3 text-base mb-2">
                    <span className="font-semibold text-green-700">Available Seats:</span> {typeof trip.seatsLeft === 'number' && typeof trip.totalSeats === 'number' ? `${trip.seatsLeft}/${trip.totalSeats}` : 'N/A'}
                  </div>
                  <div className="flex items-center justify-between mt-auto pt-4">
                    <div>
                      <div className="text-xs text-gray-400 line-through">₹ {trip.oldPrice || '30,999'}</div>
                      <div className="text-2xl font-bold text-green-700">₹ {trip.price || '28,500'}</div>
                      <div className="text-xs text-gray-500">Per Person</div>
                    </div>
                    <button className="border border-orange-400 text-orange-500 font-bold px-6 py-2 rounded-lg hover:bg-orange-50 transition" onClick={() => navigate(`/trip/${trip._id}`)}>View Details</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AllTrips;