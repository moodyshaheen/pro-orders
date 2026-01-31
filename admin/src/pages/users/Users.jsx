import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const url = import.meta.env.VITE_API_URL || "http://localhost:4000";

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      
      if (!token) {
        console.error("No token found");
        setLoading(false);
        return;
      }

      const response = await axios.get(`${url}/api/user/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Users response:", response.data); // Debug

      if (response.data.success && response.data.data) {
        // Get all orders to count per user
        const ordersRes = await axios.post(
          `${url}/api/order/all`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const orders = ordersRes.data.success ? ordersRes.data.orders || [] : [];
        
        // Count orders per user
        const usersWithOrders = response.data.data.map((user) => {
          const ordersCount = orders.filter(
            (order) => order.userId?._id?.toString() === user._id?.toString() ||
                      order.userId?.toString() === user._id?.toString()
          ).length;
          
          return {
            ...user,
            ordersCount,
          };
        });
        
        setUsers(usersWithOrders);
      } else {
        console.error("No users data in response:", response.data);
        setUsers([]);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
      }
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-[28px] font-semibold mb-8 text-gray-800">Users Management</h2>
      
      {loading ? (
        <div className="text-center py-10 text-gray-600">Loading users...</div>
      ) : users.length === 0 ? (
        <div className="text-center py-10 text-gray-600">
          <p>No users found.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl p-5 shadow-md">
          <table className="w-full border-collapse">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 text-left font-semibold text-gray-800 border-b-2 border-gray-200">Name</th>
                <th className="p-3 text-left font-semibold text-gray-800 border-b-2 border-gray-200">Email</th>
                <th className="p-3 text-left font-semibold text-gray-800 border-b-2 border-gray-200">Orders</th>
                <th className="p-3 text-left font-semibold text-gray-800 border-b-2 border-gray-200">Joined</th>
                <th className="p-3 text-left font-semibold text-gray-800 border-b-2 border-gray-200">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="p-3 border-b border-gray-200">{user.firstName} {user.lastName}</td>
                  <td className="p-3 border-b border-gray-200">{user.email}</td>
                  <td className="p-3 border-b border-gray-200">
                    <span className="px-2.5 py-1 rounded-xl text-xs font-semibold bg-cyan-500 text-black">{user.ordersCount || 0}</span>
                  </td>
                  <td className="p-3 border-b border-gray-200">{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</td>
                  <td className="p-3 border-b border-gray-200">
                    <button className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 cursor-pointer">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Users;

