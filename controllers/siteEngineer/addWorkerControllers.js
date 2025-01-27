const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const multer = require("multer");
const multerS3 = require("multer-s3");
const path = require("path");
const Worker = require("../../models/workerModel");

// Create an S3 Client instance
const s3 = new S3Client({
  region: process.env.AWS_REGION, // Ensure your region is correct
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY, // AWS Access Key
    secretAccessKey: process.env.AWS_SECRECT_ACCESS_KEY, // AWS Secret Key
  },
});

// Function to determine folder type based on field name
const determineFolder = (fieldName) => {
  switch (fieldName) {
    case "aadhaarPhoto":
      return "aadhaar";
    case "panPhoto":
      return "pan";
    case "accountDetailsPhoto":
      return "accountDetails";
    default:
      return "others";
  }
};

// Set up Multer to upload files directly to S3
const workerPhotoUpload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_S3_BUCKET_NAME,
    acl: "public-read", // Files will be publicly accessible
    key: function (req, file, cb) {
      const now = new Date();
      const day = String(now.getDate()).padStart(2, "0");
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const year = now.getFullYear();
      const formattedDate = `${day}--${month}--${year}`;
      const fileExtension = path.extname(file.originalname); // Extract file extension
      const fileBaseName = path
        .basename(file.originalname, fileExtension)
        .replace(/\s+/g, "_"); // Clean file name
      const timestamp = Date.now(); // Get timestamp
      const folder = determineFolder(file.fieldname); // Determine folder type
      const fileName = `${timestamp}-${fileBaseName}${fileExtension}`; // Construct file name
      cb(null, `worker/${folder}/${formattedDate}-${fileName}`); // Construct the path
    },
  }),
}).fields([
  { name: "aadhaarPhoto", maxCount: 1 }, // Accept only 1 file for aadhaarPhoto
  { name: "panPhoto", maxCount: 1 }, // Accept only 1 file for panPhoto
  { name: "accountDetailsPhoto", maxCount: 1 }, // Accept only 1 file for accountDetailsPhoto
]);

// Add New Worker Controller
const addWorker = async (req, res) => {
  console.log("Request Body:", req.body);
  const { name, mobile, siteEngineerId, siteEngObjId } = req.body;

  // Check if required fields are provided
  if (!name || !mobile || !req.files) {
    return res
      .status(400)
      .json({ message: "All fields and documents are required." });
  }

  // Extract the file details from req.files
  const { aadhaarPhoto, panPhoto, accountDetailsPhoto } = req.files;

  // Check if files for each document are uploaded
  if (!aadhaarPhoto || !panPhoto || !accountDetailsPhoto) {
    return res
      .status(400)
      .json({
        message:
          "Please upload all required documents (Aadhaar, PAN, Account Details).",
      });
  }

  try {
    // Extract S3 URLs from uploaded files
    const aadhaarPhotoUrl = aadhaarPhoto[0].location; // S3 URL for aadhaarPhoto
    const panPhotoUrl = panPhoto[0].location; // S3 URL for panPhoto
    const accountDetailsPhotoUrl = accountDetailsPhoto[0].location; // S3 URL for accountDetailsPhoto

    // Create a new worker instance and save the details
    const newWorker = new Worker({
      name,
      mobile,
      aadhaarURL: aadhaarPhotoUrl,
      panCardURL: panPhotoUrl,
      accountDetailsURL: accountDetailsPhotoUrl,
      "siteEngCurrent.siteEngId": siteEngineerId,
      "siteEngCurrent.siteEngObjId": siteEngObjId,
    });

    console.log(newWorker);

    // Save the worker to the database
    await newWorker.save();

    // Respond with the saved worker data
    res.status(201).json(newWorker);
  } catch (error) {
    console.error("Error adding worker:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { addWorker, workerPhotoUpload };
