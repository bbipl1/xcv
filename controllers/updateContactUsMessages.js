const Contact = require("../models/contactUsModel");

// @route   PUT /api/update-contact
// @desc    Update the contact message with response details
// @access  Public (or restricted based on your auth requirements)
exports.updateContactUsMessages = async (req, res) => {
  const { id, responseMethod, responseMessage, status } = req.body;

  // Validation
  if (!id || !responseMethod || !responseMessage || !status) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Update the contact document
    const updatedContact = await Contact.findByIdAndUpdate(
      id,
      {
        responseMethod,
        sentMessage: responseMessage, // Store the sent message from admin
        status, // Update the status to either 'Pending' or 'Complete'
      },
      { new: true } // Return the updated document
    );

    if (!updatedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    // Respond with the updated contact info
    res.status(200).json({
      message: "Contact updated successfully",
      updatedContact,
    });
  } catch (err) {
    console.error("Error updating contact:", err);
    res.status(500).json({ message: "Server error" });
  }
};
