import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
        const res = await axios.get("http://localhost:5000/api/trips");
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
          {trips.map((trip) => (
            <div key={trip._id} className="bg-white rounded-2xl shadow-lg p-0 flex flex-col border border-gray-200 hover:shadow-2xl transition overflow-hidden">
              <div className="relative">
                <img src={trip.imageUrl || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80'} alt={trip.destination} className="w-full h-48 object-cover" />
                <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">{trip.duration || '3 Nights'}</span>
                <span className="absolute top-3 right-3 bg-purple-100 text-purple-700 text-xs font-bold px-3 py-1 rounded-full border border-purple-300">Add to Compare</span>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <div className="text-lg font-bold mb-1 text-gray-800">{trip.destination} {trip.title ? `- ${trip.title}` : ''}</div>
                <div className="text-gray-500 text-sm mb-2">{trip.nights || '03 Nights'}</div>
                <div className="flex gap-3 text-2xl mb-2">
                  {trip.includes?.flight && <span title="Flight">{icons.flight}</span>}
                  {trip.includes?.hotel && <span title="Hotel">{icons.hotel}</span>}
                  {trip.includes?.sightseeing && <span title="Sightseeing">{icons.sightseeing}</span>}
                  {trip.includes?.transfer && <span title="Transfer">{icons.transfer}</span>}
                  {trip.includes?.meal && <span title="Meal">{icons.meal}</span>}
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-green-600 text-sm font-semibold">✔ Goa Package with Flight</span>
                </div>
                <div className="flex items-center justify-between mt-auto pt-4">
                  <div>
                    <div className="text-xs text-gray-400 line-through">₹ {trip.oldPrice || '30,999'}</div>
                    <div className="text-2xl font-bold text-green-700">₹ {trip.price || '28,500'}</div>
                    <div className="text-xs text-gray-500">Per Person on twin sharing</div>
                  </div>
                  <button className="border border-orange-400 text-orange-500 font-bold px-6 py-2 rounded-lg hover:bg-orange-50 transition" onClick={() => navigate(`/trip/${trip._id}`)}>View Details</button>
                </div>
                <div className="mt-4 bg-green-50 text-green-700 text-xs rounded-lg px-3 py-2 flex items-center gap-2">
                  <span>No Cost EMI Starts from</span>
                  <span className="font-bold">₹ {trip.emi || '5,507'}</span>
                  <span className="text-blue-500 underline cursor-pointer">See option</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllTrips; 