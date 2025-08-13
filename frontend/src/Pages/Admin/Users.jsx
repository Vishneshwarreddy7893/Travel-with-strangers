import React, { useEffect, useState } from "react";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get("http://localhost:5000/api/auth");
        setUsers(res.data);
      } catch (err) {
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="p-10 min-h-screen h-screen bg-gray-50 flex flex-col">
      <h1 className="text-2xl font-bold text-blue-900 mb-6">User Management</h1>
      <div className="bg-white rounded-xl shadow p-8 overflow-x-auto">
        {loading ? (
          <div className="text-center text-gray-500">Loading users...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <table className="min-w-full text-lg">
            <thead>
              <tr className="text-left text-blue-800 border-b">
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Email</th>
                <th className="py-2 px-4">Role</th>
                <th className="py-2 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} className="border-b last:border-b-0">
                  <td className="py-2 px-4">{u.firstName} {u.lastName}</td>
                  <td className="py-2 px-4">{u.email}</td>
                  <td className="py-2 px-4 capitalize">{u.role}</td>
                  <td className="py-2 px-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-700`}>Active</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Users; 