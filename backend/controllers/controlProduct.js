import proModel from "../models/proModel.js";

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
    console.log("📝 Adding product with data:", req.body);
    console.log("📷 Image file:", req.file ? "Present" : "Not provided");

    let imageData = '';

    // Handle image upload for Vercel
    if (req.file) {
      // Convert image to base64 for storage
      const imageBase64 = req.file.buffer.toString('base64');
      const imageMimeType = req.file.mimetype;
      imageData = `data:${imageMimeType};base64,${imageBase64}`;
      console.log("📷 Image converted to base64, size:", imageBase64.length);
    }

    const productData = {
      name: req.body.name,
      price: Number(req.body.price),
      image: imageData, // Store base64 image or empty string
      category: req.body.category,
      rating: Number(req.body.rating) || 0,
      still: Number(req.body.still) || 0,
      discount: Number(req.body.discount || 0),
      featured: req.body.featured === 'true' || req.body.featured === true,
    };

    console.log("📦 Product data prepared:", {
      ...productData,
      image: productData.image ? `[Base64 image ${productData.image.length} chars]` : 'No image'
    });

    if (isDbConnected()) {
      // Use MongoDB
      const newProduct = new proModel(productData);
      const savedProduct = await newProduct.save();
      console.log("✅ Product saved to MongoDB");
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
    console.error("❌ Error in addPro:", err);
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
    console.log("🗑️ Removing product with ID:", req.body.id);

    if (isDbConnected()) {
      const product = await proModel.findById(req.body.id);
      // No need to delete files in Vercel (images are stored as base64)
      await proModel.findByIdAndDelete(req.body.id);
      console.log("✅ Product removed from MongoDB");
    } else {
      // Remove from temporary storage
      const index = tempProducts.findIndex(p => p._id == req.body.id);
      if (index > -1) {
        tempProducts.splice(index, 1);
        console.log("✅ Product removed from temporary storage");
      }
    }
    res.json({ success: true, message: "Product Removed" });
  } catch (error) {
    console.error("❌ Error removing product:", error);
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