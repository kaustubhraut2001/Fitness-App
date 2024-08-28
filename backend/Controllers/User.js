const User = require("../Models/User");
const bcrypt = require("bcrypt");
const { uploadToS3 } = require("../db/Aws-s3");

const Register = async(req, res) => {
    try {

        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            res.status(400).json({ message: "All fields are required" });

        }
        const saltrounds = 10;

        const encryptedpassword = bcrypt.hashSync(password, saltrounds);
        console.log(encryptedpassword);

        // User.save({ name, email, password: encryptedpassword });
        User.create({ name, email, password: encryptedpassword });
        res.status(201).json({ message: "User registered successfully" });



    } catch (error) {
        res.status(500).json({ message: error.message });

    }

};


const Login = async(req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ message: "All fields are required" });

        }


        const userdata = await User.findOne({ email: email });

        const hashpassword = userdata.password;
        const plainpassword = bcrypt.compareSync(password, hashpassword);

        if (!userdata) {
            res.status(401).json({ message: "Invalid email or password" });
        }

        res.json({ message: "User logged in successfully", user: userdata });


    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const forgetpassword = async(req, res) => {
    try {
        const { email, newpassword, confirmpassword } = req.body;

        if (!email) {
            res.status(400).json({ message: "Please enter email" });

        }
        if (newpassword !== confirmpassword) {
            res.status(400).json({ message: "Passwords do not match" });

        }

        const userdata = await User.findOne({ email: email });
        if (!userdata) {
            res.status(404).json({ message: "User not found" });

        }
        const saltrounds = 10;
        const hashpassword = bcrypt.hashSync(newpassword, saltrounds);
        await User.update({ email, password: hashpassword });

        res.status(200).json({ message: "Password updated" });


    } catch (error) {
        res.status(500).json({ message: error.message });

    }
};

const updateprofile = async(req, res) => {
    try {
        const { email, name, age, gender, height, weight } = req.body;
        console.log(req.body);
        const profilePicture = req.file;
        console.log(profilePicture, "12344");

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        let imageUrl = null;
        if (profilePicture) {
            imageUrl = await uploadToS3(profilePicture);

        }
        const updatedUser = await User.findOneAndUpdate({ email }, { profilePicture: imageUrl }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "Profile updated successfully", user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: error.message + "123" });
    }
};







module.exports = {
    Register,
    Login,
    forgetpassword,
    updateprofile,

};