import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import validator from "validator";
import { connectDb } from "../config/db.js";

// Temporary in-memory storage when DB is not connected
let tempUsers = [];
let tempUserIdCounter = 1;

// Check if MongoDB is connected
const isDbConnected = () => {
  return userModel.db && userModel.db.readyState === 1;
};

// Helper function: create JWT token
const createToken = (id, userData = {}) => {
  return jwt.sign({ id, ...userData }, process.env.JWT_SECRET || "fallback_secret", { expiresIn: "7d" });
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    await connectDb();
    console.log("🔐 Login attempt for email:", email);

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required"
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format"
      });
    }

    let user;

    if (isDbConnected()) {
      // Use MongoDB
      user = await userModel.findOne({ email });
    } else {
      // Use temporary storage
      user = tempUsers.find(u => u.email === email);
      console.log("🔍 Searching in temporary storage, found:", user ? "Yes" : "No");
    }

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    const token = createToken(user._id);
    console.log("✅ Login successful for:", email);

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      },
      message: "Login successful!"
    });
  } catch (error) {
    console.error("❌ Login error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during login"
    });
  }
};

// Register user
const registerUser = async (req, res) => {
  const { firstName, lastName, email, password, passwordConfirm, confirmPassword } = req.body;
  const passConfirm = passwordConfirm || confirmPassword;
  try {
    await connectDb();
    console.log("📝 Registration attempt for:", email);

    // Validate required fields
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format"
      });
    }

    // Validate password length
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long"
      });
    }

    // Check password confirmation if provided
    if (passConfirm && password !== passConfirm) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match"
      });
    }

    // Check if user already exists
    let existingUser;
    if (isDbConnected()) {
      existingUser = await userModel.findOne({ email });
    } else {
      existingUser = tempUsers.find(u => u.email === email);
    }

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists"
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      createdAt: new Date()
    };

    let user;

    if (isDbConnected()) {
      // Use MongoDB
      const newUser = new userModel(userData);
      user = await newUser.save();
      console.log("✅ User saved to MongoDB");
    } else {
      // Use temporary storage
      user = {
        _id: tempUserIdCounter++,
        ...userData
      };
      tempUsers.push(user);
      console.log("✅ User saved to temporary storage");
    }

    const token = createToken(user._id, {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email
    });

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      },
      message: "Registration successful!"
    });
  } catch (error) {
    console.error("❌ Registration error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during registration"
    });
  }
};

// Get logged-in user
const getMe = async (req, res) => {
  try {
    // If protect middleware found user in DB
    if (req.user && req.user.firstName) {
      return res.status(200).json({
        success: true,
        user: {
          _id: req.user._id,
          firstName: req.user.firstName,
          lastName: req.user.lastName,
          email: req.user.email,
          createdAt: req.user.createdAt
        }
      });
    }

    // DB not connected - decode token directly to get basic info
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback_secret");
      
      // Try DB lookup
      if (isDbConnected()) {
        const user = await userModel.findById(decoded.id).select("-password");
        if (user) {
          return res.status(200).json({
            success: true,
            user: {
              _id: user._id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              createdAt: user.createdAt
            }
          });
        }
      }

      // Fallback: return info embedded in token
      return res.status(200).json({
        success: true,
        user: { 
          _id: decoded.id, 
          firstName: decoded.firstName || "User", 
          lastName: decoded.lastName || "", 
          email: decoded.email || ""
        }
      });
    }

    return res.status(401).json({ success: false, message: "Not authorized" });
  } catch (error) {
    console.error("❌ Get user error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get all users (Admin only)
const getAllUsers = async (req, res) => {
  try {
    let users;

    if (isDbConnected()) {
      users = await userModel.find().select("-password").sort({ createdAt: -1 });
    } else {
      users = tempUsers.map(user => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      }).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    res.status(200).json({
      success: true,
      data: users,
      count: users.length
    });
  } catch (error) {
    console.error("❌ Get all users error:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

// Update user profile
const updateUser = async (req, res) => {
  try {
    const { userId } = req.body;
    const { firstName, lastName } = req.body;

    if (!firstName || !lastName) {
      return res.status(400).json({
        success: false,
        message: "First name and last name are required"
      });
    }

    let user;

    if (isDbConnected()) {
      user = await userModel.findByIdAndUpdate(
        userId,
        {
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          updatedAt: new Date()
        },
        { new: true, runValidators: true }
      ).select("-password");
    } else {
      const userIndex = tempUsers.findIndex(u => u._id == userId);
      if (userIndex === -1) {
        return res.status(404).json({
          success: false,
          message: "User not found"
        });
      }

      tempUsers[userIndex] = {
        ...tempUsers[userIndex],
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        updatedAt: new Date()
      };

      const { password, ...userWithoutPassword } = tempUsers[userIndex];
      user = userWithoutPassword;
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      user,
      message: "Profile updated successfully!"
    });
  } catch (error) {
    console.error("❌ Update user error:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

// Delete user account
const deleteUser = async (req, res) => {
  try {
    const { userId } = req.body;

    let user;

    if (isDbConnected()) {
      user = await userModel.findByIdAndDelete(userId);
    } else {
      const userIndex = tempUsers.findIndex(u => u._id == userId);
      if (userIndex === -1) {
        return res.status(404).json({
          success: false,
          message: "User not found"
        });
      }

      user = tempUsers[userIndex];
      tempUsers.splice(userIndex, 1);
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "User account deleted successfully"
    });
  } catch (error) {
    console.error("❌ Delete user error:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

// Get user orders count
const getUserOrdersCount = async (userId) => {
  try {
    if (isDbConnected()) {
      const orderModel = (await import("../models/orderModel.js")).default;
      const count = await orderModel.countDocuments({ userId });
      return count;
    } else {
      // For temporary storage, return 0 for now
      return 0;
    }
  } catch (error) {
    console.error("❌ Get user orders count error:", error);
    return 0;
  }
};

export {
  loginUser,
  registerUser,
  getMe,
  getAllUsers,
  getUserOrdersCount,
  updateUser,
  deleteUser
};