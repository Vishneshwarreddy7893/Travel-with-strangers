import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white text-lg md:text-xl">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-10 md:px-32 py-20 bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-lg rounded-b-3xl min-h-[420px]">
        <div className="flex-1 mb-16 md:mb-0">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-8">Welcome to <span className="text-yellow-300">Travel Buddy</span></h1>
          <p className="text-2xl md:text-3xl mb-10">Never Travel Alone Again – Find Your Next Adventure Buddy!</p>
          <button className="bg-yellow-300 hover:bg-yellow-400 text-blue-900 font-bold px-12 py-5 rounded-2xl shadow-lg text-2xl transition" onClick={() => {
            document.getElementById('role-section').scrollIntoView({ behavior: 'smooth' });
          }}>Get Started</button>
        </div>
        <div className="flex-1 flex justify-center">
          <img className="rounded-3xl shadow-2xl w-[480px] h-[320px] object-cover" src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80" alt="Travel" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-10 md:px-32">
        <h2 className="text-3xl font-extrabold text-center mb-16 text-blue-700">Why Travel Buddy?</h2>
        <div className="flex flex-col md:flex-row gap-14 justify-center">
          <div className="flex-1 bg-white rounded-2xl shadow-xl p-14 flex flex-col items-center text-xl min-w-[320px] min-h-[180px]">
            <span className="text-7xl mb-6">🧑‍🤝‍🧑</span>
            <h3 className="font-bold text-2xl mb-3">Group Travel Experiences</h3>
            <p className="text-center text-gray-600">Join small or large groups and make new friends on every trip.</p>
          </div>
          <div className="flex-1 bg-white rounded-2xl shadow-xl p-14 flex flex-col items-center text-xl min-w-[320px] min-h-[180px]">
            <span className="text-7xl mb-6">🎒</span>
            <h3 className="font-bold text-2xl mb-3">All-Inclusive Packages</h3>
            <p className="text-center text-gray-600">One payment covers travel, stay, meals, and activities.</p>
          </div>
          <div className="flex-1 bg-white rounded-2xl shadow-xl p-14 flex flex-col items-center text-xl min-w-[320px] min-h-[180px]">
            <span className="text-7xl mb-6">⏱️</span>
            <h3 className="font-bold text-2xl mb-3">Real-Time Group Matching</h3>
            <p className="text-center text-gray-600">See live seat availability and join trips instantly.</p>
          </div>
        </div>
      </section>

      {/* Choose Your Role Section */}
      <section className="py-16 px-10 md:px-32 bg-blue-50" id="role-section">
        <h2 className="text-3xl font-extrabold text-center mb-10 text-blue-700">Choose Your Role</h2>
        <p className="text-center mb-14 text-xl text-gray-700">Select how you'd like to access Travel Buddy</p>
        <div className="flex flex-col md:flex-row gap-14 justify-center">
          <div className="flex-1 bg-white rounded-2xl shadow-xl p-14 flex flex-col items-center border-4 border-blue-200 hover:border-blue-400 transition min-w-[320px] min-h-[180px] text-xl">
            <span className="text-7xl mb-6">🧑</span>
            <h3 className="font-bold text-2xl mb-3">Traveler</h3>
            <p className="text-center text-gray-600 mb-8">Find and join group trips, manage your bookings, and connect with fellow travelers.</p>
            <div className="flex gap-8">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-10 py-4 rounded-lg text-xl font-semibold" onClick={() => navigate('/login')}>Login</button>
              <button className="bg-yellow-300 hover:bg-yellow-400 text-blue-900 px-10 py-4 rounded-lg text-xl font-semibold" onClick={() => navigate('/traveler-register')}>Sign Up</button>
            </div>
          </div>
          <div className="flex-1 bg-white rounded-2xl shadow-xl p-14 flex flex-col items-center border-4 border-blue-200 hover:border-blue-400 transition min-w-[320px] min-h-[180px] text-xl">
            <span className="text-7xl mb-6">🛠️</span>
            <h3 className="font-bold text-2xl mb-3">Admin</h3>
            <p className="text-center text-gray-600 mb-8">Manage trips, bookings, and users. Oversee all platform operations.</p>
            <div className="flex gap-8">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-10 py-4 rounded-lg text-xl font-semibold" onClick={() => navigate('/login?role=admin')}>Login</button>
              <button className="bg-yellow-300 hover:bg-yellow-400 text-blue-900 px-10 py-4 rounded-lg text-xl font-semibold" onClick={() => navigate('/admin-register')}>Sign Up</button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-10 md:px-32">
        <h2 className="text-3xl font-extrabold text-center mb-10 text-blue-700">About Travel Buddy</h2>
        <p className="text-center text-xl text-gray-700 max-w-4xl mx-auto">
          Travel Buddy connects solo travelers with like-minded companions for unforgettable group adventures. Our mission is to make travel accessible, social, and memorable for everyone. Join us and turn strangers into lifelong friends!
        </p>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-10 mt-auto text-xl">
        <div className="flex flex-col md:flex-row justify-between items-center px-10 md:px-32">
          <div className="mb-6 md:mb-0">
            <strong>Contact:</strong> vishneshwarreddynandyala@gmail.com | 9876543210
          </div>
          <div>
            <a href="#about" className="underline hover:text-yellow-300">About</a>
          </div>
        </div>
        <div className="text-center mt-8 text-lg text-blue-200">
          &copy; {new Date().getFullYear()} Travel Buddy. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage; 