const AttendanceOfDevAndFinModel = require("../../../models/officials/AttendanceOfDevAndFinModel");
const moment = require("moment-timezone");

const submitAttendanceOfDevAndFin = async (req, res) => {
  try {
    console.log("Request Body:", req.body);

    const { employeeId, employeeName,employeeMobile, geoCoordinates, role } = req.body;

    // Validate required fields
    if (!employeeId || !employeeName || !geoCoordinates || geoCoordinates.length === 0 || !role) {
       
      return res.status(400).json({ success: false, message: "All fields are required, including role." });
    }
    // console.log(geoCoordinates)

    // Validate role
    const validRoles = ["developer", "finance", "admin"];
    if (!validRoles.includes(role)) {
    console.log(geoCoordinates)
      return res.status(400).json({ success: false, message: "Invalid role provided." });
    }

    // Validate geoCoordinates
    const { latitude, longitude } = geoCoordinates[0];
    if (
      isNaN(latitude) ||
      isNaN(longitude) ||
      latitude < -90 ||
      latitude > 90 ||
      longitude < -180 ||
      longitude > 180
    ) {
        // console.log("400")
      return res.status(400).json({ success: false, message: "Invalid latitude or longitude values." });
    }

    // Calculate server-side date, time, and day with timezone
    const currentDate = moment().tz("Asia/Kolkata").format("DD/MM/YYYY"); // Adjust timezone as per requirement
    const dayOfWeek = moment().tz("Asia/Kolkata").format("dddd"); // e.g., "Monday"
    const timeOfDay = moment().tz("Asia/Kolkata").format("h:mm:ss A"); // e.g., "2:30:00 PM"

    // Create a new attendance entry
    const attendance = new AttendanceOfDevAndFinModel({
      empId:employeeId,
      empName:employeeName,
      empMobile:employeeMobile,
      geoCoordinates,
      empRole:role,
      date: currentDate,
      day: dayOfWeek,
      time: timeOfDay,
    });

    // Save to database
    const savedAttendance = await attendance.save();

    return res.status(201).json({
      success: true,
      message: "Attendance submitted successfully.",
      data: savedAttendance,
    });
  } catch (error) {
    console.error("Error submitting attendance:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while submitting attendance.",
      error: error.message,
    });
  }
};

module.exports = submitAttendanceOfDevAndFin;
