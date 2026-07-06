import "./fav.css";
import { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import LotyHendeler from "../../common/lotyhndler/Lotyhndler";
import { StoreContext } from "../../context/StoreContext";
import { displayContext } from "../../context/DisplayContexet";
import axios from "axios";

function FavPro() {
  const { favIds, removeFromFav } = useContext(StoreContext);
  const { url } = useContext(displayContext);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  const getFavProducts = async () => {
    try {
      setLoading(true);
      if (favIds.length > 0) {
        const query = favIds.map((id) => `id=${id}`).join("&");
        const { data } = await axios.get(`${url}/api/product/ByIds?${query}`);
        setRecords(Array.isArray(data) ? data : data.data || []);
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
  }, [favIds]);

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
            <div className="fav-card" key={product._id}>
              <img
                src={
                  product.image && (product.image.startsWith('data:') || product.image.startsWith('http'))
                    ? product.image
                    : product.image
                      ? url + "/images/" + product.image
                      : "https://placehold.co/300x300?text=No+Image"
                }
                onError={(e) => { e.target.src = "https://placehold.co/300x300?text=No+Image" }}
                alt={product.name || product.title}
              />
              <h3>{(product.name || product.title || "").split(" ", 3).join(" ")}</h3>
              <p>${product.price}</p>
              <button
                className="remove-btn"
                onClick={() => removeFromFav(product._id)}
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
