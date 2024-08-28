const User = require("../Models/User");
const bcrypt = require("bcrypt");

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

}


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











module.exports = {
    Register,
    Login
};