const mongoose = require("mongoose");

// Define the schema for the AttendanceForm data
const AttendanceOfDevAndFinSchema = new mongoose.Schema(
  {
    empId: {
      type: String,
      trim:true,
      required: true,
      unique:false
      
    },
    empName: {
      type: String, // Employee's name
      required: true,
      trim:true
    },
    empMobile: {
      type: String, // Employee's name
      required: true,
      trim:true
    },
    empEmail: {
      type: String, // Employee's name
      required: false,
      trim:true
    },
    empRole: {
      type: String, // Employee's name
      required: true,
      trim:true
    },

    geoCoordinates: [
      {
        latitude: {
          type: String,
          trim: true,
          required: true,
        },
        longitude: {
          type: String,
          trim: true,
          required: true,
        },
      },
    ],

    date: {
      type: String, // The date of attendance
      required: true,
      trim: true,
    },
    day: {
      type: String, // The day of the week
      required: true,
      trim: true,
    },

    time: {
      type: String, // Time of the report submission
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create the model using the schema
const AttendanceOfDevAndFinModel = mongoose.model(
  "AttendanceOfDevAndFin",
  AttendanceOfDevAndFinSchema
);

module.exports = AttendanceOfDevAndFinModel;
