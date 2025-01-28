const express = require('express');
const router = express.Router();
const getAllSiteEngineers=require("../controllers/siteEngineer/getAllSiteEngControllers");
const getSiteEngineer = require('../controllers/siteEngineer/getSiteEngControllers');
const { addWorker,workerPhotoUpload } = require('../controllers/siteEngineer/addWorkerControllers');
const getAllWorkers = require('../controllers/siteEngineer/getWorkerControllers');
const submitDailyProgressReport = require('../controllers/siteEngineer/dailyProgressReport/submitDailyProgressReport');
const { progressReportFileUpload } = require('../uploads/progressReportFileUpload');
const findDailyProgressReport = require('../controllers/siteEngineer/dailyProgressReport/getDailyProgressReport');
const { uploadPaymentScreenshots } = require('../controllers/siteEngineer/dailyProgressReport/updateScreenshotsControllers');
const upload=require("../middlewares/uploadScreenshots")
const uploadPhotosMW=require("../middlewares/uploadPhotos")
const uploadVideosMW=require("../middlewares/workProgressUploadVideos")
const { uploadPhotos } = require('../controllers/siteEngineer/dailyProgressReport/updatePhotosControllers');
const { uploadVideo } = require('../controllers/siteEngineer/dailyProgressReport/updateVideosControllers');

// Route to handle attendance form submission
router.get('/get-all-site-engineers', getAllSiteEngineers);
router.get('/get-site-engineer', getSiteEngineer);
router.post('/add-worker',workerPhotoUpload, addWorker);
router.get('/get-all-workers',getAllWorkers);
router.post('/submit-daily-progress-report',submitDailyProgressReport);
router.get('/get-all-daily-progress-report',findDailyProgressReport);
router.post('/upload-payment-screenshots',upload,uploadPaymentScreenshots);
router.post('/upload-photos',uploadPhotosMW,uploadPhotos);
router.post('/upload-videos',uploadVideosMW,uploadVideo);



module.exports = router;
