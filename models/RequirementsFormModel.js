const mongoose = require("mongoose");
const requirementsFormSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: false,
  },
  id: {
    type: String,
    required: true,
    trim: true,
    unique: false,
  },
  mobile: {
    type: String,
    required: true,
    trim: true,
    unique: false,
  },

  state: {
    type: String,
    required: true,
    trim: true,
    unique: false,
  },
  district: {
    type: String,
    required: true,
    trim: true,
    unique: false,
  },
  block: {
    type: String,
    required: true,
    trim: true,
    unique: false,
  },
  siteName: {
    type: String,
    required: true,
    trim: true,
    unique: false,
  },
  workType: {
    type: String,
    required: true,
    trim: true,
    unique: false,
  },
  materialUsed: [
    {
      name: {
        type: String,
        required: true,
        trim: true,
        unique: false,
      },
      quantity: {
        type: String,
        required: true,
        trim: true,
        unique: false,
      },
      price: {
        type: String,
        required: true,
        trim: true,
        unique: false,
      },
      remarks: {
        type: String,
        required: true,
        trim: true,
        unique: false,
      },
    },
  ],
  requirements: { type: String, required: true, trim: true, unique: false },
  dateOfRequirement: {
    type: String,
    required: true,
    trim: true,
    unique: false,
  },
  date: {
    type: String,
    required: true,
    trim: true,
    unique: false,
  },
  time: {
    type: String,
    required: true,
    trim: true,
    unique: false,
  },
  day: {
    type: String,
    required: true,
    trim: true,
    unique: false,
  },
  remarks: {
    type: String,
    required: false,
    trim: true,
    unique: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const requirementsFormModel = mongoose.model(
  "requirementsForms",
  requirementsFormSchema
);
module.exports = requirementsFormModel;
