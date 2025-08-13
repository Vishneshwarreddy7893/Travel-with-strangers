import React from "react";

const Analytics = () => (
  <div className="p-10 min-h-screen h-screen bg-gray-50 flex flex-col">
    <h1 className="text-2xl font-bold text-blue-900 mb-6">Analytics Dashboard</h1>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
      <div className="bg-white rounded-xl shadow p-8 flex flex-col items-center">
        <span className="text-4xl mb-2">📈</span>
        <div className="text-2xl font-bold mb-1">Bookings Trend</div>
        <div className="text-gray-600 text-lg">[Chart Placeholder]</div>
      </div>
      <div className="bg-white rounded-xl shadow p-8 flex flex-col items-center">
        <span className="text-4xl mb-2">💸</span>
        <div className="text-2xl font-bold mb-1">Revenue</div>
        <div className="text-gray-600 text-lg">[Chart Placeholder]</div>
      </div>
      <div className="bg-white rounded-xl shadow p-8 flex flex-col items-center">
        <span className="text-4xl mb-2">👥</span>
        <div className="text-2xl font-bold mb-1">User Activity</div>
        <div className="text-gray-600 text-lg">[Chart Placeholder]</div>
      </div>
    </div>
  </div>
);

export default Analytics; 