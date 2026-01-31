import { createContext, useContext } from "react";
import axios from "axios";
import { StoreContext } from "./StoreContext";
import { displayContext } from "./DisplayContexet";

export const FavContext = createContext();

export const FavContextProvider = ({ children }) => {
  const { records, cartIds } = useContext(StoreContext);
  const { userData, token, url } = useContext(displayContext);

  // Filter items that are in cart
  const items = Array.isArray(records)
    ? records
        .map((value) => ({
          ...value,
          amount: cartIds[value._id] || 0,
        }))
        .filter((item) => item.amount > 0)
    : [];

  const placeOrder = async (total) => {
    // Check if user is logged in (token is required)
    if (!token || token.trim() === "") {
      return { success: false, message: "Please login to place an order" };
    }

    // Check if userData exists (additional verification)
    if (!userData) {
      return { success: false, message: "Please login to place an order" };
    }

    // Check if cart is empty
    if (items.length === 0) {
      return { success: false, message: "Your cart is empty" };
    }

    try {
      const response = await axios.post(
        `${url}/api/order/place`,
        {
          items,
          total,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        return { success: true, message: "Order placed successfully!", order: response.data.order };
      } else {
        // If token is invalid, clear it
        if (response.data.message?.includes("Not Authorized") || response.data.message?.includes("login")) {
          localStorage.removeItem("token");
          localStorage.removeItem("userData");
        }
        return { success: false, message: response.data.message || "Failed to place order" };
      }
    } catch (error) {
      console.error("Place order error:", error);
      
      // If unauthorized, clear token
      if (error.response?.status === 401 || error.response?.data?.message?.includes("Not Authorized")) {
        localStorage.removeItem("token");
        localStorage.removeItem("userData");
        return { success: false, message: "Please login again to place an order" };
      }
      
      return {
        success: false,
        message: error.response?.data?.message || error.message || "Failed to place order",
      };
    }
  };

  return (
    <FavContext.Provider value={{ placeOrder }}>
      {children}
    </FavContext.Provider>
  );
};
