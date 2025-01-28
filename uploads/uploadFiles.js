const { S3Client } = require("@aws-sdk/client-s3");
const multer = require("multer");
const multerS3 = require("multer-s3");
const path = require("path");

// Create an S3 Client instance
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRECT_ACCESS_KEY,
  },
});

// Validation: Max file size (5 MB per file) and allowed file types
const MAX_SIZE = 50 * 1024 * 1024; // 50 MB
const allowedFileTypes = ["image/jpeg","image/jpg", "image/png", "application/pdf","video/mp4"]; // Adjust as needed

// File filter for Multer
const fileFilter = (req, file, cb) => {
    // console.log(file)
  if (!allowedFileTypes.includes(file.mimetype)) {
    return cb(new Error("Invalid file type. Only JPEG, PNG, and PDF files are allowed."), false);
  }
  cb(null, true);
};

// Generalized Multer configuration for multiple file uploads
const generalFileUpload = (folderName) =>
  multer({
    storage: multerS3({
      s3: s3,
      bucket: process.env.AWS_S3_BUCKET_NAME,
      acl: "public-read",
      key: (req, file, cb) => {
        const now = new Date();
        const day = String(now.getDate()).padStart(2, "0");
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const year = now.getFullYear();
        const formattedDate = `${day}--${month}--${year}`;
        const fileExtension = path.extname(file.originalname);
        const fileBaseName = path
          .basename("aws")
          .replace(/\s+/g, "_");
        const timestamp = Date.now();
        const folder = folderName || "general"; // Use provided folder or default to "general"
        const fileName = `${timestamp}-${fileBaseName}${fileExtension}`;
        cb(null, `${folder}/${formattedDate}-${fileName}`);
      },
    }),
    fileFilter,
    limits: { fileSize: MAX_SIZE },
  });

const uploadErrorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: err.message });
  } else if (err) {
    return res.status(400).json({ error: err.message });
  }
  next();
};

module.exports = { generalFileUpload, uploadErrorHandler };
