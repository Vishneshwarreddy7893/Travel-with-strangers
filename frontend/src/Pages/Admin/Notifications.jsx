import React from "react";

const sampleNotifications = [
  { id: 1, message: "New booking for Goa Beach Paradise", time: "2 min ago", type: "booking" },
  { id: 2, message: "Trip package updated: Manali Snow Trek", time: "1 hour ago", type: "trip" },
  { id: 3, message: "Payment received from Sarah Khan", time: "3 hours ago", type: "payment" },
];

const Notifications = () => (
  <div className="p-10 min-h-screen h-screen bg-gray-50 flex flex-col">
    <h1 className="text-2xl font-bold text-blue-900 mb-6">Notifications</h1>
    <div className="bg-white rounded-xl shadow p-8">
      <ul>
        {sampleNotifications.map((n) => (
          <li key={n.id} className="mb-4 flex justify-between items-center border-b pb-2 last:border-b-0 last:pb-0">
            <div>
              <span className="font-semibold text-blue-700 mr-2">{n.type === "booking" ? "📑" : n.type === "trip" ? "🧳" : "💸"}</span>
              {n.message}
            </div>
            <span className="text-gray-500 text-sm">{n.time}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default Notifications; 