import React, { useEffect, useState } from "react";
import { useNavigate, Routes, Route, Navigate } from "react-router-dom";
import apiService from "../../services/api.service";
import AllTrips from "./AllTrips";
import BookedTrips from "./BookedTrips";
import TravellerAccount from "./TravellerAccount";
import TravellerGroupChat from "./TravellerGroupChat";

// Updated Traveler Sidebar Component (Library System Style)
const TravellerSidebar = () => {
  const navigate = useNavigate();
  const navItems = [
    { label: "Dashboard", icon: "\uD83D\uDCC8", path: "." },
    { label: "All Trips", icon: "\uD83D\uDEEB", path: "all-trips" },
    { label: "Booked Trips", icon: "\uD83D\uDCB0", path: "booked-trips" },
    { label: "My Account", icon: "\uD83D\uDC64", path: "profile" },
    { label: "Group Chat", icon: "\uD83D\uDCAC", path: "group-chat" },
  ];
  return (
    <div className="bg-[#3B2F8C] min-h-screen w-[240px] flex flex-col py-8 px-4 gap-2 shadow-xl">
      <div className="text-white text-2xl font-extrabold mb-10 ml-2 tracking-wide">Travel Buddy</div>
      {navItems.map((item, idx) => (
        <button
          key={item.label}
          className={`flex items-center gap-3 w-full text-left px-5 py-3 rounded-lg text-lg font-semibold mb-1 transition-all duration-150 hover:bg-[#5546B6] text-white ${window.location.pathname.endsWith(item.path) ? 'bg-[#5546B6]' : ''}`}
          onClick={() => navigate(item.path)}
        >
          <span className="text-2xl">{item.icon}</span> {item.label}
        </button>
      ))}
    </div>
  );
};

const travelStyles = [
  {
    title: "\uD83D\uDE97 Small Group Experience",
    subtitle: "6-10 People | 2-3 Days",
    description: [
      "Perfect for intimate bonding and close-knit friendships. Travel in comfortable vans with a select group of adventurers.",
      "Intimate group setting",
      "Quick weekend getaways",
      "Van transportation",
      "Perfect for introverts",
    ],
    button: "Choose Small Group",
    bg: "from-blue-100 to-white",
    cta: "/destinations?group=small",
  },
  {
    title: "\uD83D\uDE8C Large Group Experience",
    subtitle: "25-30 People | 4-7 Days",
    description: [
      "Join a vibrant community of travelers for extended adventures. Perfect for social butterflies who love meeting new people.",
      "Social party atmosphere",
      "Extended travel experiences",
      "Luxury bus transportation",
      "Perfect for extroverts",
    ],
    button: "Choose Large Group",
    bg: "from-orange-100 to-white",
    cta: "/destinations?group=large",
  },
];

const destinations = [
  {
    emoji: "\uD83C\uDFD6\uFE0F",
    name: "Goa Beach Paradise",
    desc: "Sun, sand, and endless fun with beach parties, water sports, and vibrant nightlife.",
    filled: 25,
    total: 28,
    cta: "/package/goa-beach-paradise",
  },
  {
    emoji: "\u26F0\uFE0F",
    name: "Manali Adventure",
    desc: "Mountain adventures with trekking, paragliding, and breathtaking Himalayan views.",
    filled: 6,
    total: 10,
    cta: "/package/manali-adventure",
  },
  {
    emoji: "\uD83D\uDE4F",
    name: "Rishikesh Spiritual",
    desc: "Yoga, meditation, and spiritual awakening by the holy Ganges river.",
    filled: 9,
    total: 10,
    cta: "/package/rishikesh-spiritual",
  },
  {
    emoji: "\uD83C\uDFDB\uFE0F",
    name: "Rajasthan Heritage",
    desc: "Explore royal palaces, desert safaris, and vibrant culture in Rajasthan.",
    filled: 12,
    total: 20,
    cta: "/package/rajasthan-heritage",
  },
];

const stats = [
  { label: "Happy Travelers", value: "5,000+" },
  { label: "Destinations", value: "50+" },
  { label: "User Rating", value: "4.8 \u2B50" },
];

const TravellerDashboard = () => {
  const navigate = useNavigate();
  const [availableTrips, setAvailableTrips] = useState(0);
  const [bookedTrips, setBookedTrips] = useState(0);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const res = await apiService.trips.getAllTrips();
        setAvailableTrips(res.data.length);
      } catch (err) {
        setAvailableTrips(0);
      }
    };
    const fetchBookedTrips = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (userId) {
          const res = await apiService.bookings.getUserBookings(userId);
          setBookedTrips(res.data.length);
        } else {
          setBookedTrips(0);
        }
      } catch (err) {
        setBookedTrips(0);
      }
    };
    fetchTrips();
    fetchBookedTrips();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/'); // Redirect to landing page after logout
  };
  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold mb-1 text-[#3B2F8C]">Hello, Traveler!</h1>
          <div className="text-gray-500 text-lg">{new Date().toLocaleDateString()} | {new Date().toLocaleTimeString()}</div>
        </div>
        <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white font-bold px-6 py-2 rounded-lg text-lg shadow">Logout</button>
      </div>
      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div className="bg-white rounded-xl shadow p-8 flex flex-col items-center">
          <span className="text-4xl mb-2 text-green-600">🧳</span>
          <div className="text-xl font-bold mb-1">Available Trips</div>
          <div className="text-3xl font-extrabold">{availableTrips}</div>
        </div>
        <div className="bg-white rounded-xl shadow p-8 flex flex-col items-center">
          <span className="text-4xl mb-2 text-purple-500">📑</span>
          <div className="text-xl font-bold mb-1">Booked Trips</div>
          <div className="text-3xl font-extrabold">{bookedTrips}</div>
        </div>
      </div>
      {/* Info Card */}
      <div className="bg-white rounded-xl shadow p-8">
        <div className="text-2xl font-bold mb-2 text-[#3B2F8C]">Travel Buddy Support</div>
        <div className="text-gray-700 mb-1">For any help, contact us at <span className="font-semibold">support@travelbuddy.com</span></div>
        <div className="text-gray-700">Happy Travels! 🌍</div>
      </div>
    </>
  );
};

const TravellerHome = () => {
  return (
    <div className="flex min-h-screen bg-[#F5F6FA]">
      {/* Sidebar */}
      <TravellerSidebar />
      {/* Main Content with Routing */}
      <div className="flex-1 flex flex-col p-10">
        <Routes>
          <Route path="/" element={<TravellerDashboard />} />
          <Route path="all-trips" element={<AllTrips />} />
          <Route path="booked-trips" element={<BookedTrips />} />
          <Route path="profile" element={<TravellerAccount />} />
          <Route path="group-chat" element={<TravellerGroupChat />} />
          <Route path="*" element={<Navigate to="." />} />
        </Routes>
      </div>
    </div>
  );
};

export default TravellerHome;