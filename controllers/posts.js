const express = require('express');
const verifyToken = require('../middleware/verify-token.js');
const Post = require('../models/post.js');
const router = express.Router();

// ========== Public Routes ===========

// ========= Protected Routes =========



//anything bellow this the user has to sign in
router.use(verifyToken);












module.exports = router;





