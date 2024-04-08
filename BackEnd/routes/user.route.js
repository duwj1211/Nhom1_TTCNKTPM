const express = require("express");
const router = express.Router();
const { getUsers, signUp } = require('../controllers/user.controller')

router.get('/', getUsers);
router.post('/register', signUp);

module.exports = router;