const mongoose = require("mongoose");
const schema = {
  siteEngObjId: {
    type: mongoose.Schema.Types.ObjectId, //user object id
    ref: "SiteEngineers",
    trim: true,
    unique: false,
    required: true,
  },
  siteEngId: {
    type: String,
    trim: true,
    unique: false,
    required: true,
  },
  date: {
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
  time: {
    type: String,
    trim: true,
    required: true,
    unique: false,
  },
  siteLocation: {
    latitude: {
      type: String,
      trim: true,
      required: true,
      unique: false,
    },
    longitude: {
      type: String,
      trim: true,
      required: true,
      unique: false,
    },
    address: {
      type: String,
      trim: true,
      required: true,
      unique: false,
    },
  },

  URL: {
    type: String,
    trim: true,
    required: false,
    unique: false,
  },
  
  workers: [
    {
      objId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Workers",
        trim: true,
        required: true,
      },
      photoURL: {
        type: String,
        trim: true,
        required: true,
        unique: true,
      },
    },
  ],
};
const siteEngAttendanceSchema = new mongoose.Schema(schema);
const siteEngAttendanceModel = mongoose.model(
  "SiteEngAttendance",
  siteEngAttendanceSchema
);
module.exports = siteEngAttendanceModel;
