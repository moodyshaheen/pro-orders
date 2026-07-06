import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

// Temporary users reference (same as in controlUser)
let tempUsers = [];

// Import tempUsers from controlUser - we'll decode token and find user
export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback_secret");
      
      const isDbConnected = userModel.db && userModel.db.readyState === 1;

      if (isDbConnected) {
        const user = await userModel.findById(decoded.id).select("-password");
        if (!user) {
          return res.status(404).json({ success: false, message: "User not found" });
        }
        req.user = user;
      } else {
        // DB not connected - attach decoded id to req for getMe to use
        req.user = { _id: decoded.id };
        req.body.userId = decoded.id;
      }

      next();
    } catch (error) {
      console.error("Token verification error:", error.message);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};
