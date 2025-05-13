const EndUser = require("../../models/endUser/EndUserModel");

const createNewEndUser = async (req, res) => {
  try {
    let { firstName, middleName = "", lastName, email, mobile, password, countryCode, gender, dob } = req.body;

    // Trim all required fields
    firstName = firstName.trim();
    middleName = middleName.trim();
    lastName = lastName.trim();
    email = email.trim();
    mobile = mobile.trim();
    password = password.trim();
    countryCode = countryCode.trim();

    // Validate mandatory fields
    if (!firstName || !lastName || !email || !mobile || !password || !countryCode || !gender || !dob) {
      return res.status(400).json({ message: "All fields except middle name are required." });
    }

    const fullname = middleName
      ? `${firstName} ${middleName} ${lastName}`.replace(/\s+/g, " ").trim()
      : `${firstName} ${lastName}`;

    const data = {
      firstName,
      middleName,
      lastName,
      fullname,
      email,
      mobile,
      password,
      isEmailVerified: false,
      isMobileVerified: false,
      countryCode,
      gender,
      dob,
    };

    const newEndUser = new EndUser(data);
    const response = await newEndUser.save();

    if (response) {
      return res.status(200).json({ message: "User created successfully." });
    } else {
      return res.status(501).json({ message: "Server error while creating a new end user." });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = createNewEndUser;
