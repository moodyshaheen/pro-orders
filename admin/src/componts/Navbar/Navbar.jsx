import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaBell, FaUserCircle } from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    window.location.href = "/";
  };

  const handleProfile = () => {
    setShowProfile(false);
    navigate("/profile");
  };

  const handleSettings = () => {
    setShowProfile(false);
    navigate("/settings");
  };

  return (
    <div className="flex justify-between items-center bg-white border-b border-gray-200 py-2.5 px-5 relative">
      {/* Welcome text */}
      <div>
        <h3 className="m-0 text-lg">Admin Dashboard</h3>
        <p className="m-0 text-gray-500 text-[13px]">Welcome back, Administrator</p>
      </div>

      {/* Search + icons */}
      <div className="flex items-center gap-5">
        {/* Search box */}
        <div className="flex items-center border border-gray-300 rounded-md py-1.5 px-2.5 bg-gray-50">
          <FaSearch className="text-gray-400" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="border-none outline-none bg-transparent ml-1.5"
          />
        </div>

        {/* Notifications */}
        <div className="relative cursor-pointer">
          <div
            className="relative text-lg text-gray-700"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <FaBell />
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] py-0.5 px-1.5 rounded-full">3</span>
          </div>

          {showNotifications && (
            <div className="absolute right-0 top-9 w-[280px] bg-white border border-gray-200 rounded-lg shadow-lg z-20 p-2.5">
              <h4 className="text-sm mb-2.5">Notifications</h4>
              <ul className="list-none p-0 m-0">
                <li className="text-[13px] py-1.5 border-b border-gray-100">
                  New order received <span className="text-gray-400 text-[11px] ml-1">2 min ago</span>
                </li>
                <li className="text-[13px] py-1.5 border-b border-gray-100">
                  Low stock alert for Wireless Headphones <span className="text-gray-400 text-[11px] ml-1">1h ago</span>
                </li>
                <li className="text-[13px] py-1.5 border-b border-gray-100">
                  New user registered <span className="text-gray-400 text-[11px] ml-1">3h ago</span>
                </li>
              </ul>
              <a href="#" className="block text-center mt-2 text-blue-600 text-[13px]">View all notifications</a>
            </div>
          )}
        </div>

        {/* User profile dropdown */}
        <div
          className="relative cursor-pointer flex items-center gap-1.5"
          onClick={() => setShowProfile(!showProfile)}
        >
          <FaUserCircle className="text-xl" />
          <span className="text-sm">Admin</span>

          {showProfile && (
            <div className="absolute right-0 top-9 bg-white border border-gray-200 rounded-lg shadow-lg w-[220px] z-30 p-2.5">
              <div>
                <strong className="block text-sm">Administrator</strong>
                <p className="m-0 text-[12px] text-gray-500">admin@store.com</p>
              </div>
              <hr className="my-2.5" />
              <ul className="list-none p-0 m-0 mt-2.5">
                <li 
                  onClick={handleProfile}
                  className="py-2 px-2 rounded-md transition-colors duration-200 text-sm cursor-pointer hover:bg-gray-100"
                >
                  Profile
                </li>
                <li 
                  onClick={handleSettings}
                  className="py-2 px-2 rounded-md transition-colors duration-200 text-sm cursor-pointer hover:bg-gray-100"
                >
                  Settings
                </li>
                <li 
                  className="text-red-500 py-2 px-2 rounded-md transition-colors duration-200 text-sm cursor-pointer hover:bg-red-50"
                  onClick={handleLogout}
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
