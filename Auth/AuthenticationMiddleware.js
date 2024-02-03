const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');
    console.log('JWT_SECRET IS.....:', JWT_SECRET);
    if (!token) return res.status(401).json({ message: 'Access denied. Token missing.' });

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            console.error('Error verifying token:', err);
            return res.status(403).json({ message: 'Invalid token.' });
        }
        console.log('DECODED TOKEN IS:', decoded);
        req.user = decoded;
        next();
    });
};

module.exports = authenticateToken;
