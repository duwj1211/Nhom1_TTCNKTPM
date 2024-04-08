const express = require("express");
const router = express.Router();
const { signIn, signUp } = require('../controllers/auth.controller')

router.get('/login', signIn);
router.post('/register', signUp);

module.exports = router;