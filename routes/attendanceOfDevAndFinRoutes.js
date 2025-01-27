const express = require('express');
const { submitAttendanceForm } = require('../controllers/attendanceController');
const submitAttendanceOfDevAndFin = require('../controllers/attendance/attendanceOfDevAndFin/submitAttendanceOfDevAndFinControllers');
const { getAttendanceOfDevAndFinControllers } = require('../controllers/attendance/attendanceOfDevAndFin/getAttendanceOfDevAndFinControllers');
const router = express.Router();


// Route to handle attendance form submission
router.post('/submit-attendance', submitAttendanceOfDevAndFin);
router.get('/get-all-attendances', getAttendanceOfDevAndFinControllers);

module.exports = router;
