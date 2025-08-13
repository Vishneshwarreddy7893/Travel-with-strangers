import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';
import apiService from '../services/api.service';

const TravellerRegister = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    interests: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      await apiService.auth.register({
        ...form,
        role: "traveler",
      });
      setSuccess(true);
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-lg flex flex-col items-center">
        <div className="bg-blue-100 rounded-full p-4 mb-6">
          <span className="text-4xl">🌍</span>
        </div>
        <h2 className="text-3xl font-extrabold mb-2 text-center">Traveler Registration</h2>
        <p className="text-lg text-gray-600 mb-8 text-center">Join the Travel Buddy community as a traveler</p>
        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
        {success && <div className="text-green-600 mb-4 text-center">Registration successful! Redirecting to login...</div>}
        <form className="w-full flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="flex gap-4">
            <input type="text" name="firstName" placeholder="First Name" required className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg" value={form.firstName} onChange={handleChange} />
            <input type="text" name="lastName" placeholder="Last Name" required className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg" value={form.lastName} onChange={handleChange} />
          </div>
          <input type="email" name="email" placeholder="Email" required className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg" value={form.email} onChange={handleChange} />
          <input type="tel" name="phone" placeholder="Phone Number" required className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg" value={form.phone} onChange={handleChange} />
          <input type="text" name="interests" placeholder="Interests (optional)" className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg" value={form.interests} onChange={handleChange} />
          <input type="password" name="password" placeholder="Password" required className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg" value={form.password} onChange={handleChange} />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" required className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg" value={form.confirmPassword} onChange={handleChange} />
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg text-lg mt-2" disabled={loading}>{loading ? "Creating..." : "Create Account"}</button>
        </form>
        <div className="mt-4 w-full flex flex-col items-center">
          <GoogleLogin
            onSuccess={async credentialResponse => {
              setError("");
              try {
                await apiService.auth.googleAuth({ credential: credentialResponse.credential, role: "traveler" });
                setSuccess(true);
                setTimeout(() => navigate("/login"), 1500);
              } catch (err) {
                setError("Google registration failed. Please use a valid Google account.");
              }
            }}
            onError={() => setError("Google registration failed. Please try again.")}
          />
        </div>
        <p className="mt-6 text-gray-600 text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 font-semibold hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default TravellerRegister;