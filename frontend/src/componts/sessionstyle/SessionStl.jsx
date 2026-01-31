import React from 'react';
import '../sessionstyle/sessionstle.css';
import { FaShieldAlt, FaTruck, FaHeadset, FaDollarSign } from 'react-icons/fa';

function SessionStl() {
  return (
    <div className="why-choose-us">
      <h2>Why Choose Us</h2>
      <p className="subtitle">
        We're committed to providing you with the best shopping experience
      </p>

      <div className="features">
        <div className="feature-card">
          <FaShieldAlt className="icfer" />
          <h3>Premium Quality</h3>
          <p>All products undergo rigorous quality checks</p>
        </div>

        <div className="feature-card">
          <FaTruck className="icfer" />
          <h3>Fast Delivery</h3>
          <p>Free shipping on orders over $99</p>
        </div>

        <div className="feature-card">
          <FaHeadset className="icfer" />
          <h3>24/7 Support</h3>
          <p>Round-the-clock customer assistance</p>
        </div>

        <div className="feature-card">
          <FaDollarSign className="icfer" />
          <h3>Best Prices</h3>
          <p>Competitive pricing with great deals</p>
        </div>
      </div>

      <div className="newsletter">
        <h3>Stay Updated with Our Latest Offers</h3>
        <p>
          Subscribe to our newsletter and get exclusive deals, new product launches, and insider tips.
        </p>
        <div className="subscribe-form">
          <input type="email" placeholder="Enter your email address" />
          <button>Subscribe</button>
        </div>
      </div>
    </div>
  );
}

export default SessionStl;
