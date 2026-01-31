import { useContext, useState } from "react";
import "./Login.css";
import { FaUser, FaLock, FaEye, FaEyeSlash, FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { displayContext } from "../../context/DisplayContexet";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const { setToken, setUserData, url } = useContext(displayContext);

  const [data, setData] = useState({ email: "", password: "" });

  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onLogin = async (e) => {
    e.preventDefault();

    try {
      const loginUrl = `${url}/api/user/login`;
      const response = await axios.post(loginUrl, data);

      if (response.data.success) {
        const token = response.data.token;
        setToken(token);
        localStorage.setItem("token", token);

        // جلب بيانات المستخدم بعد تسجيل الدخول
        const userRes = await axios.get(`${url}/api/user/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const userData = userRes.data;
        setUserData(userData);
        localStorage.setItem("userData", JSON.stringify(userData));

        window.location.href = "/profile";
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-icon">
          <FaUser />
        </div>

        <h2>Login</h2>
        <p>Welcome back! Please login to your account</p>

        <form onSubmit={onLogin} className="auth-form">
          <div className="input-group single">
            <FaUser className="fwifll" />
            <input
              type="email"
              name="email"
              onChange={onChangeHandler}
              value={data.email}
              placeholder="Email Address"
            />
          </div>

          <div className="input-group single password-group">
            <FaLock className="fwifll" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              onChange={onChangeHandler}
              value={data.password}
            />
            <div
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          <div className="checkbox-group">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="/forgot-password">Forgot password?</a>
          </div>

          <button type="submit" className="auth-btn">
            Login
          </button>

          <div className="divider">or login with</div>

          <div className="social-btns">
            <button type="button" className="google">
              <FcGoogle className="social-icon" /> Google
            </button>
            <button type="button" className="facebook">
              <FaFacebookF className="social-icon" /> Facebook
            </button>
          </div>

          <p className="switch">
            Don’t have an account? <a href="/register">Create one</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
