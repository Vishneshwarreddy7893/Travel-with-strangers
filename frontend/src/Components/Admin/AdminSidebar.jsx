import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const navItems = [
  { name: "Dashboard", path: ".", icon: "🏠" },
  { name: "Trip Packages", path: "trip-packages", icon: "🧳" },
  { name: "Trip Management", path: "trip-management", icon: "📝" },
  { name: "Bookings", path: "bookings", icon: "📑" },
  { name: "Users", path: "users", icon: "👥" },
  { name: "Analytics", path: "analytics", icon: "📊" },
  { name: "Notifications", path: "notifications", icon: "🔔" },
];

const AdminSidebar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/'); // Redirect to landing page after logout
  };
  return (
    <aside className="bg-blue-900 text-white w-64 min-h-screen flex flex-col py-8 px-4">
      <div className="flex items-center mb-10">
        <span className="text-3xl mr-2">🛠️</span>
        <span className="text-2xl font-bold tracking-wide">TravelBuddy Admin</span>
      </div>
      {/* Profile Section */}
      <div className="flex flex-col items-center mb-6">
        <div className="w-16 h-16 rounded-full bg-blue-700 flex items-center justify-center text-3xl font-bold mb-2 border-4 border-blue-800 shadow">A</div>
        <div className="font-semibold text-lg">Admin</div>
        <div className="text-xs text-blue-200 mb-2">admin@travelbuddy.com</div>
        <button onClick={handleLogout} className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded flex items-center justify-center gap-2 mt-2">
          <span className="text-xl">🚪</span> Logout
        </button>
      </div>
      <nav className="flex-1">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === "."}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition font-medium text-lg hover:bg-blue-800 ${isActive ? "bg-blue-800" : ""}`
            }
          >
            <span className="text-xl">{item.icon}</span>
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidebar; 