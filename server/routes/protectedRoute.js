// /routes/protectedRoute.js
const express = require('express');
const authenticate = require('../middleware/authMiddleware'); // Ensure this is the middleware you created
const router = express.Router();

// Protected route to get user profile
router.get('/profile', authenticate, async (req, res) => {
    try {
        const user = req.user; // Access user info from the decoded token
        res.status(200).json({
            message: 'Profile data for authenticated user',
            user: {
                userId: user.userId,
                firstName: user.firstName,
                lastName: user.lastName
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
