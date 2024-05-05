const express = require("express");
const router = express.Router();
const { signIn, signUp, verifyToken } = require('../controllers/auth.controller')
const { checkDuplicateEmail } = require('../middleware/verifySignUp')

router.post('/login', signIn);
router.post('/register', checkDuplicateEmail, signUp);
router.post('/verify-token', verifyToken);

module.exports = router;