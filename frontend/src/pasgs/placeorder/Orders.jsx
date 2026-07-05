import React, { useEffect, useState, useContext } from "react";
import "./orders.css";
import axios from "axios";
import { displayContext } from "../../context/DisplayContexet";
import { motion } from "framer-motion";
import { FaBoxOpen } from "react-icons/fa";

function Orders() {
  const { userData, token, url } = useContext(displayContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🟢 جلب الطلبات الخاصة بالمستخدم
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Check if user is logged in
        if (!token || token.trim() === "") {
          setLoading(false);
          return;
        }

        const res = await axios.post(
          `${url}/api/order/my-orders`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (res.data.success) {
          setOrders(res.data.orders || []);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [token, url]);

  // Note: Order deletion can be added later if needed
  // For now, orders are read-only after placement

  return (
    <motion.div
      className="orders-page"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="orders-title">
        Your <span>Orders</span>
      </h2>
      <p className="orders-subtitle">Track and manage your recent orders</p>

      {loading ? (
        <div className="loading">Loading orders...</div>
      ) : orders.length === 0 ? (
        <div className="no-orders">
          <FaBoxOpen className="empty-icon" />
          <p>No orders placed yet.</p>
        </div>
      ) : (
        <div className="orders-container">
          {orders.map((order, i) => (
            <div className="order-card" key={order._id || order.id || i}>
              <div className="order-header">
                <h4>Order #{order._id?.slice(-6) || order.id || i + 1}</h4>
                <span className={`status ${order.status || "pending"}`}>
                  {order.status || "Pending"}
                </span>
              </div>

              <div className="order-items">
                {order.items?.map((item, idx) => (
                  <div className="order-item" key={idx}>
                    <img
                      src={item.image ? `${url}/images/${item.image}` : "/placeholder.png"}
                      alt={item.name || item.title}
                      onError={(e) => (e.target.src = "/placeholder.png")}
                    />
                    <div className="order-details">
                      <h5>{item.name || item.title}</h5>
                      <p>
                        Quantity: <strong>{item.quantity || item.amount}</strong>
                      </p>
                      <p>Price: ${item.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-total">
                <p>
                  Total: <strong>${order.total?.toFixed(2)}</strong>
                </p>
                <p>
                  Date:{" "}
                  <span>
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleDateString()
                      : new Date().toLocaleDateString()}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default Orders;
