const express = require('express');
const router = express.Router();
const getAllSiteEngineers=require("../controllers/siteEngineer/getAllSiteEngControllers");
const getSiteEngineer = require('../controllers/siteEngineer/getSiteEngControllers');
const { addWorker,workerPhotoUpload } = require('../controllers/siteEngineer/addWorkerControllers');
const getAllWorkers = require('../controllers/siteEngineer/getWorkerControllers');
const submitDailyProgressReport = require('../controllers/siteEngineer/dailyProgressReport/submitDailyProgressReport');
const { progressReportFileUpload } = require('../uploads/progressReportFileUpload');

// Route to handle attendance form submission
router.get('/get-all-site-engineers', getAllSiteEngineers);
router.get('/get-site-engineer', getSiteEngineer);
router.post('/add-worker',workerPhotoUpload, addWorker);
router.get('/get-all-workers',getAllWorkers);
router.post('/submit-daily-progress-report',submitDailyProgressReport);



module.exports = router;
