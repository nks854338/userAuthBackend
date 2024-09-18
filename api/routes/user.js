const express = require('express');
const {landing, handleUserSignUp, handleUserLogin} = require("../controllers/user");

const router = express.Router();
router.use(express.urlencoded({ extended: true }));

router.route("/").get(landing);
router.route("/signin").post(handleUserSignUp);
router.route("/login").post(handleUserLogin);

module.exports = router;