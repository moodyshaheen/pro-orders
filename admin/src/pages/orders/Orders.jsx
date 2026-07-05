import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const url = import.meta.env.VITE_API_URL || "https://pro-orders-46b5.vercel.app";

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      
      if (!token) {
        console.error("No token found");
        setLoading(false);
        return;
      }

      const response = await axios.post(
        `${url}/api/order/all`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        setOrders(response.data.orders || []);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-[28px] font-semibold mb-8 text-gray-800">Orders Management</h2>
      
      {loading ? (
        <div className="text-center py-10 text-gray-600">Loading orders...</div>
      ) : orders.length === 0 ? (
        <div className="text-center py-10 text-gray-600">
          <p>No orders found.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl p-5 shadow-md">
          <table className="w-full border-collapse">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 text-left font-semibold text-gray-800 border-b-2 border-gray-200">Order ID</th>
                <th className="p-3 text-left font-semibold text-gray-800 border-b-2 border-gray-200">User</th>
                <th className="p-3 text-left font-semibold text-gray-800 border-b-2 border-gray-200">Items</th>
                <th className="p-3 text-left font-semibold text-gray-800 border-b-2 border-gray-200">Total</th>
                <th className="p-3 text-left font-semibold text-gray-800 border-b-2 border-gray-200">Status</th>
                <th className="p-3 text-left font-semibold text-gray-800 border-b-2 border-gray-200">Date</th>
                <th className="p-3 text-left font-semibold text-gray-800 border-b-2 border-gray-200">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td className="p-3 border-b border-gray-200">#{order._id?.slice(-6)}</td>
                  <td className="p-3 border-b border-gray-200">
                    {order.userId?.firstName && order.userId?.lastName
                      ? `${order.userId.firstName} ${order.userId.lastName}`
                      : order.userId?.email || 'N/A'}
                  </td>
                  <td className="p-3 border-b border-gray-200">{order.items?.length || 0} items</td>
                  <td className="p-3 border-b border-gray-200">${order.total?.toFixed(2)}</td>
                  <td className="p-3 border-b border-gray-200">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${
                      order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'shipped' ? 'bg-green-100 text-green-800' :
                      order.status === 'delivered' ? 'bg-green-200 text-green-900' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status || 'Pending'}
                    </span>
                  </td>
                  <td className="p-3 border-b border-gray-200">{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}</td>
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

export default Orders;

