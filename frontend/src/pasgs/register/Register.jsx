import React, { useContext, useState } from "react";
import "./Register.css";
import axios from "axios";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { displayContext } from "../../context/DisplayContexet.jsx";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const { setToken, setUserData } = useContext(displayContext);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // clear error on change
  };

  const onRegister = async (e) => {
    e.preventDefault();

    let newErrors = {};

    // Frontend validation
    if (!data.firstName) newErrors.firstName = "First name is required";
    if (!data.lastName) newErrors.lastName = "Last name is required";
    if (!data.email) newErrors.email = "Email is required";
    if (!data.password) newErrors.password = "Password is required";
    if (!data.confirmPassword) newErrors.confirmPassword = "Confirm password is required";
    if (data.password && data.confirmPassword && data.password !== data.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; // prevent sending request
    }

    try {
      console.log("Sending data:", {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      });

      const response = await axios.post(`${url}/api/user/register`, {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
         confirmPassword: data.confirmPassword
      });

      if (response.data.success) {
        const token = response.data.token;
        setToken(token);
        localStorage.setItem("token", token);

        // Fetch user data after registration
        const userRes = await axios.get(`${url}/api/user/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const userData = userRes.data;
        setUserData(userData);
        localStorage.setItem("userData", JSON.stringify(userData));

        navigate("/profile");
      } else {
        alert(response.data.message || "Registration failed.");
      }
    } catch (error) {
      console.error("Register error:", error);
      if (error.response && error.response.data) {
        console.log("Backend error data:", error.response.data);
        alert(error.response.data.message || "Backend validation failed.");
      } else {
        alert("An error occurred during registration. Please try again.");
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-icon"><FaUser /></div>
        <h2>Create Account</h2>
        <p>Join us and start your premium shopping experience</p>

        <form onSubmit={onRegister} className="auth-form">

          <div className="input-group">
            <div style={{ width: "48%" }}>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={data.firstName}
                onChange={onChangeHandler}
              />
              {errors.firstName && <p className="error">{errors.firstName}</p>}
            </div>

            <div style={{ width: "48%" }}>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={data.lastName}
                onChange={onChangeHandler}
              />
              {errors.lastName && <p className="error">{errors.lastName}</p>}
            </div>
          </div>

          <div className="input-group single">
            <FaEnvelope className="fwifll" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={data.email}
              onChange={onChangeHandler}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>

          <div className="input-group single password-group">
            <FaLock className="fwifll" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Create a strong password"
              value={data.password}
              onChange={onChangeHandler}
            />
            <div className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
            {errors.password && <p className="error">{errors.password}</p>}
          </div>

          <div className="input-group single password-group">
            <FaLock className="fwifll" />
            <input
              type={showConfirm ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm password"
              value={data.confirmPassword}
              onChange={onChangeHandler}
            />
            <div className="eye-icon" onClick={() => setShowConfirm(!showConfirm)}>
              {showConfirm ? <FaEyeSlash /> : <FaEye />}
            </div>
            {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
          </div>

          <div className="checkbox-group">
            <label>
              <input type="checkbox" /> I agree to the Terms of Service and Privacy Policy
            </label>
            <label>
              <input type="checkbox" defaultChecked /> Subscribe to our newsletter
            </label>
          </div>

          <button type="submit" className="auth-btn">Create Account</button>

          <div className="divider">or sign up with</div>

          <div className="social-btns">
            <button type="button" className="google"><FcGoogle className="social-icon" /> Google</button>
            <button type="button" className="facebook"><FaFacebookF className="social-icon" /> Facebook</button>
          </div>

          <p className="switch">
            Already have an account? <a href="/login">Login here</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
