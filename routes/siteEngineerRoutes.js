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
const deleteWorkers = require('../controllers/siteEngineer/deleteWorkerControllers');
const { getDeletedWorkers } = require('../controllers/siteEngineer/getAllDeletedWorker');
const uploadProfilePicForSiteEng = require('../middlewares/siteEng/siteEngProfilePic');
const updateProfilePicForSiteEngControllers = require('../controllers/siteEngineer/profile/updateProfilePicCotrollers');
const submitManpowerAttendControllers = require('../controllers/siteEngineer/ManpowerAttendance/submitManpowAttendControllers');
const workerAttendPhotoUploadMiddleware = require('../middlewares/siteEng/manpowAttendMiddleWare');
const getManPowerAttendance = require('../controllers/siteEngineer/ManpowerAttendance/getManPowAttendanceControllers');
const updateDailyProgressReport = require('../controllers/siteEngineer/dailyProgressReport/updateDailyProgressReportControllers');
const findDailyProgressReportByDate = require('../controllers/siteEngineer/dailyProgressReport/getDailyProgressReportByTodayDateControllers');
const updateAmountForDailyProgressReport = require('../controllers/siteEngineer/dailyProgressReport/updateAmountForDailyProgressReportControllers');
const deleteDailyProgressReportControllers = require('../controllers/siteEngineer/dailyProgressReport/deleteDailyProgressReportControllers');
const submitHDDFormControllers = require('../controllers/siteEngineer/hddForms/submitHDDFormControllers');
const getHDDFormControllers = require('../controllers/siteEngineer/hddForms/getHDDFormControllers');

// Route to handle attendance form submission
router.get('/get-all-site-engineers', getAllSiteEngineers);
router.get('/get-site-engineer', getSiteEngineer);
router.post('/add-worker',workerPhotoUpload, addWorker);
router.put('/delete-worker',deleteWorkers);
router.get('/get-all-workers',getAllWorkers);
router.get('/get-all-deleted-workers',getDeletedWorkers);
router.post('/submit-daily-progress-report',submitDailyProgressReport);
router.put('/update-daily-progress-report',updateDailyProgressReport);
router.put('/update-amount-for-daily-progress-report',updateAmountForDailyProgressReport);
router.delete('/delete-daily-progress-report',deleteDailyProgressReportControllers);
router.get('/get-all-daily-progress-report',findDailyProgressReport);
router.get('/get-daily-progress-report-by-today-date',findDailyProgressReportByDate);
router.post('/submit-manpower-attendance',workerAttendPhotoUploadMiddleware, submitManpowerAttendControllers);
router.get('/get-manpower-attendance', getManPowerAttendance);
router.post('/upload-payment-screenshots',upload,uploadPaymentScreenshots);
router.post('/upload-photos',uploadPhotosMW,uploadPhotos);
router.post('/upload-profile-pic',uploadProfilePicForSiteEng,updateProfilePicForSiteEngControllers);
router.post('/upload-videos',uploadVideosMW,uploadVideo);

//forms
router.post("/submit-hdd-form",submitHDDFormControllers);
router.get("/get-hdd-forms",getHDDFormControllers);



module.exports = router;
