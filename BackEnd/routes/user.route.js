const express = require("express");
const router = express.Router();
const { getUsers, signUp, getInfo, udpateInfo, changePassword } = require('../controllers/user.controller')
const { checkDuplicateEmail } = require('../middleware/verifySignUp')
const { verifyToken } = require("../middleware/authJwt");

router.get('/', getUsers);
router.get('/info',verifyToken, getInfo);
router.post('/update-info',verifyToken, udpateInfo);
router.post('/change-password',verifyToken, changePassword);
router.post('/register', checkDuplicateEmail, signUp);

module.exports = router;