const mongoose = require("mongoose");
const SiteEngineers = require("../../models/siteEngineerModel");
const Worker = require("../../models/workerModel");

const getDeletedWorkers = async (req, res) => {
  try {
    // Extract siteEngId and siteEngObjId from the request
    const { siteEngId, siteEngObjId } = req.query;

    // Check if both parameters are provided
    if (!siteEngId || !siteEngObjId) {
      return res
        .status(400)
        .json({ message: "siteEngId and siteEngObjId are required." });
    }

    if (!mongoose.Types.ObjectId.isValid(siteEngObjId)) {
        return res.status(400).json({ message: "Invalid siteEngObjId format." });//if it's not a valid ObjectId
    }

    // console.log("q", req.query);
   

    // Find the Site Engineer by siteEngId and siteEngObjId, and populate workersOld
    const siteEng = await SiteEngineers.findOne({
      siteEngId,
      siteEngObjId: siteEngObjId, // Use ObjectId for siteEngObjId
    }).populate("workersOld");

    // Check if the Site Engineer exists
    if (!siteEng) {
      return res.status(404).json({ message: "Site Engineer not found." });
    }

    // If there are deleted workers in workersOld, return them
    if (siteEng.workersOld && siteEng.workersOld.length > 0) {
      return res.status(200).json({
        message: "Deleted workers found.",
        deletedWorkers: siteEng.workersOld,
      });
    } else {
      return res.status(404).json({ message: "No deleted workers found." });
    }
  } catch (error) {
    console.error("Error retrieving deleted workers:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { getDeletedWorkers };
