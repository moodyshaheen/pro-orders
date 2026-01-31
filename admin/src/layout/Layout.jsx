import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../componts/Navbar/Navbar";
import Sidebar from "../componts/sidebar/Sidebar";

function Layout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* القائمة الجانبية */}
      <Sidebar />

      {/* الجزء الرئيسي */}
      <div className="flex-1 flex flex-col">
        <Navbar />

        {/* هنا بيظهر محتوى الصفحة حسب الـ Route */}
        <div className="p-5 bg-white flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
