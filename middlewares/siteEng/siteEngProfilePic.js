const { generalFileUpload } = require("../../uploads/uploadFiles");

// File upload middleware for payment screenshots
const uploadProfilePicForSiteEng = (req, res, next) => {
  const uploader = generalFileUpload("siteEngProfilePic").fields([
    { name: "profilePic", maxCount: 10 }, // Field name for file(s)
    { name: "id", maxCount: 1 },  // Field name for id (non-file)
  ]);

  uploader(req, res, (err) => {
    if (err) {
      return next(err); // Pass any errors to the error handler
    }

    // console.log("Uploaded Files: ", req.files); // Log uploaded files
    // console.log("ID: ", req.body.siteEngId); // Log the `id` from the form data

    next(); // Proceed to the next middleware or route handler
  });
};


module.exports = uploadProfilePicForSiteEng ;
