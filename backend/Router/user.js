const router = require("express").Router();
const User = require("../Controllers/User");

router.post(
    "/register",
    User.Register
);

router.post(
    "/login",
    User.Login
);


module.exports = router;