import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Settings = () => {
  const url = import.meta.env.VITE_API_URL || "https://pro-orders-46b5.vercel.app";
  const [settings, setSettings] = useState({
    siteName: 'ModernStore',
    siteEmail: 'admin@modernstore.com',
    maintenanceMode: false,
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Load settings from localStorage on mount
    const savedSettings = localStorage.getItem('adminSettings');
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setMessage('');
      
      // Save to localStorage
      localStorage.setItem('adminSettings', JSON.stringify(settings));
      
      // Here you can also save to backend if you have an endpoint
      // await axios.post(`${url}/api/admin/settings`, settings, {
      //   headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      // });
      
      setMessage('Settings saved successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error saving settings:', error);
      setMessage('Error saving settings');
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-[28px] font-semibold mb-8 text-gray-800">Settings</h2>
      
      <div className="bg-white rounded-xl p-8 shadow-md">
        <h3 className="text-xl font-semibold mb-6 text-gray-800">General Settings</h3>
        
        <div className="mb-5">
          <label className="block mb-2 font-medium text-gray-700">Site Name</label>
          <input
            type="text"
            name="siteName"
            value={settings.siteName}
            onChange={handleChange}
            className="w-full p-2.5 border border-gray-300 rounded-md text-sm outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-5">
          <label className="block mb-2 font-medium text-gray-700">Site Email</label>
          <input
            type="email"
            name="siteEmail"
            value={settings.siteEmail}
            onChange={handleChange}
            className="w-full p-2.5 border border-gray-300 rounded-md text-sm outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-5">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="maintenanceMode"
              checked={settings.maintenanceMode}
              onChange={handleChange}
              className="w-[18px] h-[18px] cursor-pointer"
            />
            Maintenance Mode
          </label>
        </div>

        {message && (
          <div className={`p-3 rounded-md mb-4 font-medium ${
            message.includes('Error') 
              ? 'bg-red-100 text-red-800 border border-red-200' 
              : 'bg-green-100 text-green-800 border border-green-200'
          }`}>
            {message}
          </div>
        )}
        
        <button 
          className="px-5 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 cursor-pointer disabled:bg-gray-500 disabled:cursor-not-allowed" 
          onClick={handleSave} 
          disabled={saving}
        >
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>
    </div>
  );
};

export default Settings;

