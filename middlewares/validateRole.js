const jwt = require('jsonwebtoken');

const validateRole = (req, res, next) => {
    const bearerToken = req.headers['authorization'];
    if (!bearerToken) {
        return res.status(400).json({ error: 'No bearer token provided' });
    }
    const [tokenType, token] = bearerToken.split(' ');
    // Verify the Role
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY,);
        if (decodedToken.role !== "admin") {
            return res.status(400).json({ error: 'Invalid Role' });
        }
    } catch (error) {
        return res.status(400).json({ error: 'Invalid Role' });
    }
    next();
};


module.exports = validateRole;