import React, { useContext, useState, useEffect } from "react";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import axios from "axios";
import { displayContext } from "../../context/DisplayContexet";

function Profile() {
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [newName, setNewName] = useState({ firstName: "", lastName: "" });
  const [loading, setLoading] = useState(true);

  const { userData, setUserData, token, logoutHandler, url } = useContext(displayContext);
  const navigate = useNavigate();

  // جلب البيانات عند تحميل الصفحة
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const storedToken = token || localStorage.getItem("token");
        if (!storedToken) {
          navigate("/login");
          return;
        }

        // لو ما عندناش بيانات المستخدم في context
        if (!userData) {
          const res = await axios.get(`${url}/api/user/me`, {
            headers: { Authorization: `Bearer ${storedToken}` },
          });
          setUserData(res.data);
          localStorage.setItem("userData", JSON.stringify(res.data));
          setNewName({ firstName: res.data.firstName, lastName: res.data.lastName });
        } else {
          setNewName({ firstName: userData.firstName, lastName: userData.lastName });
        }
      } catch (error) {
        console.error("Fetch profile error:", error);
        await logoutHandler(); // حذف الـ token لو فيه مشكلة
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userData, token, setUserData, navigate, url, logoutHandler]);

  if (loading) {
    return (
      <div className="profile-container">
        <p className="loading-text">Loading profile...</p>
      </div>
    );
  }

  const handleLogout = async () => {
    try {
      await logoutHandler();
      setUserData(null);
      localStorage.removeItem("token");
      localStorage.removeItem("userData");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmMessage = "Are you sure you want to delete your account? This action cannot be undone!";
    if (!window.confirm(confirmMessage)) return;
    
    setDeleteLoading(true);
    try {
      const storedToken = token || localStorage.getItem("token");
      if (!storedToken) {
        alert("Please login again");
        navigate("/login");
        return;
      }

      const res = await axios.delete(`${url}/api/user/delete`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });

      if (res.data.success) {
        // Clear all data
        setUserData(null);
        localStorage.removeItem("token");
        localStorage.removeItem("userData");
        localStorage.removeItem("cartIds");
        localStorage.removeItem("favIds");
        
        alert("Account deleted successfully");
        navigate("/register");
      } else {
        alert(res.data.message || "Error deleting account");
      }
    } catch (error) {
      console.error("Delete error:", error);
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("Error deleting account. Please try again.");
      }
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleSaveName = async () => {
    try {
      const storedToken = token || localStorage.getItem("token");
      if (!storedToken) {
        alert("Please login again");
        navigate("/login");
        return;
      }

      if (!newName.firstName.trim() || !newName.lastName.trim()) {
        alert("First name and last name are required");
        return;
      }

      const res = await axios.put(
        `${url}/api/user/update`,
        { firstName: newName.firstName.trim(), lastName: newName.lastName.trim() },
        { headers: { Authorization: `Bearer ${storedToken}` } }
      );

      if (res.data.success) {
        setUserData(res.data.user);
        localStorage.setItem("userData", JSON.stringify(res.data.user));
        setEditMode(false);
        alert("Name updated successfully!");
      } else {
        alert(res.data.message || "Error updating name");
      }
    } catch (error) {
      console.error("Update error:", error);
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("Error updating name. Please try again.");
      }
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <FaUserCircle className="profile-avatar" />
        <h2>Welcome, {userData?.firstName || "User"} 👋</h2>

        <div className="profile-info">
          {editMode ? (
            <div className="edit-section">
              <input
                type="text"
                value={newName.firstName}
                onChange={(e) => setNewName({ ...newName, firstName: e.target.value })}
                placeholder="First Name"
              />
              <input
                type="text"
                value={newName.lastName}
                onChange={(e) => setNewName({ ...newName, lastName: e.target.value })}
                placeholder="Last Name"
              />
              <div className="edit-actions">
                <button className="save-btn" onClick={handleSaveName}><FaCheck /> Save</button>
                <button className="cancel-btn" onClick={() => setEditMode(false)}><FaTimes /> Cancel</button>
              </div>
            </div>
          ) : (
            <>
              <p>
                <strong>Full Name:</strong> {userData?.firstName} {userData?.lastName}{" "}
                <FaEdit className="edit-icon" onClick={() => setEditMode(true)} />
              </p>
              <p><strong>Email:</strong> {userData?.email}</p>
              <p><strong>Joined:</strong> {userData?.createdAt && new Date(userData.createdAt).toLocaleDateString()}</p>
            </>
          )}
        </div>

        <div className="profile-buttons">
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
          <button className="delete-btn" onClick={handleDeleteAccount} disabled={deleteLoading}>
            {deleteLoading ? "Deleting..." : "Delete Account"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
