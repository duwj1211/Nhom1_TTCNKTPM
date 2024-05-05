const express = require("express");
const router = express.Router();
const { signIn, signUp, verifyToken } = require('../controllers/auth.controller')

router.post('/login', signIn);
router.post('/register', signUp);
router.post('/verify-token', verifyToken);

module.exports = router;