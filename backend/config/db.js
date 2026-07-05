import mongoose from "mongoose";

export const connectDb = async () => {
   try {
      const mongoUri = process.env.MONGODB_URI || "mongodb+srv://moshaheen616_db_user:1234599m@cluster0.qx2csmy.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0";

      console.log("🔄 Attempting to connect to MongoDB...");
      console.log("📍 Connection URI:", mongoUri.replace(/\/\/.*@/, '//***:***@')); // Hide credentials in logs

      // Modern connection options (no deprecated options)
      const options = {
         serverSelectionTimeoutMS: 10000, // Increase timeout for Atlas
         socketTimeoutMS: 45000,
      };

      await mongoose.connect(mongoUri, options);

      if (mongoUri.includes('localhost')) {
         console.log("✅ Database Connected Successfully to Local MongoDB");
      } else {
         console.log("✅ Database Connected Successfully to MongoDB Atlas");
      }
   } catch (error) {
      console.error("❌ Database connection failed:", error.message);

      if (error.message.includes('authentication failed')) {
         console.log("🔑 Authentication Error: Please check your MongoDB username and password");
      } else if (error.message.includes('ENOTFOUND')) {
         console.log("🌐 DNS Error: Please check your cluster URL or internet connection");
      } else if (error.message.includes('ECONNREFUSED')) {
         console.log("🔌 Connection Refused: MongoDB is not running locally");
         console.log("💡 To install MongoDB locally:");
         console.log("   1. Download from: https://www.mongodb.com/try/download/community");
         console.log("   2. Or use MongoDB Atlas (cloud) by updating MONGODB_URI in .env");
      }

      console.log("⚠️  Server will continue running with temporary storage");
      console.log("🔧 Products will be saved in memory until database connects");
   }
}