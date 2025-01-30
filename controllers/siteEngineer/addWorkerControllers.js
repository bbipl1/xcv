const { S3Client } = require("@aws-sdk/client-s3");
const multer = require("multer");
const multerS3 = require("multer-s3");
const path = require("path");
const Worker = require("../../models/workerModel");
const SiteEngineer = require("../../models/siteEngineerModel");
const mongoose = require("mongoose");

// Create an S3 Client instance
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRECT_ACCESS_KEY,
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
    acl: "public-read",
    key: function (req, file, cb) {
      const now = new Date();
      const formattedDate = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()}`;
      const fileExtension = path.extname(file.originalname);
      const fileBaseName = path.basename(file.originalname, fileExtension).replace(/\s+/g, "_");
      const timestamp = Date.now();
      const folder = determineFolder(file.fieldname);
      const fileName = `${timestamp}-${fileBaseName}${fileExtension}`;
      cb(null, `manpowers/${folder}/${formattedDate}-${fileName}`);
    },
  }),
}).fields([
  { name: "aadhaarPhoto", maxCount: 1 },
  { name: "panPhoto", maxCount: 1 },
  { name: "accountDetailsPhoto", maxCount: 1 },
]);

// Add New Worker Controller
const addWorker = async (req, res) => {
  console.log("Request Body:", req.body);
  const { name, mobile, siteEngineerId, siteEngObjId } = req.body;

  // Validate required fields
  if (!name || !mobile || !siteEngineerId || !siteEngObjId || !mongoose.Types.ObjectId.isValid(siteEngObjId)) {
    return res.status(400).json({
      message: "All required fields must be provided, and siteEngObjId must be valid.",
    });
  }

  // Initialize file URLs as undefined
  let aadhaarPhotoUrl, panPhotoUrl, accountDetailsPhotoUrl;

  // Check if req.files exists and assign URLs if files are uploaded
  if (req.files) {
    if (req.files.aadhaarPhoto) aadhaarPhotoUrl = req.files.aadhaarPhoto[0].location;
    if (req.files.panPhoto) panPhotoUrl = req.files.panPhoto[0].location;
    if (req.files.accountDetailsPhoto) accountDetailsPhotoUrl = req.files.accountDetailsPhoto[0].location;
  }

  const session = await mongoose.startSession();
  session.startTransaction(); // Start the transaction

  try {
    // Create a new worker instance
    const newWorker = new Worker({
      name,
      mobile,
      "siteEngCurrent.siteEngId": siteEngineerId,
      "siteEngCurrent.siteEngObjId": siteEngObjId,
    });

    // Only assign fields if files were uploaded
    if (aadhaarPhotoUrl) newWorker.aadhaarURL = aadhaarPhotoUrl;
    if (panPhotoUrl) newWorker.panCardURL = panPhotoUrl;
    if (accountDetailsPhotoUrl) newWorker.accountDetailsURL = accountDetailsPhotoUrl;

    // Save the worker to the database with session
    await newWorker.save({ session });

    // Find the Site Engineer and update with the new worker
    const siteEng = await SiteEngineer.findOne({ siteEngId:siteEngineerId, siteEngObjId }).session(session);

    if (!siteEng) {
      throw new Error("Site Engineer not found.");
    }

    // Add the worker's ObjectId to the workersCurrent array in the Site Engineer model
    siteEng.workersCurrent.push(newWorker._id);

    // Save the updated Site Engineer document
    await siteEng.save({ session });

    // Commit the transaction (everything succeeds)
    await session.commitTransaction();
    session.endSession();

    // Respond with the saved worker data
    res.status(201).json({ newWorker, message: "Worker added successfully, and Site Engineer updated." });
  } catch (error) {
    // If anything fails, rollback the transaction
    await session.abortTransaction();
    session.endSession();

    console.error("Error adding worker:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = { addWorker, workerPhotoUpload };
