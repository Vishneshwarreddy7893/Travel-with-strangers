import React, { useEffect, useState } from "react";
import apiService from "../../services/api.service";

const TravellerAccount = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [debug, setDebug] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ firstName: '', lastName: '', phone: '', interests: '', password: '' });
  const [saveError, setSaveError] = useState('');
  const [saveSuccess, setSaveSuccess] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      setError("");
      try {
        const userId = localStorage.getItem('userId');
        setDebug(`userId: ${userId}`);
        if (!userId) throw new Error('User not logged in');
        const res = await apiService.auth.getUser(userId);
        setUser(res.data);
      } catch (err) {
        setError("Failed to fetch user profile: " + (err?.response?.data?.message || err.message));
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      setForm({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        phone: user.phone || '',
        interests: user.interests || '',
        password: '',
      });
    }
  }, [user]);

  const handleEdit = () => {
    setEditMode(true);
    setSaveError('');
    setSaveSuccess('');
  };

  const handleCancel = () => {
    setEditMode(false);
    setSaveError('');
    setSaveSuccess('');
    setForm({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      phone: user.phone || '',
      interests: user.interests || '',
      password: '',
    });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaveError('');
    setSaveSuccess('');
    try {
      const userId = localStorage.getItem('userId');
      const updateData = { ...form };
      if (!updateData.password) delete updateData.password;
      console.log('PUT /api/auth/' + userId, updateData); // Debug log
      const res = await apiService.auth.updateUser(userId, updateData);
      setUser(res.data);
      setEditMode(false);
      setSaveSuccess('Profile updated successfully!');
    } catch (err) {
      setSaveError('Failed to update profile: ' + (err?.response?.data?.message || err.message));
    }
  };

  if (loading) return <div className="p-10 text-lg text-gray-600">Loading profile...</div>;
  if (error) return <div className="p-10 text-red-500 font-semibold">{error}<br/><span style={{fontSize:'12px',color:'#888'}}>{debug}</span></div>;
  if (!user) return null;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-extrabold mb-8 text-[#3B2F8C]">My Account</h2>
      <div className="bg-white rounded-xl shadow p-8 max-w-xl mx-auto">
        <div className="text-xl font-bold mb-4 text-[#3B2F8C]">Personal Information</div>
        {editMode ? (
          <form className="flex flex-col gap-4" onSubmit={handleSave}>
            <div className="flex gap-4">
              <input type="text" name="firstName" value={form.firstName} onChange={handleChange} required className="flex-1 px-4 py-2 rounded-lg border border-gray-300" placeholder="First Name" />
              <input type="text" name="lastName" value={form.lastName} onChange={handleChange} required className="flex-1 px-4 py-2 rounded-lg border border-gray-300" placeholder="Last Name" />
            </div>
            <input type="email" value={user.email} disabled className="px-4 py-2 rounded-lg border border-gray-300 bg-gray-100" placeholder="Email" />
            <input type="tel" name="phone" value={form.phone} onChange={handleChange} required className="px-4 py-2 rounded-lg border border-gray-300" placeholder="Phone" />
            <input type="text" name="interests" value={form.interests} onChange={handleChange} className="px-4 py-2 rounded-lg border border-gray-300" placeholder="Interests (optional)" />
            <input type="password" name="password" value={form.password} onChange={handleChange} className="px-4 py-2 rounded-lg border border-gray-300" placeholder="New Password (leave blank to keep current)" />
            <div className="flex gap-4 mt-2">
              <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg">Save</button>
              <button type="button" className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-6 rounded-lg" onClick={handleCancel}>Cancel</button>
            </div>
            {saveError && <div className="text-red-500 text-sm mt-2">{saveError}</div>}
            {saveSuccess && <div className="text-green-600 text-sm mt-2">{saveSuccess}</div>}
          </form>
        ) : (
          <>
            <div className="mb-2 text-gray-700">Name: <span className="font-semibold">{user.firstName} {user.lastName}</span></div>
            <div className="mb-2 text-gray-700">Email: <span className="font-semibold">{user.email}</span></div>
            <div className="mb-2 text-gray-700">Phone: <span className="font-semibold">{user.phone}</span></div>
            <div className="mb-2 text-gray-700">Role: <span className="font-semibold">{user.role}</span></div>
            <div className="mb-2 text-gray-700">Preferences: <span className="font-semibold">{user.interests || '-'}</span></div>
            <button className="bg-[#3B2F8C] hover:bg-[#5546B6] text-white font-bold py-2 px-6 rounded-lg w-full mt-4" onClick={handleEdit}>Edit Profile</button>
            {saveSuccess && <div className="text-green-600 text-sm mt-2">{saveSuccess}</div>}
          </>
        )}
      </div>
    </div>
  );
};

export default TravellerAccount;