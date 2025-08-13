import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';
import apiService from '../services/api.service';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAdminLogin = new URLSearchParams(location.search).get("role") === "admin";
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [googleEmails, setGoogleEmails] = useState([]);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await apiService.auth.login(form);
      localStorage.setItem("user", JSON.stringify(res.data));
      localStorage.setItem("userId", res.data._id);
      if (isAdminLogin) {
        if (res.data.role === "admin") {
          navigate("/admin-home");
        } else {
          setError("You are not an admin. Please use the traveler login.");
        }
      } else {
        if (res.data.role === "traveler") {
          navigate("/traveller-home");
        } else {
          setError("You are not a traveler. Please use the admin login.");
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // Google Login logic
  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    setShowGoogleModal(true);
    setError("");
    try {
      const res = await apiService.auth.getAllUsers();
      const users = res.data.filter(u => u.role === (isAdminLogin ? "admin" : "traveler"));
      setGoogleEmails(users.map(u => u.email));
    } catch (err) {
      setError("Failed to fetch Google accounts");
      setGoogleEmails([]);
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleGoogleSelect = async (email) => {
    setGoogleLoading(true);
    setError("");
    try {
      // Simulate Google login: just log in with email, no password
      const res = await apiService.auth.login({ email, password: "" });
      if (res.data.role !== (isAdminLogin ? "admin" : "traveler")) {
        setError("Selected email is not registered as the correct role.");
        setGoogleLoading(false);
        return;
      }
      localStorage.setItem("user", JSON.stringify(res.data));
      localStorage.setItem("userId", res.data._id);
      setShowGoogleModal(false);
      if (isAdminLogin) {
        navigate("/admin-home");
      } else {
        navigate("/traveller-home");
      }
    } catch (err) {
      setError("Google login failed. Please select a registered email.");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md flex flex-col items-center">
        <div className="bg-blue-100 rounded-full p-4 mb-6">
          <span className="text-4xl">🌍</span>
        </div>
        <h2 className="text-3xl font-extrabold mb-2 text-center">Welcome Back</h2>
        <p className="text-lg text-gray-600 mb-8 text-center">Sign in to your Travel Buddy account</p>
        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
        <form className="w-full flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="relative">
            <span className="absolute left-3 top-3 text-gray-400 text-xl">📧</span>
            <input type="email" name="email" placeholder="Email" required className="pl-10 pr-4 py-3 rounded-lg border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg" value={form.email} onChange={handleChange} />
          </div>
          <div className="relative">
            <span className="absolute left-3 top-3 text-gray-400 text-xl">🔒</span>
            <input type="password" name="password" placeholder="Password" required className="pl-10 pr-4 py-3 rounded-lg border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg" value={form.password} onChange={handleChange} />
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg text-lg mt-2" disabled={loading}>{loading ? "Signing In..." : "Sign In"}</button>
        </form>
        <div className="mt-4 w-full flex flex-col items-center">
          <GoogleLogin
            onSuccess={async credentialResponse => {
              setError("");
              try {
                const res = await apiService.auth.googleAuth({ credential: credentialResponse.credential, role: isAdminLogin ? "admin" : "traveler" });
                localStorage.setItem("user", JSON.stringify(res.data));
                localStorage.setItem("userId", res.data._id);
                if (isAdminLogin) {
                  navigate("/admin-home");
                } else {
                  navigate("/traveller-home");
                }
              } catch (err) {
                setError("Google login failed. Please use a registered Google account.");
              }
            }}
            onError={() => setError("Google login failed. Please try again.")}
          />
        </div>
        <p className="mt-6 text-gray-600 text-center">
          {isAdminLogin ? (
            <>Don't have an account?{' '}
              <Link to="/admin-register" className="text-blue-600 font-semibold hover:underline">Admin Sign up</Link>
            </>
          ) : (
            <>Don't have an account?{' '}
              <Link to="/traveler-register" className="text-blue-600 font-semibold hover:underline">Traveler Sign up</Link>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default Login;