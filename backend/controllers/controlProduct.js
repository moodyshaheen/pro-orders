import proModel from "../models/proModel.js";
import fs from "fs";

// Temporary in-memory storage when DB is not connected
let tempProducts = [];
let tempIdCounter = 1;

// Check if MongoDB is connected
const isDbConnected = () => {
  return proModel.db && proModel.db.readyState === 1;
};

// Add product
export const addPro = async (req, res) => {
  try {
    const productData = {
      name: req.body.name,
      price: Number(req.body.price),
      image: req.file ? req.file.filename : '',
      category: req.body.category,
      rating: Number(req.body.rating),
      still: Number(req.body.still),
      discount: Number(req.body.discount || 0),
      featured: req.body.featured === 'true' || req.body.featured === true,
    };

    if (isDbConnected()) {
      // Use MongoDB
      const newProduct = new proModel(productData);
      const savedProduct = await newProduct.save();
      res.json({ success: true, product: savedProduct });
    } else {
      // Use temporary storage
      const tempProduct = {
        _id: tempIdCounter++,
        ...productData,
        createdAt: new Date()
      };
      tempProducts.push(tempProduct);
      console.log("📦 Product saved to temporary storage (DB not connected)");
      res.json({ success: true, product: tempProduct });
    }
  } catch (err) {
    console.error("Error in addPro:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// List all products
export const listPro = async (req, res) => {
  try {
    if (isDbConnected()) {
      const products = await proModel.find({});
      res.json({ success: true, data: products });
    } else {
      // Return temporary products
      console.log("📦 Returning products from temporary storage");
      res.json({ success: true, data: tempProducts });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error fetching products" });
  }
}

// Remove product
export const removePro = async (req, res) => {
  try {
    if (isDbConnected()) {
      const product = await proModel.findById(req.body.id);
      if (product && product.image) {
        fs.unlink(`uploads/${product.image}`, () => { });
      }
      await proModel.findByIdAndDelete(req.body.id);
    } else {
      // Remove from temporary storage
      const index = tempProducts.findIndex(p => p._id == req.body.id);
      if (index > -1) {
        const product = tempProducts[index];
        if (product.image) {
          fs.unlink(`uploads/${product.image}`, () => { });
        }
        tempProducts.splice(index, 1);
      }
    }
    res.json({ success: true, message: "Product Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error removing product" });
  }
}

export const getProductsByIds = async (req, res) => {
  try {
    const ids = req.query.id;

    if (isDbConnected()) {
      const products = await proModel.find({ _id: { $in: ids } });
      res.json({ success: true, data: products });
    } else {
      // Filter from temporary storage
      const products = tempProducts.filter(p => ids.includes(p._id.toString()));
      res.json({ success: true, data: products });
    }
  } catch (err) {
    res.status(500).json({ success: false });
  }
};