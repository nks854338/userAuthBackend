const express = require('express');
const {handleUserSignUp, handleUserLogin} = require("../controllers/user");

const router = express.Router();
router.use(express.urlencoded({ extended: true }));

router.route("/").post(handleUserSignUp);
router.route("/login").post(handleUserLogin);

module.exports = router;