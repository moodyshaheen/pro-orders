import React from "react";
import { motion } from "framer-motion";
import "./about.css";
import img1 from "../../assets/imges/kjo.jpg";
import img2 from "../../assets/imges/kldon.jpg";
import img3 from "../../assets/imges/sdil.jpg";

function About() {
  return (
    <div className="about-page">
      <motion.div
        className="about-header"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1>About <span>Our Store</span></h1>
        <p>
          Discover who we are, what we stand for, and how we make shopping a delightful experience for everyone.
        </p>
      </motion.div>

      <div className="about-content">
        <motion.div
          className="about-card"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img src={img1} alt="Our Team" />
          <h2>Who We Are</h2>
          <p>
            We are a passionate team of developers, designers, and creators who believe in delivering
            quality products and seamless user experiences through modern e-commerce solutions.
          </p>
        </motion.div>

        <motion.div
          className="about-card"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img src={img2} alt="Our Mission" />
          <h2>Our Mission</h2>
          <p>
            Our goal is to make online shopping simple, transparent, and enjoyable — combining technology
            with customer-centric design to bring you the best experience possible.
          </p>
        </motion.div>

        <motion.div
          className="about-card"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img src={img3} alt="Our Vision" />
          <h2>Our Vision</h2>
          <p>
            We aim to be one of the leading online marketplaces by continuously improving and expanding
            our products, while keeping innovation and trust at our core.
          </p>
        </motion.div>
      </div>

      <motion.div
        className="about-footer"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h3>Thank you for being part of our journey </h3>
        <p>We’re committed to making your shopping experience unforgettable.</p>
      </motion.div>
    </div>
  );
}

export default About;
