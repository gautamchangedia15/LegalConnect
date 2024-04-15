// authMiddleware.js

const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    // Check if the token is present in cookies or headers
    const token = req.cookies?.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Unauthorized: Invalid token' });
        }

        // Store decoded user information in req.user
        req.user = decoded;
        next(); // Call the next middleware or route handler
    });
};

module.exports = verifyToken;
