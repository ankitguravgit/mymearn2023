const express = require('express');
const jwt = require('jsonwebtoken');

// Define a middleware function to validate the bearer token
const validateBearerToken = (req, res, next) => {
    // Get the bearer token from the Authorization header
    const bearerToken = req.headers['authorization'];

    // Check if the bearer token is present
    if (!bearerToken) {
        return res.status(401).json({ error: 'No bearer token provided' });
    }

    // Split the bearer token into the token type and the token value
    const [tokenType, token] = bearerToken.split(' ');

    // Check if the token type is Bearer
    if (tokenType !== 'Bearer') {
        return res.status(401).json({ error: 'Invalid token type' });
    }
    // Verify the token
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY,);
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }

    // The token is valid, so next()
    next();
};

module.exports = validateBearerToken;