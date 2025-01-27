const User = require('../models/userModel'); // Import the User model

// Controller function to get user by ID
const getUserById = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    // Fetch the user by ID, selecting only specific fields
    const user = await User.findById({empId:userId}, 'empName empMobile empEmail empRole'); // Adjust the field names based on your schema

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Send the response with the selected user details
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    // Handle any errors that occur during the database query
    console.error('Error fetching user:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve user',
      error: error.message,
    });
  }
};

module.exports = { getUserById };
