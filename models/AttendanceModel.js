const mongoose = require('mongoose');

// Define the schema for the AttendanceForm data
const attendanceFormSchema = new mongoose.Schema(
  {
    accountDetailsImageURL: {
      type: String, // URL for the account details image
      required: true,
    },
    date: {
      type: Date, // The date of attendance
      required: true,
    },
    day: {
      type: String, // The day of the week
      required: true,
    },
    employeeId: {
      type: String, // Employee ID
      required: true,
      unique: true, // Ensuring the employee ID is unique
    },
    employeeName: {
      type: String, // Employee's name
      required: true,
    },
    expenses: {
      type: String, // Expenses amount or description
      required: true,
    },
    expensesType: {
      type: String, // Type of expenses
      required: true,
    },
    geoCoordinates: {
      type: String, // GeoCoordinates as a string (e.g., lat, long)
      required: false, // Optional, in case you need to process geo data
    },
    paymentsStatus: {
      type: String, // Payment status (e.g., received, pending)
      required: true,
      enum: ['Received', 'Pending'],
    },
    progressReportDescription: {
      type: String, // Description of the progress report
      required: true,
    },
    progressReportVideo: {
      type: String, // URL for the progress report video
      required: true,
    },
    selfie: [{
        imageUrl:{
            type: String, 
            required: true,
        },
        geoCoordinates:{
            type: String,
            required: true,
        }
    }],
    siteLocation: {
      type: String, // Location of the site
      required: true,
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
const AttendanceForm = mongoose.model('AttendanceForm', attendanceFormSchema);

module.exports = AttendanceForm;
