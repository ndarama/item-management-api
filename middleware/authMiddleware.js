exports.isAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.status(400).json({ message: 'Unauthorized. Please log in.' });
    }
    next();
};

exports.isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden. Admin access required.' });
    }
    next();
};
