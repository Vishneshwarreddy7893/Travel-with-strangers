import React, { useEffect, useState } from "react";
import apiService from "../../services/api.service";

const Dashboard = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  const totalTrips = trips.length;
  const totalRevenue = trips.reduce((sum, trip) => sum + (Number(trip.price) || 0), 0);
  const recentTrips = trips.slice(0, 3);

  const now = new Date();
  const dateStr = now.toLocaleDateString();
  const timeStr = now.toLocaleTimeString();

  return (
    <div className="flex-1 p-10 bg-gray-50 min-h-screen h-screen flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold mb-1 text-blue-900">Admin Dashboard</h1>
          <div className="text-gray-600 text-lg">{dateStr} | {timeStr}</div>
        </div>
      </div>
      {loading ? (
        <div className="text-lg text-gray-600">Loading dashboard...</div>
      ) : error ? (
        <div className="text-red-500 font-semibold">{error}</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <div className="bg-white rounded-xl shadow p-8 flex flex-col items-center">
              <span className="text-4xl mb-2">🧳</span>
              <div className="text-2xl font-bold mb-1">{totalTrips}</div>
              <div className="text-gray-600 text-lg">Total Trips</div>
            </div>
            <div className="bg-white rounded-xl shadow p-8 flex flex-col items-center">
              <span className="text-4xl mb-2">💰</span>
              <div className="text-2xl font-bold mb-1">₹{totalRevenue.toLocaleString()}</div>
              <div className="text-gray-600 text-lg">Revenue</div>
            </div>
            {/* You can add more stats here if needed */}
          </div>
          <div className="bg-white rounded-xl shadow p-8">
            <h2 className="text-xl font-bold mb-4 text-blue-900">Recent Activities</h2>
            <ul>
              {recentTrips.length === 0 ? (
                <li className="text-gray-500">No recent trips.</li>
              ) : (
                recentTrips.map((trip, idx) => (
                  <li key={trip._id || idx} className="mb-3 flex justify-between items-center border-b pb-2 last:border-b-0 last:pb-0">
                    <div>
                      <span className="font-semibold text-blue-700">Trip Added</span> - {trip.destination}
                    </div>
                    <span className="text-gray-500 text-sm">{new Date(trip.createdAt).toLocaleString()}</span>
                  </li>
                ))
              )}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;