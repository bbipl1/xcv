const express = require('express');
const router = express.Router();
const { submitAttendanceForm } = require('../controllers/attendanceController.js');
const {test}=require('../controllers/testControllers.js')

// Route to handle attendance form submission
router.post('/submit-attendance', submitAttendanceForm);
router.get('/test', test);

module.exports = router;
