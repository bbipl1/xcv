const mongoose = require("mongoose");
const SiteEngineersModel = require("../../models/siteEngineerModel");

const getSiteEngineer = async (req, res) => {
  try {
    const { id } = req.query;

    // Check if the ID is a valid ObjectId
    const isObjectId = mongoose.Types.ObjectId.isValid(id);

    // Build the query dynamically based on the type of ID
    const query = isObjectId
      ? { siteEngObjId: id } // If it's an ObjectId, use `siteEngObjId`
      : { siteEngId: id };  // Otherwise, use `siteEngId`

    // Fetch the site engineer
    const siteEngineer = await SiteEngineersModel.findOne(query);

    if (siteEngineer) {
      res.status(200).json({
        success: true,
        data: siteEngineer,
      });
    } else {
      res.status(404).json({
        success: false,
        message: `No site engineer found with ID: ${id}`,
      });
    }
  } catch (error) {
    console.error("Error fetching Site Engineer:", error);

    res.status(500).json({
      success: false,
      message: "Server error, unable to fetch the site engineer.",
      error: error.message,
    });
  }
};

module.exports = getSiteEngineer;
