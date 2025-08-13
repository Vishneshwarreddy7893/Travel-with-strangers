import React, { useState, useRef, useEffect } from "react";

const mockTripInfo = {
  title: "Goa Beach Paradise",
  departure: "December 15, 2024 at 6:00 AM",
  meetingPoint: "Dadar Railway Station, Platform 1",
  groupMembers: 28,
  totalMembers: 28,
  coordinator: { name: "Rahul Sharma", phone: "+91 9876543210" },
};

const mockMessages = [
  { sender: "Rahul (Coordinator)", text: "Welcome everyone to Goa Beach Paradise trip! 🎉 Please confirm your attendance and share your WhatsApp number.", type: "coordinator" },
  { sender: "Priya", text: "Hi everyone! Super excited for this trip. Coming from Andheri, anyone else from West Mumbai?", type: "user" },
  { sender: "Amit", text: "Can someone share the packing list? First time on a group trip! 🧳", type: "user" },
  { sender: "Rahul (Coordinator)", text: "@Amit Here's the packing list: - Comfortable clothes for 4 days", type: "coordinator" },
  { sender: "You", text: "Hey! I'm Sarah from Bandra. We can travel together to the meeting point if you want!", type: "self" },
];

const mockMembers = [
  { name: "Rahul Sharma", role: "Trip Coordinator", city: "-", isSelf: false },
  { name: "Priya Patel", role: "", city: "Mumbai", isSelf: false },
  { name: "Amit Gupta", role: "", city: "Pune", isSelf: false },
  { name: "You (Sarah Johnson)", role: "", city: "Mumbai", isSelf: true },
];

const TravellerGroupChat = () => {
  const [messages, setMessages] = useState(mockMessages);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { sender: "You", text: input, type: "self" }]);
    setInput("");
  };

  return (
    <div className="p-10 min-h-screen bg-gray-50">
      <h2 className="text-3xl font-extrabold text-[#3B2F8C] mb-6">Group Chat - {mockTripInfo.title}</h2>
      {/* Trip Info */}
      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <div className="font-bold text-lg mb-2">Trip Information</div>
        <div className="text-gray-700 mb-1">Departure: <span className="font-semibold">{mockTripInfo.departure}</span></div>
        <div className="text-gray-700 mb-1">Meeting Point: <span className="font-semibold">{mockTripInfo.meetingPoint}</span></div>
        <div className="text-gray-700 mb-1">Group Members: <span className="font-semibold">{mockTripInfo.groupMembers}/{mockTripInfo.totalMembers}</span></div>
        <div className="text-gray-700">Trip Coordinator: <span className="font-semibold">{mockTripInfo.coordinator.name} ({mockTripInfo.coordinator.phone})</span></div>
      </div>
      {/* Messages */}
      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <div className="font-bold text-lg mb-4">Recent Messages</div>
        <div className="flex flex-col gap-3 mb-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.type === "self" ? "justify-end" : "justify-start"}`}> 
              <div className={`px-4 py-2 rounded-lg text-base max-w-xl ${msg.type === "self" ? "bg-[#3B2F8C] text-white" : msg.type === "coordinator" ? "bg-blue-50 text-blue-900 font-semibold" : "bg-gray-100 text-gray-800"}`}> 
                <span className={msg.type === "coordinator" ? "text-blue-700 font-bold" : msg.type === "self" ? "font-bold" : "font-semibold text-purple-700"}>{msg.sender}{msg.type === "coordinator" ? ": " : msg.type === "self" ? ": " : ": "}</span>{msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form className="flex gap-3" onSubmit={handleSend}>
          <input
            type="text"
            className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
            placeholder="Type your message..."
            value={input}
            onChange={e => setInput(e.target.value)}
          />
          <button type="submit" className="bg-[#3B2F8C] hover:bg-[#5546B6] text-white font-bold px-8 py-3 rounded-lg text-lg">Send</button>
        </form>
      </div>
      {/* Group Members */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="font-bold text-lg mb-4">Group Members ({mockMembers.length})</div>
        <div className="flex flex-wrap gap-4 mb-4">
          {mockMembers.map((member, idx) => (
            <div key={idx} className={`px-5 py-3 rounded-lg font-semibold text-base ${member.isSelf ? "bg-purple-200 text-purple-900" : member.role ? "bg-blue-200 text-blue-900" : "bg-gray-100 text-gray-800"}`}>
              {member.name} {member.role && <span className="text-xs font-normal ml-2">{member.role}</span>}
              {member.city && <span className="text-xs font-normal ml-2">{member.city}</span>}
            </div>
          ))}
        </div>
        <button className="bg-blue-100 hover:bg-blue-200 text-blue-900 font-bold px-6 py-2 rounded-lg">View All Members</button>
      </div>
    </div>
  );
};

export default TravellerGroupChat; 