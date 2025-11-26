import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user, login } = useAuth();  // <-- Get user from context

  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    username: user?.username || "",
    email: user?.email || "",
  });

  const handleEditToggle = () => setIsEditing(!isEditing);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Update user in AuthContext
    login({
      ...user,
      username: form.username, // update only name
    });

    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          
          {/* HEADER */}
          <div className="p-6 sm:flex sm:items-center sm:justify-between">
            <div className="sm:flex sm:items-center sm:space-x-5">
              <img
                className="w-24 h-24 rounded-full border"
                src={user?.avatar || "https://via.placeholder.com/150"}
                alt="avatar"
              />

              <div className="mt-4 sm:mt-0">
                <p className="text-xl font-bold">{user?.username}</p>
                <p className="text-sm text-gray-600">{user?.email}</p>
              </div>
            </div>

            <button
              onClick={handleEditToggle}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>
          </div>

          {/* BODY */}
          <div className="border-t p-6">
            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block mb-1 font-medium">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    readOnly
                    className="w-full px-3 py-2 border bg-gray-200 rounded-md"
                  />
                </div>

                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Save Changes
                </button>
              </form>
            ) : (
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Username</p>
                  <p className="text-gray-900">{user?.username}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-gray-900">{user?.email}</p>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;
