import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiService from "../services/api.service";

const icons = {
  hotel: "🏨",
  sightseeing: "🔭",
  transfer: "🚗",
  meal: "🍽️",
  flight: "✈️",
};

const tabList = [
  { key: 'overview', label: 'Overview' },
  { key: 'itinerary', label: 'Day wise Itinerary' },
  { key: 'inclusions', label: 'Inclusion/Exclusions' },
  { key: 'additional', label: 'Additional Info' },
];

const TripDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState('overview');
  const [openItinerary, setOpenItinerary] = useState(null);
  // Add separate state for inclusions/exclusions accordion
  const [openInclusions, setOpenInclusions] = useState(false);
  const [openExclusions, setOpenExclusions] = useState(false);

  useEffect(() => {
    const fetchTrip = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await apiService.trips.getTrip(id);
        setTrip(res.data);
      } catch (err) {
        setError("Failed to fetch trip details");
      } finally {
        setLoading(false);
      }
    };
    fetchTrip();
  }, [id]);

  if (loading) return <div className="p-10 text-lg text-gray-600">Loading trip details...</div>;
  if (error) return <div className="p-10 text-red-500 font-semibold">{error}</div>;
  if (!trip) return null;

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Title and Main Image */}
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <div className="flex-1">
          <img src={trip.imageUrl || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80'} alt={trip.destination} className="rounded-2xl w-full h-80 object-cover shadow-lg" />
        </div>
        <div className="flex-1 flex flex-col gap-4">
          <div>
            <h1 className="text-3xl font-extrabold mb-2 text-[#3B2F8C]">{trip.destination} {trip.title ? `- ${trip.title}` : ''}</h1>
            <div className="text-lg text-gray-600 mb-2">{trip.duration}</div>
            <div className="flex gap-3 text-2xl mb-2">
              {trip.includes?.flight && <span title="Flight">{icons.flight}</span>}
              {trip.includes?.hotel && <span title="Hotel">{icons.hotel}</span>}
              {trip.includes?.sightseeing && <span title="Sightseeing">{icons.sightseeing}</span>}
              {trip.includes?.transfer && <span title="Transfer">{icons.transfer}</span>}
              {trip.includes?.meal && <span title="Meal">{icons.meal}</span>}
            </div>
          </div>
          <div className="bg-blue-50 rounded-xl p-4 flex flex-col gap-2">
            <div className="text-xs text-gray-400 line-through">₹ {trip.oldPrice || '28,999'}</div>
            <div className="text-3xl font-bold text-green-700">₹ {trip.price || '24,299'} <span className="text-base font-normal text-gray-600">Per Person</span></div>
            {/* Group Size replaces EMI */}
            <div className="text-xs text-purple-700 font-semibold flex items-center gap-2">
              <span className="bg-purple-100 px-2 py-1 rounded-full">👥 Group Size:</span>
              <span className="font-bold text-purple-900">{trip.groupType || 'N/A'}</span>
            </div>
            <button className="mt-2 border border-blue-400 text-blue-500 font-bold px-6 py-2 rounded-lg hover:bg-blue-50 transition" onClick={() => navigate(`/payment/${id}`)}>BOOK NOW</button>
          </div>
          <div className="bg-white rounded-xl p-4 shadow flex flex-col gap-2">
            <div className="flex gap-4 items-center">
              <span className="text-pink-600">📍</span>
              <span className="font-semibold">Places to Visit:</span>
              <span className="text-gray-800">{trip.placesVisiting || trip.destination}</span>
            </div>
            <div className="flex gap-4 items-center">
              <span className="text-rose-600">⏰</span>
              <span className="font-semibold">Duration:</span>
              <span>{trip.duration}</span>
            </div>
          </div>
        </div>
      </div>
      {/* Tabs */}
      <div className="flex gap-6 border-b mb-6">
        {tabList.map(tab => (
          <button
            key={tab.key}
            className={`px-4 py-2 font-bold ${activeTab === tab.key ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-[#3B2F8C]">Package Overview</h2>
          <div className="text-gray-700 text-lg mb-4">{trip.description}</div>
          {trip.dates && Array.isArray(trip.dates) && trip.dates.length > 0 && (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-blue-50 rounded-lg">
                <thead>
                  <tr>
                    {trip.dates[0] && Object.keys(trip.dates[0]).map((month) => (
                      <th key={month} className="px-4 py-2 text-blue-700 font-bold">{month}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {trip.dates.map((row, idx) => (
                    <tr key={idx}>
                      {Object.values(row).map((date, i) => (
                        <td key={i} className="px-4 py-2 text-center">{date}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
      {activeTab === 'itinerary' && trip.itinerary && Array.isArray(trip.itinerary) && trip.itinerary.length > 0 && (
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-[#3B2F8C]">Day wise Itinerary</h2>
          <div className="flex flex-col gap-6">
            {trip.itinerary.map((day, idx) => (
              <div key={idx} className="flex gap-4 items-start">
                <div className="bg-blue-200 text-blue-800 font-bold rounded-full w-14 h-14 flex items-center justify-center text-lg cursor-pointer" onClick={() => setOpenItinerary(openItinerary === idx ? null : idx)}>
                  Day {idx + 1}
                </div>
                <div className={`flex-1 bg-blue-50 rounded-xl p-4 transition-all duration-300 ${openItinerary === idx ? '' : 'opacity-60 max-h-12 overflow-hidden'}`}> 
                  <div className="mb-1"><span className="font-semibold text-blue-900">Morning:</span> <span className="text-gray-700">{day.morning || '-'}</span></div>
                  <div className="mb-1"><span className="font-semibold text-blue-900">Afternoon:</span> <span className="text-gray-700">{day.afternoon || '-'}</span></div>
                  <div className="mb-1"><span className="font-semibold text-blue-900">Evening:</span> <span className="text-gray-700">{day.evening || '-'}</span></div>
                  <div><span className="font-semibold text-blue-900">Accommodation:</span> <span className="text-gray-700">{day.accommodation || '-'}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {activeTab === 'inclusions' && (
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-[#3B2F8C]">Package Includes</h2>
          <div className="flex gap-6 text-2xl mb-4">
            {trip.includes?.flight && <span title="Flight">{icons.flight}</span>}
            {trip.includes?.hotel && <span title="Hotel">{icons.hotel}</span>}
            {trip.includes?.sightseeing && <span title="Sightseeing">{icons.sightseeing}</span>}
            {trip.includes?.transfer && <span title="Transfer">{icons.transfer}</span>}
            {trip.includes?.meal && <span title="Meal">{icons.meal}</span>}
          </div>
          {/* Expenses Breakdown */}
          {trip.expenses && (
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-2 text-blue-800">Expense Breakdown</h3>
              <ul className="list-disc ml-6 text-blue-900">
                <li>Transport: ₹{trip.expenses.transport}</li>
                <li>Accommodation: ₹{trip.expenses.accommodation}</li>
                <li>Food: ₹{trip.expenses.food}</li>
                <li>Activities: ₹{trip.expenses.activities}</li>
                <li>Service: ₹{trip.expenses.service}</li>
                <li>Profit: ₹{trip.expenses.profit}</li>
              </ul>
            </div>
          )}
          {/* Interactive Inclusions/Exclusions Accordions */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Inclusions Accordion */}
            <div className="flex-1">
              <button
                className={`w-full text-left font-semibold text-green-700 bg-green-50 px-4 py-2 rounded-t-lg border-b-2 border-green-200 focus:outline-none flex items-center justify-between`}
                onClick={() => setOpenInclusions(!openInclusions)}
              >
                <span>✅ Inclusions</span>
                <span>{openInclusions ? '▲' : '▼'}</span>
              </button>
              <div className={`transition-all duration-300 bg-green-50 px-4 py-2 rounded-b-lg ${openInclusions ? 'block' : 'hidden'}`}> 
                {Array.isArray(trip.inclusions)
                  ? <ul className="list-disc ml-6 text-green-800">{trip.inclusions.map((inc, i) => <li key={i}>{inc}</li>)}</ul>
                  : <div className="text-green-800">{trip.inclusions}</div>}
              </div>
            </div>
            {/* Exclusions Accordion */}
            <div className="flex-1">
              <button
                className={`w-full text-left font-semibold text-red-700 bg-red-50 px-4 py-2 rounded-t-lg border-b-2 border-red-200 focus:outline-none flex items-center justify-between`}
                onClick={() => setOpenExclusions(!openExclusions)}
              >
                <span>❌ Exclusions</span>
                <span>{openExclusions ? '▲' : '▼'}</span>
              </button>
              <div className={`transition-all duration-300 bg-red-50 px-4 py-2 rounded-b-lg ${openExclusions ? 'block' : 'hidden'}`}> 
                {Array.isArray(trip.exclusions)
                  ? <ul className="list-disc ml-6 text-red-800">{trip.exclusions.map((exc, i) => <li key={i}>{exc}</li>)}</ul>
                  : <div className="text-red-800">{trip.exclusions}</div>}
              </div>
            </div>
          </div>
          {/* Group & Vehicle Details */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-blue-100 rounded-lg p-4 border border-blue-200">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <span className="text-3xl">👥</span>
                <span className="font-semibold text-blue-900">Group Type:</span>
                <span className="bg-blue-200 text-blue-900 px-3 py-1 rounded-full font-bold ml-2">{trip.groupType}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-3xl">📅</span>
                <span className="font-semibold text-blue-900">Departure Date:</span>
                <span className="bg-blue-200 text-blue-900 px-3 py-1 rounded-full font-bold ml-2">{trip.date}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-3xl">🏨</span>
                <span className="font-semibold text-blue-900">Hotel:</span>
                <span className="bg-blue-200 text-blue-900 px-3 py-1 rounded-full font-bold ml-2">{trip.hotelName || 'TBA'}</span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🚌</span>
                <span className="font-semibold text-blue-900">Vehicle Type:</span>
                <span className="bg-blue-200 text-blue-900 px-3 py-1 rounded-full font-bold ml-2">{trip.vehicleType || 'Sumo/Van/Bus'}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-3xl">🛣️</span>
                <span className="font-semibold text-blue-900">Route:</span>
                <span className="bg-blue-200 text-blue-900 px-3 py-1 rounded-full font-bold ml-2">{trip.route || 'TBA'}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-3xl">✨</span>
                <span className="font-semibold text-blue-900">Vehicle Features:</span>
                <span className="bg-blue-200 text-blue-900 px-3 py-1 rounded-full font-bold ml-2">{trip.vehicleFeatures || 'AC, Music, Charging'}</span>
              </div>
            </div>
          </div>
        </div>
      )}
      {activeTab === 'additional' && (
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-[#3B2F8C]">Additional Information</h2>
          <div className="mb-4">
            <div className="font-semibold">Bus Driver Details:</div>
            <div>Name: {trip.busDriverName || 'To be assigned'}</div>
            <div>Contact: {trip.busDriverContact || 'To be shared on confirmation'}</div>
            <div>Experience: {trip.busDriverExperience || '5+ years'}</div>
          </div>
          <div className="mb-4">
            <div className="font-semibold">Project Description:</div>
            <div>Travel with Strangers is a platform for solo travelers to join group trips, make new friends, and explore together. Book your spot, connect with your group, and enjoy a hassle-free, all-inclusive travel experience!</div>
          </div>
          <div className="mb-4">
            <div className="font-semibold">Booking Capacity:</div>
            <div>Total Seats: {trip.totalSeats || 'N/A'}</div>
            <div>Seats Left: {typeof trip.seatsLeft !== 'undefined' && trip.totalSeats ? `${trip.seatsLeft}/${trip.totalSeats}` : 'N/A'}</div>
          </div>
        </div>
      )}
      {/* Contact Section */}
      <div className="bg-gray-50 rounded-xl shadow p-6 flex flex-col md:flex-row gap-6 items-center">
        <div className="flex-1 flex flex-col gap-2">
          <div className="font-bold text-lg text-gray-700">Need Help?</div>
          <div className="text-gray-600">Call us : <span className="font-semibold">011-43030303 | 43131313</span></div>
          <div className="text-gray-600">Mail us : <span className="font-semibold">Holidays@travelbuddy.com</span></div>
        </div>
      </div>
    </div>
  );
};

export default TripDetails;