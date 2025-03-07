const HDDForm = require("../../../../../../models/officials/siteEng/siteEngHDDFormModel");

const updateHddMtrsControllers = async (req, res) => {
  try {
    console.log("Updating HDD Meters...");
    
    let { docId, hddDetails } = req.body;
    docId = docId?.trim();

    if (!docId) {
      return res.status(400).json({ message: "Document ID is required." });
    }

    if (!Array.isArray(hddDetails) || hddDetails.length === 0) {
      return res.status(400).json({ message: "HDD data is required." });
    }

    const doc = await HDDForm.findById(docId);
    
    if (!doc) {
      return res.status(404).json({ message: "Document not found." });
    }

    // Updating HDD details
    doc.hddDetails = hddDetails;
    await doc.save();

    return res.status(200).json({ message: "HDD details updated successfully." });

  } catch (error) {
    console.error("Error updating HDD details:", error);
    return res.status(500).json({ message: "Server internal error." });
  }
};

module.exports = updateHddMtrsControllers;
