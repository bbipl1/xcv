const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  siteEngObjId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SiteEngineers",
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
    unique: false,
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  gender: {
    type: String,
    required: true,
    unique: false,
    trim: true,
  },
  department: {
    type: String,
    required: true,
    trim: true,
    unique: false,
  },
  role: {
    type: String,
    required: true,
    trim: true,
    unique: false,
  },
  joiningYear: {
    type: String,
    required: true,
    trim: true,
    unique: false,
  },
  email: {
    type: String,
    required: false,
    trim: true,
    unique: false,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    unique: false,
  },
  token: {
    type: String,
    required: false,
    trim: true,
    default: null,
    unique: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // only hash if password is modified
  this.password = await bcrypt.hash(this.password, 10); // Hash the password with 10 salt rounds
  next();
});

// Method to compare the entered password with the stored hashed password
userSchema.methods.comparePassword = async function (password) {
  console.log(password);
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
