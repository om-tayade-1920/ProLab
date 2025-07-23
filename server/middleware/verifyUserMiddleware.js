import jwt from "jsonwebtoken";
import userModel from "../model/userModel.js";

const verifyUserMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer "))
      return res.status(401).json({ message: "Unauthorized" });

    const token = authHeader.split(" ")[1];
    

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    
    req.user = await userModel.findById(decoded.id).select("-password");

    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

export default verifyUserMiddleware;