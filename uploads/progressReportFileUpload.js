const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const multer = require("multer");
const multerS3 = require("multer-s3");
const path = require("path");

// Create an S3 Client instance
const s3 = new S3Client({
  region: process.env.AWS_REGION, // Ensure your region is correct
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY, // AWS Access Key
    secretAccessKey: process.env.AWS_SECRECT_ACCESS_KEY, // AWS Secret Key
  },
});

// Set up Multer to upload files directly to S3
const progressReportFileUpload = multer({
  storage: multerS3({
    s3: s3,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    bucket: process.env.AWS_S3_BUCKET_NAME, // Set your bucket name
    acl: "public-read", // Files will be publicly accessible
    key: function (req, file, cb) {
      const now = new Date();
      const day = String(now.getDate()).padStart(2, "0");
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const year = now.getFullYear();
      const formattedDate = `${day}-${month}-${year}`;
      const fileExtension = path.extname(file.originalname); // Extract file extension
      const fileBaseName = path
        .basename(file.originalname, fileExtension)
        .replace(/\s+/g, "_"); // Clean file name
      const timestamp = Date.now(); // Get timestamp
      const folder = "dailyProgressReport"; // Folder where files will be stored
      const fileName = `${timestamp}-${fileBaseName}${fileExtension}`; // Construct file name
      cb(null, `${folder}/${formattedDate}-${fileName}`); // Construct the path to store the file in S3
    },
  }),
}).fields([
  { name: "expenses.qr", maxCount: 1 }, // Accept only 1 file for QR code
]);

module.exports = { progressReportFileUpload };
