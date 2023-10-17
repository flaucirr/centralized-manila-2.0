// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const { sequelize, User } = require("./models"); // Initialize your Sequelize models

// const app = express();

// app.use(bodyParser.json());
// app.use(cors());

// app.post("/auth", async (req, res) => {
//   const { mobileNo, userPass } = req.body;

//   // Find the user by mobile number in the database
//   const user = await User.findOne({ where: { mobileNo } });
//   console.log('user is found')

//   if (!user) {
//     return res.status(401).json({ message: "User not found" });
//   }

//   // Check if the password matches
//   if (!bcrypt.compareSync(userPass, user.userPass)) {
//     return res.status(401).json({ message: "Invalid password" });
//   }

//   // Create and return a JSON Web Token (JWT) for the user
//   const token = jwt.sign({ userId: user.user_id }, "12345");
//   res.json({ token });
// });
