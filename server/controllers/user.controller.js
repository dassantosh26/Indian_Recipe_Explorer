/** @format */

import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({ username, email, password: hashedPassword });

    await newUser.save();
    return res.status(201).json({
      message: "Registered successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ error: "Invalid email or password", success: false });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "4h" }
    );

    return res.status(200).json({
      message: `Welcome back ${user.username}`,
      token,
      username: user.username,
      success: true,
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res
      .status(500)
      .json({ message: error.message || error, error: true, success: false });
  }
};

export const logoutUser = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logout Successfully",
      success: true,
      error: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
