const router = require("express").Router();
const User = require("../Controllers/User");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post(
    "/register",
    User.Register
);

router.post(
    "/login",
    User.Login
);
router.post(
    "/forgot-password",
    User.forgetpassword
);
router.post(
    "/updateuserprofile", upload.single('profilePicture'),
    User.updateprofile
);

module.exports = router;