const User = require("../../../models/userModel");
// const bcrypt = require("bcrypt");

const findNextId = (ids,departmentCode) => {
  if (!ids.length) return `BB-${departmentCode}-2025-0001`; // Default if no IDs exist

  // Extract and sort IDs
  const sortedIds = ids.sort((a, b) => {
    const extractNumber = (str) => {
      const numPart = str.substring(7); // Remove "BB-CON-"
      const [year, num] = numPart.split("-").map(Number);
      return [year, num];
    };

    const [yearA, numA] = extractNumber(a);
    const [yearB, numB] = extractNumber(b);

    return yearA === yearB ? numA - numB : yearA - yearB;
  });

  // Get last ID
  const lastId = sortedIds[sortedIds.length - 1];

  // Extract year & number
  const lastYear = lastId.substring(7, 11); // YYYY
  const lastNumber = Number(lastId.substring(12)); // NNNN

  // Generate next ID
  const nextNumber = String(lastNumber + 1).padStart(4, "0"); // Ensure 4-digit format
  return `BB-${departmentCode}-${lastYear}-${nextNumber}`;
};


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
    const users=await User.find({$and:[{department},{joiningYear}]});
    const ids = users.map(user => user.id); 
    const nextId=findNextId(ids,departmentCode);
    // const count = await User.countDocuments({ department, joiningYear }) + 1;
    // const id = `BB-${departmentCode}-${joiningYear}-${String(count).padStart(4, '0')}`;
    console.log(nextId);

    // Check if user already exists (by mobile or email)
    const existingUser = await User.findOne({ $or: [{ mobile }, { nextId }] });
    if (existingUser) {
      return res.status(409).json({ message: `User already exists with this id-${nextId} or mobile-${mobile}`});
    }

    // Hash the password before saving
    // const hashedPassword = await bcrypt.hash(password, 10);

    // Prepare user payload
    const payload = {
      id:nextId,
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

    console.log("User added successfully:", nextId);
    return res.status(201).json({ message: "User added successfully", userId: nextId });

  } catch (error) {
    console.error("Error adding user:", error);
    return res.status(500).json({ message: "Server error. Please try again." });
  }
};

module.exports = addNewUser;
