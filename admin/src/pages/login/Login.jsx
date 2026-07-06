import { useState } from "react";
import axios from "axios";

const url = import.meta.env.VITE_API_URL || "https://pro-orders-u15h.vercel.app";

function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(`${url}/api/user/login`, { email, password });
      if (res.data.success) {
        localStorage.setItem("adminToken", res.data.token);
        onLogin();
      } else {
        setError(res.data.message || "Invalid credentials");
      }
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      justifyContent: "center", background: "#f3f4f6"
    }}>
      <div style={{
        background: "#fff", padding: "40px", borderRadius: "12px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)", width: "100%", maxWidth: "400px"
      }}>
        <h2 style={{ textAlign: "center", marginBottom: "8px", color: "#1e293b" }}>
          Admin Panel
        </h2>
        <p style={{ textAlign: "center", color: "#64748b", marginBottom: "28px", fontSize: "14px" }}>
          Sign in to continue
        </p>

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", marginBottom: "6px", fontSize: "14px", color: "#374151" }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@modernstore.com"
              required
              style={{
                width: "100%", padding: "10px 14px", border: "1px solid #d1d5db",
                borderRadius: "8px", fontSize: "14px", outline: "none", boxSizing: "border-box"
              }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "6px", fontSize: "14px", color: "#374151" }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={{
                width: "100%", padding: "10px 14px", border: "1px solid #d1d5db",
                borderRadius: "8px", fontSize: "14px", outline: "none", boxSizing: "border-box"
              }}
            />
          </div>

          {error && (
            <p style={{ color: "#ef4444", fontSize: "13px", marginBottom: "12px", textAlign: "center" }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%", padding: "12px", background: "#2563eb",
              color: "#fff", border: "none", borderRadius: "8px",
              fontSize: "15px", cursor: "pointer", fontWeight: "600"
            }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "20px", fontSize: "12px", color: "#9ca3af" }}>
          Sign in with your registered account
        </p>
      </div>
    </div>
  );
}

export default AdminLogin;
