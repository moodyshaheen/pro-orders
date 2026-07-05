import { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./Category.css";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { StoreContext } from "../../context/StoreContext";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { displayContext } from "../../context/DisplayContexet";

const customCategories = [
  { key: "all", label: "All" },
  { key: "fashion", label: "Fashion" },
  { key: "Electronics", label: "Electronics" },
  { key: "Jewelry", label: "Jewelry" },
];

function Categories() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
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

  // --------------------------------------------
  // 🟢 Fetch all products once on mount
  // --------------------------------------------
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(url + "/api/product/list");
        setProducts(res.data.data);

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
      }
    };
    fetchData();
  }, []);

  // --------------------------------------------
  // 🟢 Fetch products based on category
  // --------------------------------------------
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        let endpoint = url + "/api/product/list";

        if (selectedCategory !== "all") {
          endpoint = `${url}/api/product/list?category=${selectedCategory}`;
        }

        const res = await axios.get(endpoint);
        setProducts(res.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  const handleAddCart = (prod) => {
    setIsDisableBtn(prod._id);
    addTocart(prod._id);

    setTimeout(() => {
      setIsDisableBtn(null);
    }, 800);

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

  const loaderGif = "/loder.gif";

  return (
    <div className="category-section">
      <h2 className="category-title">Featured Products</h2>
      <p className="category-subtitle">
        Handpicked selections from our premium collection
      </p>

      <div className="category-pills">
        {customCategories.map((cat) => (
          <button
            key={cat.key}
            className={`pill-btn ${
              selectedCategory === cat.key ? "active" : ""
            }`}
            onClick={() => setSelectedCategory(cat.key)}
          >
            {cat.label}
            <span className="pill-count">
              {counts[cat.key] || 0}
            </span>
          </button>
        ))}
      </div>

      <div className="products-list">
        {isLoading ? (
          <div className="loader">
            <img src={loaderGif} alt="Loading..." />
          </div>
        ) : products.length === 0 ? (
          <p className="no-products">No products in this category.</p>
        ) : (
          productFullInfo.map((prod) => (
            <div className="product-card" key={prod._id}>
              <div className="product-img">
                <img src={url + "/images/" + prod.image} alt={prod.title} />
              </div>

              <div className="product-count">
                <h3 className="product-titel">{prod.title}</h3>

                <div className="product-prices">
                  <span className="product-price">${prod.price}</span>
                  {prod.oldPrice && (
                    <span className="product-oldprice">${prod.oldPrice}</span>
                  )}
                </div>

                <div className="product-rating">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} style={{ color: "#ffd600", fontSize: "18px" }}>
                      ★
                    </span>
                  ))}
                </div>

                <div className="infro">
                  <p className="grf">
                    You Can Add <span className="foldm">({prod.still})</span>
                  </p>
                  <p>
                    Still{" "}
                    <span className="fprkf">
                      ({prod.stock ? prod.stock - prod.still : "N/A"})
                    </span>
                  </p>
                </div>

                <div className="product-action">
                  <button
                    className={`fav-btn ${prod.isFav ? "hjir" : ""}`}
                    onClick={() => handleFav(prod)}
                    disabled={isDisableFav === prod._id}
                  >
                    {isDisableFav === prod._id ? (
                      <div
                        className="spinner-border text-light"
                        style={{ width: "20px", height: "20px" }}
                      ></div>
                    ) : (
                      <FaHeart className="wefk" />
                    )}
                  </button>

                  <button
                    className={`cart-btn ${
                      prod.amount >= prod.stock ? "hjir" : ""
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
                      <FaShoppingCart className="tyu" />
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

export default Categories;
