import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};
//route for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "Người dùng không tồn tại" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = createToken(user._id);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Thông tin xác thực không hợp lệ" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
//route for register
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //check user already exists or not
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "Người dùng tồn tại" });
    }
    //validating email format & strong password
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Vui lòng nhập email hợp lệ",
      });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Vui lòng nhập mật khẩu mạnh",
      });
    }

    //hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
//route for admin
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Admin Email:", process.env.ADMIN_EMAIL);
    console.log("Admin Password:", process.env.ADMIN_PASSWORD);
    console.log("JWT Secret:", process.env.JWT_SECRET);
    if (
      email.trim() === process.env.ADMIN_EMAIL &&
      password.trim() === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "thông tin xác thực không hợp lệ" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { loginUser, registerUser, adminLogin };
