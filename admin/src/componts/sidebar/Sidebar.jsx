import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaBox, FaShoppingCart, FaUsers, FaCog, FaAngleDoubleLeft } from "react-icons/fa";

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`min-h-screen bg-gray-800 text-white flex flex-col justify-between transition-all duration-300 ease-in-out sticky top-0 py-2.5 px-2.5 ${collapsed ? 'w-20' : 'w-64'}`}>
      {/* Logo / Header */}
      <div className="p-5 border-b border-white/10">
        <h2 className={`m-0 text-lg font-semibold ${collapsed ? 'text-base text-center' : ''}`}>Admin Panel</h2>
        <p className={`text-xs text-gray-400 mt-1 ${collapsed ? 'hidden' : ''}`}>Management System</p>
      </div>

      {/* Navigation links */}
      <nav className="flex flex-col py-2.5">
        <NavLink 
          to="" 
          end 
          className={({ isActive }) => 
            `flex items-center gap-3 text-gray-300 no-underline py-3 px-5 text-[15px] transition-all duration-200 hover:bg-gray-700 hover:text-white ${isActive ? 'bg-blue-600 text-white' : ''} ${collapsed ? 'justify-center' : ''}`
          }
        >
          <FaTachometerAlt className="text-lg" />
          <span className={collapsed ? 'hidden' : ''}>Dashboard</span>
        </NavLink>

        <NavLink 
          to="products" 
          className={({ isActive }) => 
            `flex items-center gap-3 text-gray-300 no-underline py-3 px-5 text-[15px] transition-all duration-200 hover:bg-gray-700 hover:text-white ${isActive ? 'bg-blue-600 text-white' : ''} ${collapsed ? 'justify-center' : ''}`
          }
        >
          <FaBox className="text-lg" />
          <span className={collapsed ? 'hidden' : ''}>Products</span>
        </NavLink>

        <NavLink 
          to="orders" 
          className={({ isActive }) => 
            `flex items-center gap-3 text-gray-300 no-underline py-3 px-5 text-[15px] transition-all duration-200 hover:bg-gray-700 hover:text-white ${isActive ? 'bg-blue-600 text-white' : ''} ${collapsed ? 'justify-center' : ''}`
          }
        >
          <FaShoppingCart className="text-lg" />
          <span className={collapsed ? 'hidden' : ''}>Orders</span>
        </NavLink>

        <NavLink 
          to="users" 
          className={({ isActive }) => 
            `flex items-center gap-3 text-gray-300 no-underline py-3 px-5 text-[15px] transition-all duration-200 hover:bg-gray-700 hover:text-white ${isActive ? 'bg-blue-600 text-white' : ''} ${collapsed ? 'justify-center' : ''}`
          }
        >
          <FaUsers className="text-lg" />
          <span className={collapsed ? 'hidden' : ''}>Users</span>
        </NavLink>

        <NavLink 
          to="settings" 
          className={({ isActive }) => 
            `flex items-center gap-3 text-gray-300 no-underline py-3 px-5 text-[15px] transition-all duration-200 hover:bg-gray-700 hover:text-white ${isActive ? 'bg-blue-600 text-white' : ''} ${collapsed ? 'justify-center' : ''}`
          }
        >
          <FaCog className="text-lg" />
          <span className={collapsed ? 'hidden' : ''}>Settings</span>
        </NavLink>
      </nav>

      {/* Collapse button */}
      <div 
        className="flex items-center gap-2.5 py-4 px-5 text-sm text-gray-400 cursor-pointer border-t border-white/10 transition-all duration-200 hover:bg-gray-700 hover:text-white"
        onClick={() => setCollapsed(!collapsed)}
      >
        <FaAngleDoubleLeft className="text-base" />
        <span className={collapsed ? 'hidden' : ''}>Collapse</span>
      </div>
    </div>
  );
}

export default Sidebar;
