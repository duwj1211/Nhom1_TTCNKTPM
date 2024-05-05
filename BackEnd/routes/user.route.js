const express = require("express");
const router = express.Router();
const { getUsers, signUp } = require('../controllers/user.controller')
const { checkDuplicateEmail } = require('../middleware/verifySignUp')

router.get('/', getUsers);
router.post('/register', checkDuplicateEmail, signUp);

module.exports = router;