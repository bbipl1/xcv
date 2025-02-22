const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../../models/userModel");
router.post("/src/login", async (req, res) => {
  try {
    let { id, mobile, password } = req.body;
    console.log(req.body);
    id = id?.trim();
    mobile = mobile?.trim();
    if (!id && !mobile) {
      return res.status(400).json({ message: "id or mobile is required." });
    }

    console.log(id);
    console.log(mobile);

    let filter = {};
    if (id) {
      filter = { id };
    } else if (mobile) {
      filter = { mobile };
    }

    if(!filter){
        return res.status(400).json({message:"All fields are required."});
    }

    if (password.trim() !== "IAmYourPassword") {
      return res.status(404).json({ message: "password is invalid" });
    }

    const user = await User.findOne(filter);

    const token = jwt.sign(
      { userId: user._id, id: user.id, mobile: user.mobile },
      process.env.JWT_SECRET || "your_jwt_secret", // Use your own secret key here
      { expiresIn: "1h" } // Token expires in 1 hour
    );

    const data = {
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        mobile: user.mobile,
        role: user.role,
        department: user.department,
        email: user.email,
        objId: user._id,
        siteEngObjId: user.siteEngObjId,
      },
    };

    console.log(user);

    if (user) {
      return res.status(200).json(data);
    } else {
      return res.status(404).json({ message: "user found." });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
