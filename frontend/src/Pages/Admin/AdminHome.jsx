import React from "react";
import AdminSidebar from "../../Components/Admin/AdminSidebar";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import TripPackages from "./TripPackages";
import TripManagement from "./TripManagement";
import Bookings from "./Bookings";
import Users from "./Users";
import Analytics from "./Analytics";
import Notifications from "./Notifications";

const AdminHome = () => (
  <div className="flex min-h-screen">
    <AdminSidebar />
    <div className="flex-1 bg-gray-50">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="trip-packages" element={<TripPackages />} />
        <Route path="trip-management" element={<TripManagement />} />
        <Route path="bookings" element={<Bookings />} />
        <Route path="users" element={<Users />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="*" element={<Navigate to="/admin-home" />} />
      </Routes>
    </div>
  </div>
);

export default AdminHome; 