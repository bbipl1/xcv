const { generalFileUpload } = require("../../uploads/uploadFiles");

// File upload middleware for payment screenshots
const workerAttendPhotoUploadMiddleware = (req, res, next) => {
    // console.log(req.body)
  const uploader = generalFileUpload("manpowerAttendance").any()

  uploader(req, res, (err) => {
    if (err) {
      return next(err); // Pass any errors to the error handler
    }

    // console.log("Uploaded Files: ", req.files); // Log uploaded files
    // console.log("ID: ", req.body); // Log the `id` from the form data

    next(); // Proceed to the next middleware or route handler
  });
};


module.exports = workerAttendPhotoUploadMiddleware ;
