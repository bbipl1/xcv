const mongoose = require("mongoose");

const workerSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    unique: false,
  },
  mobile: {
    type: String,
    trim: true,
    required: false,
    unique: false,
  },

  date: {
    type: String,
    trim: true,
    required: true,
    unique: false,
  },

  time: {
    type: String,
    trim: true,
    required: true,
    unique: false,
  },

  day: {
    type: String,
    trim: true,
    required: true,
    unique: false,
  },

  isEditable: { type: Boolean, trim: true, required: true, default: true },

  aadhaarURL: {
    type: String,
    trim: true,
    required: false,
    unique: false,
  },
  panCardURL: {
    type: String,
    trim: true,
    required: false,
    unique: false,
  },
  accountDetailsURL: {
    type: String,
    trim: true,
    required: false,
    unique: false,
  },
  siteEngCurrent: {
    siteEngId: {
      type: String,
      trim: true,
      required: false,
      unique: false,
    },
    siteEngObjId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SiteEngineers",
      trim: true,
      required: false,
      unique: false,
    },
  },
  siteEngOld: [
    {
      siteEngId: {
        type: String,
        trim: true,
        required: false,
        unique: false,
      },
      siteEngObjId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SiteEngineers",
        trim: true,
        required: false,
        unique: false,
      },
    },
  ],
});

const workerModel = mongoose.model("Workers", workerSchema);
module.exports = workerModel;
