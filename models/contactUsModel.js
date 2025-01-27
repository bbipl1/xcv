// models/Contact.js
const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    match: [/^[0-9]{10}$/, "Please enter a valid mobile number"],
  },
  email: {
    type: String,
    required: false,
    trim: true,
    match: [/.+@.+\..+/, "Please enter a valid email address"],
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
  sentMessage: {
    type: String,
    required: false,
    trim: true,
  },
  responseMethod: {
    type: String,
    required: false,
    enum: ["phone", "email", "both"], // Define valid response methods
    default: "email",
  },
  status: {
    type: String,
    enum: ["Pending", "Complete"],
    default: "Pending", // Default is "Pending"
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("ContactUs", ContactSchema);
