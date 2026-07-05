import React from "react";
import "./contact.css";
import { motion } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

function Contact() {
  return (
    <motion.div
      className="contact-page"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="contact-title">Get in <span>Touch</span></h2>
      <p className="contact-subtitle">
        Have any questions or feedback? We'd love to hear from you!
      </p>

      <div className="contact-container">
        {/* Contact Info Section */}
        <div className="contact-info">
          <div className="info-box">
            <FaMapMarkerAlt className="icon" />
            <div>
              <h4>Our Location</h4>
              <p>123 Downtown Street, Cairo, Egypt</p>
            </div>
          </div>
          <div className="info-box">
            <FaPhoneAlt className="icon" />
            <div>
              <h4>Phone</h4>
              <p>+20 111 222 333</p>
            </div>
          </div>
          <div className="info-box">
            <FaEnvelope className="icon" />
            <div>
              <h4>Email</h4>
              <p>support@shopstore.com</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
          <div className="input-group">
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
          </div>
          <textarea placeholder="Your Message" rows="5" required></textarea>
          <button type="submit" className="send-btn">Send Message</button>
        </form>
      </div>

      {/* Google Map */}
      <div className="map-container">
        <iframe
          title="map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3454.022563233816!2d31.23571111511351!3d30.04441998187948!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145840c5679b4bff%3A0xf19c8b92f9f0e5e2!2sCairo%2C%20Egypt!5e0!3m2!1sen!2seg!4v1700000000000"
          loading="lazy"
        ></iframe>
      </div>
    </motion.div>
  );
}

export default Contact;
