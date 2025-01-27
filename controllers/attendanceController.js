const AttendanceForm = require('../models/AttendanceModel.js');

// Controller to handle attendance form submission
const submitAttendanceForm = async (req, res) => {
  try {
    const data={
      accountDetailsImageURL,
      date,
      day,
      employeeId,
      employeeName,
      expenses,
      expensesType,
      geoCoordinates,
      paymentsStatus,
      progressReportDescription,
      progressReportVideo,
      selfie,
      siteLocation,
      time,
    } = req.body;

    
    console.log(data)
    // Check if all required fields are provided
    if (
      !accountDetailsImageURL ||
      !date ||
      !day ||
      !employeeId ||
      !employeeName ||
      !expenses ||
      !expensesType ||
      !paymentsStatus ||
      !progressReportDescription ||
      !progressReportVideo ||
      !selfie ||
      !siteLocation ||
      !time
    ) {
        console.log("f")
      return res.status(400).json({ error: 'All fields are required.' });
    }

   

    // Create a new AttendanceForm instance
    const newAttendanceForm = new AttendanceForm({
      accountDetailsImageURL,
      date,
      day,
      employeeId,
      employeeName,
      expenses,
      expensesType,
      geoCoordinates,
      paymentsStatus,
      progressReportDescription,
      progressReportVideo,
      selfie,
      siteLocation,
      time,
    });

    // Save the attendance form to the database
    const savedForm = await newAttendanceForm.save();

    // Respond with success message and saved data
    res.status(201).json({
      message: 'Attendance form submitted and saved successfully!',
      data: savedForm,
    });
  } catch (error) {
    console.error('Error submitting attendance form:', error);
    res.status(500).json({ error: 'Server error while saving data.' });
  }
};




module.exports={submitAttendanceForm}
