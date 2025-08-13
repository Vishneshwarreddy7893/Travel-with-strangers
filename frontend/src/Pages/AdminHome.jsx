import React from "react";
import AdminSidebar from "../../Components/Admin/AdminSidebar";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
// import other admin pages here

const AdminHome = () => (
  <div className="flex min-h-screen">
    <AdminSidebar />
    <div className="flex-1 bg-gray-50">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        {/* Add other admin routes here */}
        {/* <Route path="trip-packages" element={<TripPackages />} /> */}
        {/* ... */}
        <Route path="*" element={<Navigate to="/admin-home" />} />
      </Routes>
    </div>
  </div>
);

export default AdminHome;