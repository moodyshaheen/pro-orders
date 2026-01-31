import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { displayContext } from "../context/DisplayContexet";

const ProtectedRoute = ({ children }) => {
  const { token, userData } = useContext(displayContext);

  // Check if user is logged in
  // Check both from context and localStorage as fallback
  const tokenFromStorage = localStorage.getItem("token");
  const userDataFromStorage = localStorage.getItem("userData");
  
  const hasToken = (token && token.trim() !== "") || (tokenFromStorage && tokenFromStorage.trim() !== "");
  const hasUserData = userData || userDataFromStorage;

  const isAuthenticated = hasToken && hasUserData;

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the protected component
  return children;
};

export default ProtectedRoute;

