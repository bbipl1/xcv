const SiteEngineersModel = require("../../models/siteEngineerModel");

const getAllSiteEngineers = async (req, res) => {
  try {
    // Fetch all site engineers from the database
    const { populate_user } = req.query;
    let siteEngineers=null;
    if (populate_user?.trim() === "true") {
      siteEngineers = await SiteEngineersModel.find().populate("siteEngObjId").populate('workersCurrent').populate("workersOld");
    } else {
      siteEngineers = await SiteEngineersModel.find();
    }

    // Check if data exists and send a response
    if (siteEngineers.length > 0) {
      // console.log("Site Engineers: ", siteEngineers);
      res.status(200).json({
        success: true,
        data: siteEngineers,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No site engineers found.",
      });
    }
  } catch (error) {
    console.error("Error fetching Site Engineers:", error);

    // Send a 500 response if an error occurs
    res.status(500).json({
      success: false,
      message: "Server error, unable to fetch site engineers.",
      error: error.message,
    });
  }
};

module.exports = getAllSiteEngineers;
