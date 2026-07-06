import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaBox, FaShoppingCart, FaUsers, FaDollarSign } from 'react-icons/fa';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);
  const url = import.meta.env.VITE_API_URL || "https://pro-orders-u15h.vercel.app";

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("adminToken");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const [productsRes, usersRes, ordersRes] = await Promise.allSettled([
        axios.get(`${url}/api/product/list`),
        axios.get(`${url}/api/user/all`, { headers }),
        axios.post(`${url}/api/order/all`, {}, { headers }),
      ]);

      const totalProducts = productsRes.status === "fulfilled" && productsRes.value.data.success
        ? productsRes.value.data.data?.length || 0 : 0;

      const totalUsers = usersRes.status === "fulfilled" && usersRes.value.data.success
        ? usersRes.value.data.data?.length || 0 : 0;

      const orders = ordersRes.status === "fulfilled" && ordersRes.value.data.success
        ? ordersRes.value.data.orders || [] : [];

      const totalOrders = orders.length;
      const totalRevenue = orders.reduce((sum, o) => sum + (o.totalPrice || o.amount || 0), 0);

      setStats({ totalProducts, totalOrders, totalUsers, totalRevenue });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Products',
      value: stats.totalProducts,
      icon: <FaBox />,
      color: '#4CAF50',
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: <FaShoppingCart />,
      color: '#2196F3',
    },
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: <FaUsers />,
      color: '#FF9800',
    },
    {
      title: 'Total Revenue',
      value: `$${stats.totalRevenue.toFixed(2)}`,
      icon: <FaDollarSign />,
      color: '#9C27B0',
    },
  ];

  return (
    <div className="p-5">
      <h2 className="text-[28px] font-semibold mb-8 text-gray-800">Dashboard</h2>
      
      {loading ? (
        <div className="text-center py-10 text-lg text-gray-600">Loading...</div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-5 mb-8">
          {statCards.map((stat, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl p-6 shadow-md flex items-center gap-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
            >
              <div 
                className="w-15 h-15 rounded-xl flex items-center justify-center text-2xl"
                style={{ backgroundColor: `${stat.color}20`, color: stat.color }}
              >
                {stat.icon}
              </div>
              <div>
                <h3 className="text-[32px] font-bold m-0 text-gray-800">{stat.value}</h3>
                <p className="text-sm text-gray-600 mt-1 mb-0">{stat.title}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;

