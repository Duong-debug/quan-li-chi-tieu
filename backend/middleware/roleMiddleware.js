const jwt = require('jsonwebtoken');

// Middleware to check if user has required role
const requireRole = (roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'Authentication required' });
        }

        const userRole = req.user.role;

        // Check if user's role is in the allowed roles array
        if (!roles.includes(userRole)) {
            return res.status(403).json({
                message: 'Access denied. Insufficient permissions.',
                requiredRole: roles,
                userRole: userRole
            });
        }

        next();
    };
};

// Convenience middleware functions
const requireAdmin = () => requireRole(['admin']);
const requireManager = () => requireRole(['manager', 'admin']);
const requireUser = () => requireRole(['user', 'manager', 'admin']);

module.exports = {
    requireRole,
    requireAdmin,
    requireManager,
    requireUser
};
