import React from "react";
import { motion } from "framer-motion";
import "./deals.css";
const img1 = "https://images.unsplash.com/photo-1517336714731-489689fd1ca8";
const img2 = "https://images.unsplash.com/photo-1505691938895-1758d7feb511";
const img3 = "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c";

function Deals() {
  return (
    <div className="deals-container">
      {/* 🏷️ Hero Section */}
      <motion.div
        className="deals-hero"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="deals-hero-text">
          <h1>🔥 Hot Deals & Exclusive Offers</h1>
          <p>
            Discover amazing discounts on top-rated products!  
            Limited-time offers you don’t want to miss.
          </p>
          <button className="shop-now-btn">Shop Now</button>
        </div>
        <img
          src={img2}
          alt="Hot Deals"
          className="deals-hero-img"
        />
      </motion.div>

      {/* 🛍️ Deal Cards */}
      <div className="deals-grid">
        {[
          {
            img:'https://images.unsplash.com/photo-1517336714731-489689fd1ca8',
            title: "Electronics Sale",
            desc: "Up to 40% off on the latest gadgets!",
          },
          {
            img: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c',
            title: "Fashion Week",
            desc: "Trendy outfits starting from $19.99!",
          },
          {
            img:' https://images.unsplash.com/photo-1505691938895-1758d7feb511',
            title: "Home Essentials",
            desc: "Upgrade your home with exclusive discounts!",
          },
        ].map((deal, i) => (
          <motion.div
            key={i}
            className="deal-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 * i, duration: 0.6 }}
          >
            <img src={deal.img} alt={deal.title} />
            <h3>{deal.title}</h3>
            <p>{deal.desc}</p>
            <button className="deal-btn">View Offer</button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Deals;
