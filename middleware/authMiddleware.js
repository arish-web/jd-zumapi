import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ msg: "Unauthorized. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_jwt_secret");
    req.user = decoded; // attach user data to request
    next(); // ✅ go to next middleware or controller
  } catch (err) {
    return res.status(401).json({ msg: "Invalid or expired token." });
  }
};
