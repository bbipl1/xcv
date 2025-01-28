const DailyProgressReportModel = require("../../../models/forms/DailyProgressReportModel");
const {dateFormate}=require("../../../config/date/dateFormate")
/**
 * Upload payment screenshots and update the database record.
 * Filters based on `id` and `date`, then updates the `paymentScreenshots` field.
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The next middleware function.
 */
const uploadVideo = async (req, res, next) => {
  try {
    const { id } = req.body; // Extract `id` and `date` from the request body

    // console.log(req.files)
    // console.log(req.body)
    // Validate request
    if (!id || !dateFormate) {
      return res.status(400).json({ error: "Both `id` and `date` are required" });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    
    // Find the DailyProgressReport record by `id` and `date`
    const report = await DailyProgressReportModel.findOne({ id, date:dateFormate });
    
    if (!report) {
        return res.status(404).json({ error: "Record not found" });
    }
    console.log(req.files)

    // Construct screenshot objects from uploaded files
    const videos = req.files?.videos?.map((file) => ({
      url: file.location, // S3 file URL
      uploadedAt: dateFormate,
      remarks: req.body.remarks || "", // Optional remarks from the request
    }));

    // Update the `paymentScreenshots` field
    report.videos.push(...videos);

    // Save the updated report
    await report.save();

    res.status(200).json({
      message: "videos uploaded and saved successfully",
      videos: report.videos,
    });
  } catch (error) {
    next(error); // Pass errors to the error handler
  }
};

module.exports = { uploadVideo };
