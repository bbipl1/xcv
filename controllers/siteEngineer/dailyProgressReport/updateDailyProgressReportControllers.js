const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const multer = require("multer");
const multerS3 = require("multer-s3");
const path = require("path");
const DailyProgressReportModel = require("../../../models/forms/DailyProgressReportModel");
const { getCurrentDateTime } = require("../../../config/date/dateFormate");

// AWS SDK v3 configuration
const dateFormate=getCurrentDateTime().dateFormate;
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRECT_ACCESS_KEY,
  },
});

// Multer file upload setup using AWS S3
const upload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: process.env.AWS_S3_BUCKET_NAME,
    acl: "public-read",
    key: (req, file, cb) => {
      const timestamp = Date.now();
      cb(null, `expenses/${timestamp}-${file.originalname}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|pdf/;
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimeType = fileTypes.test(file.mimetype);

    if (mimeType && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Only images or PDF files are allowed!"));
    }
  },
}).single("qr"); // Expecting "qr" field in the request body for file upload

// Controller function to submit the daily progress report
const updateDailyProgressReport = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error("File upload error:", err);
      return res
        .status(400)
        .json({ message: "File upload failed", error: err.message });
    }

    try {
      // Extract data from request body
      const {
        id,
        objId,
        name,
        mobile,
        state,
        district,
        block,
        siteName,
        workType,
        todaysWork,
        machinaryUsed,
        expenses,
        remarks,
        status,
      } = req.body;

      console.log(typeof Array(req.body.expenses.type));

      // Parse the arrays and objects
      //   const parsedTodaysWork = JSON.parse(todaysWork || "[]");
      //   const parsedMachinaryUsed = JSON.parse(machinaryUsed || "[]");
      //   const parsedExpenses = JSON.parse(JSON.stringify(expenses))

      // Update the expenses object with the file URL if uploaded
      if (req.file) {
        expenses.qrURL = req.file.location; // Add the S3 file URL
      }

      // Ensure the siteEngId is unique to avoid duplicate key error
      //   const filter={id,date}
      const filter = {
        $and: [{ id }, { date: dateFormate }],
      };

      const reportData = {
        name,
        mobile,
        state,
        district,
        block,
        siteName,
        workType,
        todaysWork: todaysWork,
        machinaryUsed: machinaryUsed,
        expenses: {
          Category: expenses.type,
          qrURL: req.file.location,
          status: expenses.status,
          required: expenses.required,
          received: "0",
        },
        date:getCurrentDateTime().dateFormate,
        time:getCurrentDateTime().timeIn12HourFormat,
        day:getCurrentDateTime().dayName,
        remarks,
      };

      const existingSiteEngineer = await DailyProgressReportModel.findOne(
        filter
      );

      // console.log('d',existingSiteEngineer)
      if (existingSiteEngineer) {
        const response = await DailyProgressReportModel.updateOne(
          filter,
          { $set: reportData },
          { upsert: true, new: true }
        );
        // const response=await updatedData.save();
        console.log(response.modifiedCount);
        if (response.modifiedCount) {
          return res
            .status(200)
            .json({ message: "form updated successfully." });
        }
        return res
          .status(501)
          .json({ message: "getting error while updating form" });
      }

      return res
        .status(404)
        .json({ message: "Daily progress report not found" });
    } catch (error) {
      console.error("Error saving report:", error);
      res
        .status(500)
        .json({ message: "Error saving report", error: error.message });
    }
  });
};

module.exports = updateDailyProgressReport;
