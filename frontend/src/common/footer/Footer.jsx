import React from 'react';
import './Footer.css';
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaHeart,
  FaCheckCircle,
  FaShippingFast,
  FaHeadset,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope
} from 'react-icons/fa';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-section">
          <h3 className="logo">ModernStore</h3>
          <p className="desc">
            Your trusted partner for premium quality products. We bring you the latest trends and timeless classics with exceptional service.
          </p>
          <div className="social-icons">
            <FaFacebookF />
            <FaInstagram />
            <FaTwitter />
          </div>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li>Home</li>
            <li>Products</li>
            <li>Categories</li>
            <li>Special Offers</li>
            <li>New Arrivals</li>
            <li>Best Sellers</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Customer Service</h4>
          <ul>
            <li>Contact Us</li>
            <li>FAQ</li>
            <li>Shipping Info</li>
            <li>Returns</li>
            <li>Size Guide</li>
            <li>Track Order</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Get in Touch</h4>
          <ul className="contact-info">
            <li>
              <FaMapMarkerAlt /> 123 Fashion Street, New York, NY 10001, United States
            </li>
            <li>
              <FaPhoneAlt /> +1 (555) 123-4567 <br /><small>Mon-Fri 9AM–6PM</small>
            </li>
            <li>
              <FaEnvelope /> hello@modernstore.com <br /><small>24/7 Support</small>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-middle">
        <div className="badges">
          <span><FaCheckCircle /> Secure Shopping</span>
          <span><FaShippingFast /> Free Shipping</span>
          <span><FaHeadset /> 24/7 Support</span>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © 2024 ModernStore. All rights reserved. Designed with <FaHeart className="heart" /> for premium shopping experience.
        </p>
        <div className="legal-links">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
          <span>Made with Readdy</span>
        </div>
        <div className="payment-icons">
          <FaCcVisa />
          <FaCcMastercard />
          <FaCcPaypal />
        </div>
      </div>
    </footer>
  )
}

export default Footer
