import "./fav.css";
import { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import LotyHendeler from "../../common/lotyhndler/Lotyhndler";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

function FavPro() {
  const { favIds, removeFromFav } = useContext(StoreContext);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🟢 جلب تفاصيل المنتجات المفضلة من الـ API
  const getFavProducts = async () => {
    try {
      setLoading(true);
      if (favIds.length > 0) {
        const query = favIds.map((id) => `id=${id}`).join("&");
        const { data } = await axios.get(`http://localhost:3000/products?${query}`);
        setRecords(data);
      } else {
        setRecords([]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFavProducts();
  }, [favIds]); // 🟢 يحدث تلقائيًا عند الإضافة أو الحذف

  if (loading) return <LotyHendeler status="page" />;

  return (
    <div className="fav-container">
      <h2>
        Your <span>Favorites ❤️</span>
      </h2>

      {records.length === 0 ? (
        <div className="empty-fav">
          <p>No favorite products yet.</p>
          <Link to="/" className="back-btn">
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="fav-grid">
          {records.map((product) => (
            <div className="fav-card" key={product.id}>
              <img src={product.image} alt={product.title} />
              <h3>{product.title.split(" ", 3).join(" ")}</h3>
              <p>${product.price}</p>
              <button
                className="remove-btn"
                onClick={() => removeFromFav(product.id)}
              >
                Remove 
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FavPro;
