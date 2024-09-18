const express = require('express');
const { handleUserSignUp, handleUserLogin, getAllUser } = require("../controllers/user");
const { cheakForAuthentication, restrictTo } = require("../middleware/auth");

const router = express.Router();
router.use(express.urlencoded({ extended: true }));

// Public routes
router.route("/").post(handleUserSignUp);
router.route("/login").post(handleUserLogin);

// Protected route
router.route("/user")
    .get(cheakForAuthentication, restrictTo(['user', 'admin']), getAllUser);

module.exports = router;
