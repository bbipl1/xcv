const express = require('express');
const router = express.Router();
const { uploadFile,userFileUpload } = require('../controllers/officialUsers/userFileUploadControllers.js');
const { userLogin } = require('../controllers/officialUsers/userLogin.js');
const { getAllUsers } = require('../controllers/officialUsers/allUsersControllers.js');
const { contactUs } = require('../controllers/contactUsControllers.js');
const { getAllContactusMessages } = require('../controllers/getAllContactusMessages.js');
const { updateContact, updateContactUsMessages } = require('../controllers/updateContactUsMessages.js');
const getUser = require('../controllers/officialUsers/getUserController.js');

// Route to handle attendance form submission
router.post('/upload-users-details', uploadFile,userFileUpload);
router.post('/user-login', userLogin);
router.get('/all-users', getAllUsers);
router.get('/get-user', getUser);
router.post('/contact-us',contactUs );
router.get('/get-contact-us-messages',getAllContactusMessages );
router.put('/update-contact-us-messages',updateContactUsMessages );
router.put('/update-contact-us-messages',updateContactUsMessages );


module.exports = router;
