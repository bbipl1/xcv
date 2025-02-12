const DailyProgressReportModel = require("../../../models/forms/DailyProgressReportModel");

const deleteDailyProgressReportControllers = async (req, res) => {
  try {
    const { id } = req.query;

    // console.log(req.body)

    // Ensure the ID is provided
    if (!id) {
      return res.status(400).json({ message: "ID is required." });
    }

    // Wait for the deletion process
    const response = await DailyProgressReportModel.findByIdAndDelete(id);

    // Check if the document was actually found and deleted
    if (response) {
      return res.status(200).json({ message: "Document deleted successfully." });
    } else {
      return res.status(404).json({ message: "Document not found." });
    }
  } catch (error) {
    console.error("Error deleting document:", error);
    return res.status(500).json({ message: "Error deleting the document.", error: error.message });
  }
};

module.exports = deleteDailyProgressReportControllers;
