import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const url = import.meta.env.VITE_API_URL || "https://pro-orders-46b5.vercel.app";
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await axios.get(`${url}/api/user/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data) {
        setUserData(response.data);
        setFormData({
          firstName: response.data.firstName || '',
          lastName: response.data.lastName || '',
          email: response.data.email || '',
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      // Note: You'll need to create an update endpoint in backend
      // For now, just show a message
      alert('Profile update feature coming soon!');
      setEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile');
    }
  };

  if (loading) {
    return <div className="text-center py-10 text-gray-600">Loading profile...</div>;
  }

  if (!userData) {
    return <div className="text-center py-10 text-gray-600">No profile data found.</div>;
  }

  return (
    <div className="p-5">
      <h2 className="text-[28px] font-semibold mb-8 text-gray-800">Profile</h2>
      
      <div className="bg-white rounded-xl p-8 shadow-md max-w-[600px]">
        <div className="text-center mb-8 pb-8 border-b border-gray-200">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center text-3xl font-semibold mx-auto mb-4">
            {userData.firstName?.[0]}{userData.lastName?.[0]}
          </div>
          <h3 className="text-2xl font-semibold m-0 mb-2 text-gray-800">{userData.firstName} {userData.lastName}</h3>
          <p className="text-gray-600 m-0">{userData.email}</p>
        </div>

        <div className="mt-5">
          {editing ? (
            <>
              <div className="mb-5">
                <label className="block mb-2 font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full p-2.5 border border-gray-300 rounded-md text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div className="mb-5">
                <label className="block mb-2 font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full p-2.5 border border-gray-300 rounded-md text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div className="mb-5">
                <label className="block mb-2 font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2.5 border border-gray-300 rounded-md text-sm outline-none bg-gray-100 cursor-not-allowed"
                  disabled
                />
              </div>

              <div className="flex gap-3 mt-6">
                <button 
                  className="px-5 py-2.5 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors duration-200 cursor-pointer" 
                  onClick={() => setEditing(false)}
                >
                  Cancel
                </button>
                <button 
                  className="px-5 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 cursor-pointer" 
                  onClick={handleSave}
                >
                  Save Changes
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-between py-3 border-b border-gray-100">
                <label className="font-semibold text-gray-800">First Name:</label>
                <span className="text-gray-600">{userData.firstName}</span>
              </div>

              <div className="flex justify-between py-3 border-b border-gray-100">
                <label className="font-semibold text-gray-800">Last Name:</label>
                <span className="text-gray-600">{userData.lastName}</span>
              </div>

              <div className="flex justify-between py-3 border-b-0">
                <label className="font-semibold text-gray-800">Email:</label>
                <span className="text-gray-600">{userData.email}</span>
              </div>

              <button 
                className="px-5 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 cursor-pointer mt-6" 
                onClick={() => setEditing(true)}
              >
                Edit Profile
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

