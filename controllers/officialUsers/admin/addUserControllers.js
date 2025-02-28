const User = require("../../../models/userModel");
// const bcrypt = require("bcrypt");

const addNewUser = async (req, res) => {
  try {
    let { name, mobile, email, department, role, gender, password } = req.body;

    // Trim inputs
    name = name?.trim();
    mobile = mobile?.trim();
    email = email?.trim();
    department = department?.trim();
    role = role?.trim();
    gender = gender?.trim();
    password = password?.trim();

    // Validate required fields
    if (!name || !mobile || !department || !role || !gender || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    

    // Auto-generate Employee ID
    const joiningYear = new Date().getFullYear();
    const departmentCode = department.substring(0, 3).toUpperCase(); // First 3 letters of department
    const count = await User.countDocuments({ department, joiningYear }) + 1;
    const id = `BB-${departmentCode}-${joiningYear}-${String(count).padStart(4, '0')}`;

    // Check if user already exists (by mobile or email)
    const existingUser = await User.findOne({ $or: [{ mobile }, { id }] });
    if (existingUser) {
      return res.status(409).json({ message: `User already exists with this id-${id} or mobile-${mobile}`});
    }

    // Hash the password before saving
    // const hashedPassword = await bcrypt.hash(password, 10);

    // Prepare user payload
    const payload = {
      id,
      name,
      mobile,
      email,
      department,
      role,
      gender,
      password,
      joiningYear
    };

    // Save user to database
    const newUser = new User(payload);
    await newUser.save();

    console.log("User added successfully:", id);
    return res.status(201).json({ message: "User added successfully", userId: id });

  } catch (error) {
    console.error("Error adding user:", error);
    return res.status(500).json({ message: "Server error. Please try again." });
  }
};

module.exports = addNewUser;
