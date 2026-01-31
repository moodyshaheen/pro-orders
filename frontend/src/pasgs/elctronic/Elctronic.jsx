import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { StoreContext } from "../../context/StoreContext";
import { displayContext } from "../../context/DisplayContexet";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import "./Elctronic.css";

function Electronic() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [counts, setCounts] = useState({});
  const [isDisableBtn, setIsDisableBtn] = useState(null);
  const [isDisableFav, setIsDisableFav] = useState(null);

  const { addTocart, cartIds, addToFav, favIds, removeFromFav } =
    useContext(StoreContext);

  const { url } = useContext(displayContext);

  const productFullInfo = products.map((product) => ({
    ...product,
    amount: cartIds[product._id] || 0,
    isFav: favIds.includes(product._id),
  }));

  const handleAddCart = (prod) => {
    setIsDisableBtn(prod._id);
    addTocart(prod._id);

    setTimeout(() => setIsDisableBtn(null), 800);

    setTimeout(() => {
      if (cartIds[prod._id] === 1) {
        Swal.fire({
          title: `Added ${prod.title} successfully!`,
          text: "Go see your cart",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        toast.success(`You have ${cartIds[prod._id]} of ${prod.title}`);
      }
    }, 900);
  };

  const handleFav = (prod) => {
    setIsDisableFav(prod._id);
    if (favIds.includes(prod._id)) {
      removeFromFav(prod._id);
      toast.error(`${prod.title} removed from favorites`);
    } else {
      addToFav(prod._id);
      toast.success(`${prod.title} added to favorites`);
    }
    setTimeout(() => setIsDisableFav(null), 700);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(
          url + "/api/product/list?category=Electronics"
        );
        setProducts(res.data.data);

        const customCategories = [
          { key: "all" },
          { key: "Jewelry" },
          { key: "Clothing" },
          { key: "Accessories" },
        ];

        const countObj = { all: res.data.data.length };
        customCategories.forEach((cat) => {
          if (cat.key !== "all") {
            countObj[cat.key] = res.data.data.filter(
              (p) => p.category === cat.key
            ).length;
          }
        });
        setCounts(countObj);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [url]);

  const loaderGif = "/loder.gif";

  return (
    <div className="sectionWrapper">
      <h2 className="sectionTitle">Electronic</h2>
      <p className="sectionSubtitle">
        Handpicked selections from our premium collection
      </p>

      <div className="productsContainer">
        {isLoading ? (
          <div className="loader">
            <img src={loaderGif} alt="Loading..." />
          </div>
        ) : products.length === 0 ? (
          <p className="noProductsMsg">No products in this category.</p>
        ) : (
          productFullInfo.map((prod) => (
            <div className="productCard" key={prod._id}>
              <div className="productImageWrapper">
                <img src={url + "/images/" + prod.image} alt={prod.title} />
              </div>
              <div className="productInfo">
                <h3 className="productTitle">{prod.title}</h3>
                <div className="productPrices">
                  <span className="productPrice">${prod.price}</span>
                  {prod.oldPrice && (
                    <span className="productOldPrice">${prod.oldPrice}</span>
                  )}
                </div>
                <div className="productRating">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      style={{ color: "#ffd600", fontSize: "18px" }}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <div className="infoText">
                  <p>
                    You Can Add <span className="infoText">({prod.amount})</span>
                  </p>
                  <p>
                    Still{" "}
                    <span className="stockText">
                      ({prod.stock ? prod.stock - prod.amount : "N/A"})
                    </span>
                  </p>
                </div>
                <div className="productActions">
                  <button
                    className={`fav-btn ${prod.isFav ? "disabledBtn" : ""}`}
                    onClick={() => handleFav(prod)}
                    disabled={isDisableFav === prod._id}
                  >
                    {isDisableFav === prod._id ? (
                      <div
                        className="spinner-border text-light"
                        style={{ width: "20px", height: "20px" }}
                      ></div>
                    ) : (
                      <FaHeart className="iconHeart" />
                    )}
                  </button>

                  <button
                    className={`cart-btn ${
                      prod.amount >= prod.stock ? "disabledBtn" : ""
                    }`}
                    onClick={() => handleAddCart(prod)}
                    disabled={isDisableBtn === prod._id}
                  >
                    {isDisableBtn === prod._id ? (
                      <div
                        className="spinner-border text-light"
                        style={{ width: "20px", height: "20px" }}
                      ></div>
                    ) : (
                      <FaShoppingCart className="iconCart" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Electronic;
