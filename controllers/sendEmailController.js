const nodemailer = require("nodemailer");
// const dotenv = require("dotenv");

// Load environment variables from .env file
// dotenv.config();

// Create a transporter using SMTP settings (replace with your own provider's credentials)
const transporter = nodemailer.createTransport({
  host: "businessbasket.in", // Example: Gmail
  port:465,
  secure:true,
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS, // Your email password or app-specific password
  },
});

// @route   POST /api/send-email
// @desc    Send an email
// @access  Public
const sendEmail = async (req, res) => {
  const { to, subject, text, html } = req.body;

  // Validation
  if (!to || !subject || !text) {
    return res.status(400).json({ message: "Missing required fields" });
  }

//   console.log(req.body)

  // Set up the email data
  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender address
    to, // Recipient address
    subject, // Subject line
    text, // Plain text body
    // html, // HTML body (optional)
  };

  try {
    // Send the email
    const info = await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully", info });
  } catch (err) {
    console.error("Error sending email:", err);
    res.status(500).json({ message: "Error sending email", error: err.message });
  }
};

module.exports = { sendEmail };
