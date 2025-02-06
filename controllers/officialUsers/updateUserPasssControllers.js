const User = require("../../models/userModel");
const bcrypt = require("bcryptjs");
const updateUserpass = async (req, res) => {
  try {
    console.log(req.body);
    let { idOrMob, oldPass, newPass, confirmNewPass } = req.body;
    idOrMob = idOrMob.trim();
    oldPass = oldPass.trim();
    newPass = newPass.trim();
    confirmNewPass = confirmNewPass.trim();

    if (!idOrMob || !oldPass || !newPass || !confirmNewPass) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (newPass !== confirmNewPass) {
      return res.status(401).json({ message: "All fields are required." });
    }
    const filter = { $or: [{ id: idOrMob }, { mobile: idOrMob }] };

    const user = await User.findOne(filter);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    // const isPassmatched = await user.comparePassword(oldPass);
    // if (!isPassmatched) {
    //   return res.status(401).json({ message: "invalid credentials." });
    // }

    const hashedpass = await bcrypt.hash(newPass, 10);

    const data = { password: hashedpass };

    const response = await User.findOneAndUpdate(filter, data, { new: true });
    console.log(response);
    if (response) {
      return res.status(200).json({ message: "password updated successfully" });
    } else {
      return res.status(501).json({ message: "unable to update password." });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = updateUserpass;
