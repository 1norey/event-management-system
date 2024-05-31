const jwt = require('jsonwebtoken');

// Middleware function for verifying JWT token
exports.verifyToken = function (req, res, next) {
    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

// Middleware function for checking user role
exports.checkRole = function (role) {
    return function (req, res, next) {
        if (req.user.role !== role) {
            return res.status(403).json({ msg: 'Access denied' });
        }
        next();
    };
};
