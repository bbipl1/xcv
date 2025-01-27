// controllers/contactController.js
const Contact = require("../models/contactUsModel");

// @desc    Save contact form data
// @route   POST /api/contact
// @access  Public
exports.contactUs = async (req, res) => {
  try {
    const { name, phone, email, message } = req.body;

    // Validation
    if (!name || !phone  || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Save to the database
    const newContact = new Contact({ name, phone, email, message });
    await newContact.save();

    res.status(201).json({ message: "Contact message saved successfully" });
  } catch (err) {
    console.error("Error saving contact message:", err);
    res.status(500).json({ message: "Server error" });
  }
};
