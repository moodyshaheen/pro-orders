import React, { useEffect, useState, useContext } from 'react';
import './cart.css';
import { Link } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import LotyHendeler from '../../common/lotyhndler/Lotyhndler';
import { displayContext } from '../../context/DisplayContexet';
import { FavContext } from '../../context/FavProContext';

function Cart() {

  const {
    cartIds, getAllPro, records,
    addTocart, ilode, deleteTocart,
    deleteAllFromCart, clearcart
  } = useContext(StoreContext);

  const { userData, url, token } = useContext(displayContext);
  const { placeOrder } = useContext(FavContext);

  const [isloding, setIloading] = useState(false);

useEffect(() => {
  getAllPro();
}, [cartIds]); // لو محتاج تحديث كل ما الـ cartIds تتغير


  // فلترة المنتجات اللي ليها amount
  const cartProducts = records
    .map(val => ({
      ...val,
      amount: cartIds[val._id] || 0
    }))
    .filter(val => val.amount > 0);

  // إجمالي السعر
  const finalyPrice = cartProducts.reduce((a, b) => {
    const totalPrice = b.price - (b.price * b.discount / 100);
    return a + (totalPrice * b.amount);
  }, 0);

  // Place order
  const handelPlaceOrder = async (total) => {
    // Check if user is logged in (both token and userData are required)
    if (!token || token.trim() === "" || !userData) {
      alert("Please login to place an order");
      window.location.href = "/login";
      return;
    }

    // Check if cart is empty
    if (cartProducts.length === 0) {
      alert("Your cart is empty");
      return;
    }

    const confirmDelete = window.confirm("Are you sure you want to place the order?");
    if (!confirmDelete) return;

    setIloading(true);

    try {
      const res = await placeOrder(total);
      if (res.success) {
        // Clear cart after successful order
        clearcart();
        alert("Order placed successfully!");
      } else {
        alert(res.message || "Failed to place order");
      }
    } catch (error) {
      console.error("Place order error:", error);
      alert("An error occurred while placing the order");
    } finally {
      setIloading(false);
    }
  };


  return (
    <div className='Cart'>

      <p>Your <span>Cart</span></p>

      {/* حالة التحميل */}
      {ilode ? (
        <LotyHendeler status={'page'} />
      ) : cartProducts.length === 0 ? (
        /* لو مفيش منتجات */
        <div className='fdsjfoo'>
          <p className="no-products fmsdof">No products added.</p>
          <Link className='dsfff' to={'/'}> Go To Add Products </Link>
        </div>
      ) : (
        /* عرض المنتجات */
        <div className='foffmsd'>
          {cartProducts.map((val, index) => (
            <div className="continer" key={index}>

              <div className="imgejds">
                <img src={url + '/images/' +val.image} alt="" />
              </div>

              <p className="fksdf">
                {val.title}
              </p>

              <div className="priceto">
                <p className="wefj">price: ${val.price}</p>

                <p className="fsdf">
                  total:
                  ${(val.price - (val.price * val.discount / 100)) * val.amount}
                </p>
              </div>

              <div className="plum">
                <button
                  className={`plus ${val.amount >= val.stock ? "none" : ""}`}
                  onClick={() => addTocart(val._id)}
                >
                  +
                </button>

                <span>{val.amount}</span>

                <button
                  className={`muns ${val.amount === 0 ? "none" : ""}`}
                  onClick={() => deleteTocart(val._id)}
                >
                  -
                </button>

                <b>Amount ({val.stock})</b>
              </div>

              <button
                className='sfsf'
                onClick={() => deleteAllFromCart(val)}
              >
                Remove From Cart
              </button>
            </div>
          ))}

          {/* إجمالي السعر */}
          <div className="totoakfsd">
            <p>Total:</p>
            <p>${finalyPrice.toFixed(2)}</p>
          </div>
        </div>
      )}

      {/* Place order button - only show if user is logged in */}
      {cartProducts.length > 0 && (
        <div className='fwfjof'>
          {token && token.trim() !== "" && userData ? (
            <button
              className='btn btn-dark'
              onClick={() => handelPlaceOrder(finalyPrice)}
              disabled={isloding}
            >
              {isloding ? "Loading..." : "Place Order"}
            </button>
          ) : (
            <div style={{ textAlign: "center", padding: "20px" }}>
              <p style={{ marginBottom: "10px", color: "#666" }}>
                Please login to place an order
              </p>
              <Link to="/login" className="btn btn-primary">
                Login
              </Link>
            </div>
          )}
        </div>
      )}

    </div>
  );
}

export default Cart;
