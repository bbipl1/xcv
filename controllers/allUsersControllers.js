const User = require('../models/userModel'); // Import the User model

// Controller function to get all users from the database
const getAllUsers = async (req, res) => {
  try {
    // Fetch all users from the User model
    const users = await User.find();

    // Send the response with the list of users
    res.status(200).json({
      success: true,
      data: users
    });
  } catch (error) {
    // Handle any errors that occur during the database query
    console.error('Error fetching users:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve users',
      error: error.message
    });
  }
};

module.exports = { getAllUsers };
