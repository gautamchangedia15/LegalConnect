// jwtConfig.js (or similar)
import jwt from 'jsonwebtoken'

const secret = process.env.JWT_SECRET_KEY;
const expiration = '1h';

module.exports = {
  generateAccessToken: (userId) => {
    return jwt.sign({ userId }, secret, { expiresIn: expiration });
  },
  verifyAccessToken: (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).send('Unauthorized');
    }

    const token = authHeader.split(' ')[1]; // Assuming 'Bearer <token>' format

    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.status(403).send('Forbidden (Invalid token)');
      }
      req.userId = decoded.userId; // Attach user ID to the request object
      next();
    });
  },
};
