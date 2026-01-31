import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  deleteUser,
} from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import axios from "axios";

export const displayContext = createContext();

export const DisplayContextProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const url = import.meta.env.VITE_API_URL || "http://localhost:4000";
  
  // Load token and userData from localStorage on mount
  const [token, setToken] = useState(() => {
    return localStorage.getItem("token") || "";
  });
  
  // Load userData from localStorage on mount and verify with backend
  useEffect(() => {
    const loadUserData = async () => {
      const savedToken = localStorage.getItem("token");
      const savedUserData = localStorage.getItem("userData");
      
      // First, load from localStorage immediately for fast UI
      if (savedUserData) {
        try {
          const parsedData = JSON.parse(savedUserData);
          setUserData(parsedData);
        } catch (error) {
          console.error("Error parsing userData from localStorage:", error);
        }
      }
      
      if (savedToken) {
        setToken(savedToken);
        
        // Then verify token and get fresh user data from backend
        try {
          const response = await axios.get(`${url}/api/user/me`, {
            headers: { Authorization: `Bearer ${savedToken}` },
          });
          
          if (response.data && response.data._id) {
            setUserData(response.data);
            localStorage.setItem("userData", JSON.stringify(response.data));
          }
        } catch (error) {
          console.error("Error verifying token:", error);
          // Only clear if it's an authentication error (401, 403)
          if (error.response?.status === 401 || error.response?.status === 403) {
            localStorage.removeItem("token");
            localStorage.removeItem("userData");
            setToken("");
            setUserData(null);
          }
          // Otherwise, keep the localStorage data
        }
      } else if (savedUserData) {
        // If no token but userData exists, clear it
        localStorage.removeItem("userData");
        setUserData(null);
      }
      
      setLoading(false);
    };
    
    loadUserData();
  }, [url]);

  // 🟢 Register Handler
  const registerHandler = async (data) => {
    const { firstName, lastName, email, password } = data;
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);

      await setDoc(doc(db, "users", user.user.uid), {
        id: user.user.uid,
        firstName,
        lastName,
        email,
        createdAt: new Date(),
      });

      return { success: true };
    } catch (error) {
      console.log("Register Error:", error.message);
      return { success: false, message: error.message };
    }
  };

  // 🟢 Login Handler
  const loginHandler = async (data) => {
    const { email, password } = data;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setLoading(true)
      console.log("✅ Login successful");
      return { success: true };
    } catch (error) {
      console.log("Login Error:", error.message);
      return { success: false, message: error.message };
    }finally{setLoading(false)}
  };

  // 🟢 Logout
  // const logoutHandler = async () => {
  //   await signOut(auth);
  //   setUserData(null);
  // };

  // 🟢 Fetch User
  const fetchUser = async (uid) => {
    const docRef = doc(db, "users", uid);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      setUserData(snap.data());
    }
  };

  // Note: Loading state is now managed in loadUserData useEffect above

  const logoutHandler = async () => {
    try {
      await signOut(auth);
      // Clear token and userData from localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("userData");
      setToken("");
      setUserData(null);
      return { success: true };
    } catch (error) {
      console.error("Logout Error:", error.message);
      return { success: false, message: error.message };
    }
  };
  
  // Update localStorage when token changes
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);
  
  // Update localStorage when userData changes
  useEffect(() => {
    if (userData) {
      localStorage.setItem("userData", JSON.stringify(userData));
    } else {
      localStorage.removeItem("userData");
    }
  }, [userData]);

  const contextValue = {
    registerHandler,
    loginHandler,
    logoutHandler,
    userData,
    loading,
    setUserData,
    url,
    token,
    setToken
  };

  return (
    <displayContext.Provider value={contextValue}>
      {children}
    </displayContext.Provider>
  );
};
