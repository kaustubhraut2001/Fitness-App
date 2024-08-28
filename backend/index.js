const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const ConnectToDB = require("./db/dbconnect");
const app = express();

app.use(express.json());

ConnectToDB();

const port = process.env.PORT || 8000;

app.use("/user", require("./Router/user"));

app.listen(port, () => {
    console.log(`Listing on port ${port}`);
});