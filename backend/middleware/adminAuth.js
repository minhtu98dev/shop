import jwt from "jsonwebtoken";
const adminAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Tách token từ "Bearer <token>"
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.json({
        success: false,
        message: "not authorized login again ",
      });
    }
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    const info = process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD;

    if (token_decode !== info) {
      return res.json({
        success: false,
        message: "not authorized login again",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
export default adminAuth;
