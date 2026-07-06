import mongoose from "mongoose";

let isConnected = false;

export const connectDb = async () => {
   if (isConnected) return;

   try {
      const mongoUri = process.env.MONGODB_URI || "mongodb+srv://moshaheen616_db_user:1234599m@cluster0.qx2csmy.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0";

      const options = {
         serverSelectionTimeoutMS: 30000,
         socketTimeoutMS: 45000,
         bufferCommands: false,
      };

      await mongoose.connect(mongoUri, options);
      isConnected = true;
      console.log("✅ Database Connected Successfully to MongoDB Atlas");

   } catch (error) {
      console.error("❌ Database connection failed:", error.message);
      isConnected = false;
   }
}
