// jwtConfig.js (or similar)
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: "./config/config.env" });
const secret = process.env.JWT_SECRET_KEY;
const expiration = "10d";

const generateAccessToken = (user) => {
  return jwt.sign({ user }, secret, { expiresIn: expiration });
};

const verifyAccessToken = (req, res, next) => {
  //const authHeader = req.headers.authorization;
  const token = req.cookies?.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
  if (!token) {
    return res.status(401).send("Unauthorized");
  }

  //const token = authHeader.split(" ")[1]; // Assuming 'Bearer <token>' format

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(403).send("Forbidden (Invalid token)");
    }
    req.user = decoded; // Attach user ID to the request object
    next();
  });
};

export { generateAccessToken, verifyAccessToken };
