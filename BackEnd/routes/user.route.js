const express = require("express");
const User = require('../models/user.model');
const router = express.Router();
const { getUsers, createUser } = require('../controllers/user.controller')

router.get('/', getUsers);
router.post('/register', createUser);

module.exports = router;