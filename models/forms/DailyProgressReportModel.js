const mongoose = require("mongoose");
const schema = {
  id: {
    type: String,
    trim: true,
    required: true,
    unique: false,
  },
  ObjId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SiteEngineers",
    trim: true,
    required: false,
    unique: false,
  },
  name: {
    type: String,
    trim: true,
    required: true,
    unique: false,
  },
  mobile: {
    type: String,
    trim: true,
    required: true,
    unique: false,
  },
  state: {
    type: String,
    trim: true,
    required: true,
    unique: false,
  },
  district: {
    type: String,
    trim: true,
    required: true,
    unique: false,
  },
  block: {
    type: String,
    trim: true,
    required: true,
    unique: false,
  },
  siteName: {
    type: String,
    trim: true,
    required: true,
    unique: false,
  },
  workType: {
    type: String,
    trim: true,
    required: true,
    unique: false,
  },

  todaysWork: [{ type: String, trim: true, required: true, unique: false }],
  machinaryUsed: [{ type: String, trim: true, required: true, unique: false }],
  expenses: {
    Category: [
      {
        type: String,
        trim: true,
        required: true,
        unique: false,
      },
    ],
    required: {
      type: String,
      trim: true,
      required: true,
      unique: false,
    },
    received: {
      type: String,
      trim: true,
      required: false,
      unique: false,
    },
    qrURL: {
      type: String,
      trim: true,
      required: true,
      unique: false,
    },
    status: {
      type: String,
      trim: true,
      required: true,
      unique: false,
      enum: ["Paid", "PartialPaid", "Unpaid"],
      default: "Unpaid",
    },
  },
paymentScreenshots: [
    {
      url: {
        type: String,
        trim: true,
        required: true, 
      },
      uploadedAt: {
        type: String,
        trim: true,
        required: true,  
      },
      remarks: {
        type: String,
        trim: true,
        required: false,
      },
    },
  ],
  photos: [{ type: String, trim: true, required: false, unique: true }],
  videos: [{ type: String, trim: true, required: false, unique: true }],
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
  remarks: {
    type: String,
    trim: true,
    required: true,
    unique: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
};
const DailyProgressReportSchema = new mongoose.Schema(schema);
const DailyProgressReportModel = mongoose.model(
  "DailyProgressReport",
  DailyProgressReportSchema
);
module.exports = DailyProgressReportModel;
