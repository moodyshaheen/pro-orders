import axios from "axios";
import { useEffect, createContext, useState, useContext } from "react";// update AI //
import Swal from "sweetalert2";
import {displayContext} from "./DisplayContexet"
export const StoreContext = createContext();

export const StoreContextProvider = ({ children }) => {
  const {token , userData , url} = useContext(displayContext)
  const [cartIds, setCartIds] = useState({});
  const [favIds, setFavIds] = useState([]); 
  const [records, setRecords] = useState([]);
  const [recordserr, setRecordsErr] = useState(null);
  const [ilode, setIsLode] = useState(false);
  const [isLoadedFromLocal, setIsLoadedFromLocal] = useState(false);

  // 🟢 Load cart from database when user logs in
  useEffect(() => {
    const loadCartFromDB = async () => {
      if (token && userData) {
        try {
         const response = await axios.post(
          `${url}/api/cart/get`,
          {},
          {
            headers :{Authorization : `Bearer ${token}`}
          }
         )
        
         if(response.data.success && response.data.cartData){
            setCartIds(response.data.cartData)
         }
         
        } catch (error) {
          console.error("Error loading cart from database:", error);
          // Fallback to localStorage if API fails
          const savedCart = localStorage.getItem("cartIds");
          if (savedCart) {
             setCartIds(JSON.parse(savedCart));
          }
        }
      } else {
        // If not logged in, load from localStorage
        try {
          const savedCart = localStorage.getItem("cartIds");
          const savedFav = localStorage.getItem("favIds");
          setCartIds(savedCart ? JSON.parse(savedCart) : {});
          setFavIds(savedFav ? JSON.parse(savedFav) : []);
        } catch (err) {
          console.error("Error loading from localStorage:", err);
          setCartIds({});
          setFavIds([]);
        }
      }
      setIsLoadedFromLocal(true);
    };
    loadCartFromDB();
  }, [token, userData]); // update AI //

  // 🟢 حفظ cart + fav في localStorage
  useEffect(() => {
    if (isLoadedFromLocal) {
      localStorage.setItem("cartIds", JSON.stringify(cartIds));
      localStorage.setItem("favIds", JSON.stringify(favIds));
    }
  }, [cartIds, favIds, isLoadedFromLocal]);

  // 🟢 Add to cart
  const addTocart = async (_id) => {
    // Update local state immediately for better UX
    setCartIds((prev) => ({
      ...prev,
      [_id]: (prev[_id] || 0) + 1,
    }));

    // If user is logged in, sync with backend
    if (token) {
      try {
        await axios.post(
          `${url}/api/cart/add`,
          { itemId: _id, quantity: 1 },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } catch (error) {
        console.error("Error adding to cart:", error);
        // Revert local state on error
        setCartIds((prev) => {
          const updated = { ...prev };
          if (updated[_id] > 1) {
            updated[_id]--;
          } else {
            delete updated[_id];
          }
          return updated;
        });
      }
    }// update AI //
  };

  // 🟢 Remove 1 from cart
  const deleteTocart = async (_id) => {
    // Update local state immediately
    const currentQuantity = cartIds[_id] || 0;
    const newQuantity = currentQuantity > 1 ? currentQuantity - 1 : 0;
    
    setCartIds((prev) => {
      const updated = { ...prev };
      if (updated[_id] > 1) {
        updated[_id]--;
      } else {
        delete updated[_id];
      }
      return updated;
    });

    // If user is logged in, sync with backend
    if (token) {
      try {
        if (newQuantity === 0) {
          // Remove completely
          await axios.post(
            `${url}/api/cart/remove`,
            { itemId: _id },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
        } else {
          // Update quantity
          await axios.post(
            `${url}/api/cart/update`,
            { itemId: _id, quantity: newQuantity },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
        }
      } catch (error) {
        console.error("Error updating cart:", error);
        // Revert on error
        setCartIds((prev) => ({
          ...prev,
          [_id]: currentQuantity,
        }));
      }
    }// update AI //
  };

  // 🟢 Remove product completely from cart
  const deleteAllFromCart = (product) => {
    Swal.fire({
      title: `Are you sure you want to delete ${product.title || product.name}?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "red",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const productId = product._id;
        // Update local state immediately
        setCartIds((prev) => {
          const updated = { ...prev };
          delete updated[productId];
          return updated;
        });

        // If user is logged in, sync with backend
        if (token) {
          try {
            await axios.post(
              `${url}/api/cart/remove`,
              { itemId: productId },
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );
          } catch (error) {
            console.error("Error removing from cart:", error);
            // Revert on error
            setCartIds((prev) => ({
              ...prev,
              [productId]: cartIds[productId],
            }));
            Swal.fire({
              title: "Error!",
              text: "Failed to remove product from cart.",
              icon: "error",
            });
            return;
          }
        }// update AI //

        Swal.fire({
          title: "Deleted!",
          text: "Your product has been removed.",
          icon: "success",
          timer: 1500,
        });
      }
    });
  };

  // 🟢 إضافة للمفضلة
  const addToFav = (_id) => {
    setFavIds((prev) => {
      if (prev.includes(_id)) return prev;
      return [...prev, _id];
    });
  };

  // 🟢 حذف من المفضلة
  const removeFromFav = (_id) => {
    setFavIds((prev) => prev.filter((id) => id !== _id));
  };

  // 🟢 جلب كل المنتجات في السلة
  const getAllPro = async () => {
    const allIds = Object.keys(cartIds).filter((id) => id && id !== "undefined");

    const queryString = allIds.map((id) => `id=${id}`).join("&");
    console.log("queryString:", queryString);

    try {
      setIsLode(true);

      if (allIds.length > 0) {
        const { data } = await axios.get(
          `${url}/api/product/ByIds?${queryString}`
        );
setRecords(Array.isArray(data) ? data : data.data || []);
      } else {
        setRecords([]);
      }
    } catch (error) {
      setRecordsErr(error.message);
    } finally {
      setIsLode(false);
    }
  };

  // 🟢 Clear cart completely
  const clearcart = async () => {
    // Clear local state
    setCartIds({});
    setRecords([]);

    // If user is logged in, clear cart in database
    // Note: You might want to add a clear endpoint in backend
    if (token) {
      try {
        // Get all cart items and remove them one by one
        const cartItemIds = Object.keys(cartIds);
        await Promise.all(
          cartItemIds.map((itemId) =>
            axios.post(
              `${url}/api/cart/remove`,
              { itemId },
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            )
          )
        );
      } catch (error) {
        console.error("Error clearing cart:", error);
      }
    }// update AI //
  };

  const contextValue = {
    addTocart,
    deleteTocart,
    deleteAllFromCart,
    addToFav,
    removeFromFav,
    getAllPro,
    cartIds,
    favIds,
    records,
    recordserr,
    ilode,
    clearcart,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};
