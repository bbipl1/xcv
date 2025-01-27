const Contact = require("../models/contactUsModel");

// @desc    Get all Contact Us messages
// @route   GET /api/contact
// @access  Public
const getAllContactusMessages = async (req, res) => {
  try {
    // Fetch all contacts from the database
    const contacts = await Contact.find().sort({ createdAt: -1 }); // Sort by most recent
    res.status(200).json(contacts);
  } catch (err) {
    console.error("Error fetching contact messages:", err);
    res.status(500).json({ message: "Server error while fetching contact messages." });
  }
};

module.exports = { getAllContactusMessages };
