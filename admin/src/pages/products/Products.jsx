import React, { useState, useEffect } from 'react';
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const url = import.meta.env.VITE_API_URL || "https://pro-orders-46b5.vercel.app";
  
  // Debug logging
  console.log("🔗 Admin Panel API URL:", url);
  console.log("🌍 Environment:", import.meta.env.MODE);
  console.log("📝 VITE_API_URL:", import.meta.env.VITE_API_URL);
  console.log("🛠️ Attempting to connect to:", `${url}/api/product/list`);
  
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    still: "",
    rating: "",
    discount: "",
    featured: false,
    image: null,
    imageFile: null,
    _id: null,
  });

  const renderStars = (count) => "⭐".repeat(Number(count));

  // ---------------- Handlers ----------------
  const onchangeHandler = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleOpenModal = (product = null) => {
    if (product) {
      setFormData({
        ...product,
        imageFile: null,
      });
      setEditMode(true);
    } else {
      setFormData({
        name: "",
        category: "",
        price: "",
        still: "",
        rating: "",
        discount: "",
        featured: false,
        image: null,
        imageFile: null,
        _id: null,
      });
      setEditMode(false);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    // Reset form data when closing modal
    setFormData({
      name: "",
      category: "",
      price: "",
      still: "",
      rating: "",
      discount: "",
      featured: false,
      image: null,
      imageFile: null,
      _id: null,
    });
    setEditMode(false);
    setShowModal(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        imageFile: file,
        image: URL.createObjectURL(file),
      }));
    }
  };

  // ---------------- Save / Update ----------------
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log("🚀 Submitting product data...");
      console.log("📋 Current form data:", formData);
      
      // Validate required fields
      if (!formData.name || !formData.name.trim()) {
        alert("⚠ Product name is required!");
        return;
      }
      
      if (!formData.category || !formData.category.trim()) {
        alert("⚠ Product category is required!");
        return;
      }
      
      if (!formData.price || formData.price <= 0) {
        alert("⚠ Product price must be greater than 0!");
        return;
      }
      
      console.log("📍 Endpoint:", editMode ? `${url}/api/product/update/${formData._id}` : `${url}/api/product/add`);
      
      const fd = new FormData();
      fd.append("name", formData.name.trim());
      fd.append("category", formData.category.trim());
      fd.append("price", formData.price.toString());
      fd.append("still", formData.still.toString() || "0");
      fd.append("rating", formData.rating.toString() || "0");
      fd.append("discount", formData.discount.toString() || "0");
      fd.append("featured", formData.featured.toString());

      if (formData.imageFile) {
        fd.append("image", formData.imageFile);
        console.log("📷 Image file attached:", formData.imageFile.name);
      }

      const endpoint = editMode
        ? `${url}/api/product/update/${formData._id}`
        : `${url}/api/product/add`;

      console.log("📤 Sending request to:", endpoint);

      const response = await axios.post(endpoint, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("📥 Response received:", response.data);

      if (response.data.success) {
        alert(editMode ? "Product Updated!" : "Product Added!");
        
        // Reset form data
        setFormData({
          name: "",
          category: "",
          price: "",
          still: "",
          rating: "",
          discount: "",
          featured: false,
          image: null,
          imageFile: null,
          _id: null,
        });
        
        // Reset edit mode
        setEditMode(false);
        
        // Refresh products list
        fetchProducts();
        
        // Close modal
        setShowModal(false);
      } else {
        console.error("❌ Backend returned error:", response.data.message);
        alert(`Error: ${response.data.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("❌ Request failed:", error);
      console.error("📊 Error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        url: error.config?.url
      });
      
      if (error.response?.data?.message) {
        alert(`⚠ Error: ${error.response.data.message}`);
      } else if (error.message.includes('Network Error')) {
        alert("⚠ Network Error: Cannot connect to server. Check your internet connection.");
      } else {
        alert("⚠ Error saving product. Check console for details.");
      }
    }
  };

  // ---------------- Delete ----------------
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    const respons = await axios.post(`${url}/api/product/remove`, { id: id });
    console.log("Deleting product with id:", id);
    if (respons.data.success) {
      alert("Product Deleted!");
    } else {
      alert("⚠ Error deleting product");
      return;
    }

    fetchProducts();
  };

  // ---------------- Fetch Products ----------------
  const fetchProducts = async () => {
    setLoading(true);
    const res = await axios.get(`${url}/api/product/list`);
    if (res.data.success) setProducts(res.data.data);
    setLoading(false);
  };

  const removepro = (foodId) => {

  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-5">
      <h3 className="mb-4 text-2xl font-semibold text-gray-800">Products Management</h3>

      <button 
        className="bg-blue-600 text-white px-5 py-2.5 rounded-md mb-3 hover:bg-blue-700 transition-colors duration-200 cursor-pointer" 
        onClick={() => handleOpenModal()}
      >
        + Add New Product
      </button>

      <div className="bg-white rounded-xl p-5 shadow-md">
        <table className="w-full border-collapse">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left font-semibold text-gray-800 border-b-2 border-gray-200">Image</th>
              <th className="p-3 text-left font-semibold text-gray-800 border-b-2 border-gray-200">Product</th>
              <th className="p-3 text-left font-semibold text-gray-800 border-b-2 border-gray-200">Category</th>
              <th className="p-3 text-left font-semibold text-gray-800 border-b-2 border-gray-200">Price</th>
              <th className="p-3 text-left font-semibold text-gray-800 border-b-2 border-gray-200">Still</th>
              <th className="p-3 text-left font-semibold text-gray-800 border-b-2 border-gray-200">Rating</th>
              <th className="p-3 text-left font-semibold text-gray-800 border-b-2 border-gray-200">Discount</th>
              <th className="p-3 text-left font-semibold text-gray-800 border-b-2 border-gray-200">Featured</th>
              <th className="p-3 text-left font-semibold text-gray-800 border-b-2 border-gray-200">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="9" className="text-center py-4">
                  <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                </td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center py-4 text-gray-500 text-lg">
                  ⚠️ No products found.
                </td>
              </tr>
            ) : (
              products.map((p) => (
                <tr key={p._id} className="hover:bg-gray-50">
                  <td className="p-3 border-b border-gray-200">
                    <img
                      src={
                        p.image?.startsWith("http")
                          ? p.image
                          : `${url}/images/${p.image}`
                      }
                      className="w-[50px] h-[50px] rounded-lg object-cover"
                      alt={p.name}
                    />
                  </td>

                  <td className="p-3 border-b border-gray-200">{p.name}</td>
                  <td className="p-3 border-b border-gray-200">{p.category}</td>
                  <td className="p-3 border-b border-gray-200">${p.price}</td>
                  <td className="p-3 border-b border-gray-200">{p.still}</td>

                  <td className="p-3 border-b border-gray-200">
                    {renderStars(p.rating)}{" "}
                    <span className="text-gray-500">({p.rating})</span>
                  </td>

                  <td className="p-3 border-b border-gray-200">{p.discount}%</td>

                  <td className="p-3 border-b border-gray-200">
                    {p.featured ? (
                      <span className="px-2.5 py-1 rounded-xl text-xs font-semibold bg-cyan-500 text-black">Yes</span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-xl text-xs font-semibold bg-gray-500 text-white">No</span>
                    )}
                  </td>

                  <td className="p-3 border-b border-gray-200">
                    <button
                      className="px-3 py-1.5 text-sm border border-blue-600 text-blue-600 rounded-md mr-2 hover:bg-blue-50 transition-colors duration-200 cursor-pointer"
                      onClick={() => handleOpenModal(p)}
                    >
                      ✏️
                    </button>

                    <button
                      className="px-3 py-1.5 text-sm border border-red-600 text-red-600 rounded-md hover:bg-red-50 transition-colors duration-200 cursor-pointer"
                      onClick={() => handleDelete(p._id)}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ---------------- MODAL ---------------- */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="flex justify-between items-center p-5 border-b border-gray-200">
              <h5 className="text-lg font-semibold text-gray-800">
                {editMode ? "Edit Product" : "Add Product"}
              </h5>
              <button 
                type="button" 
                className="text-gray-400 hover:text-gray-600 text-xl leading-none"
                onClick={handleCloseModal}
              >
                ×
              </button>
            </div>

            <div className="p-5">
              <input 
                className="w-full p-2.5 border border-gray-300 rounded-md mb-2 outline-none focus:border-blue-500" 
                name="name"
                value={formData.name} 
                onChange={onchangeHandler}
                placeholder="Product Name" 
              />

              <select 
                className="w-full p-2.5 border border-gray-300 rounded-md mb-2 outline-none focus:border-blue-500" 
                name="category"
                value={formData.category} 
                onChange={onchangeHandler}
              >
                <option value="">Select Category</option>
                <option value="Fashion">Fashion</option>
                <option value="Electronics">Electronics</option>
                <option value="Jewelry">Jewelry</option>
              </select>

              <input 
                className="w-full p-2.5 border border-gray-300 rounded-md mb-2 outline-none focus:border-blue-500" 
                type="number" 
                name="price"
                value={formData.price} 
                onChange={onchangeHandler}
                placeholder="Price" 
              />

              <input 
                className="w-full p-2.5 border border-gray-300 rounded-md mb-2 outline-none focus:border-blue-500" 
                type="number" 
                name="still"
                value={formData.still} 
                onChange={onchangeHandler}
                placeholder="Still Quantity" 
              />

              <input 
                className="w-full p-2.5 border border-gray-300 rounded-md mb-2 outline-none focus:border-blue-500" 
                type="number" 
                name="rating"
                value={formData.rating} 
                onChange={onchangeHandler}
                placeholder="Rating" 
              />

              <input 
                className="w-full p-2.5 border border-gray-300 rounded-md mb-2 outline-none focus:border-blue-500" 
                type="number" 
                name="discount"
                value={formData.discount} 
                onChange={onchangeHandler}
                placeholder="Discount (%)" 
              />

              <div className="flex items-center gap-2 mt-2">
                <input 
                  className="w-[18px] h-[18px] cursor-pointer" 
                  type="checkbox"
                  name="featured" 
                  checked={formData.featured}
                  onChange={onchangeHandler} 
                />
                <label className="cursor-pointer">Featured</label>
              </div>

              <label className="block mt-3 mb-2 font-medium text-gray-700">Product Image</label>
              <input 
                type="file" 
                accept="image/*" 
                className="w-full p-2.5 border border-gray-300 rounded-md mb-2 outline-none focus:border-blue-500"
                onChange={handleImageChange} 
              />
            </div>

            <div className="flex justify-end gap-3 p-5 border-t border-gray-200">
              <button 
                className="px-5 py-2.5 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors duration-200 cursor-pointer" 
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button 
                className="px-5 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 cursor-pointer" 
                onClick={handleSubmit}
              >
                {editMode ? "Update Product" : "Add Product"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
