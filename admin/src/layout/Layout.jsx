import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../componts/Navbar/Navbar";
import Sidebar from "../componts/sidebar/Sidebar";

function Layout({ onLogout }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar onLogout={onLogout} />
        <div className="p-5 bg-white flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
