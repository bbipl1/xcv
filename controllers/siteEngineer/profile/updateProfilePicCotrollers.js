const SiteEngineersModel = require("../../../models/siteEngineerModel");
const multer = require("multer");
const path = require("path");



// Controller to handle profile pic upload
const updateProfilePicForSiteEngControllers = async (req, res) => {
  try {
 
      // Ensure file is uploaded successfully

    //   console.log(req.body)
      if (!req.files) {
          return res.status(400).json({ message: "No file uploaded." });
        }
        
        // Extract Site Engineer ID from the request body
        const { siteEngId } = req.body;
        
        if (!siteEngId) {
            return res.status(400).json({ message: "Site Engineer ID is required." });
        }
        console.log(req.files)

      // Find the Site Engineer by siteEngId
      const siteEngineer = await SiteEngineersModel.findOne({ siteEngId });
      if (!siteEngineer) {
        return res.status(404).json({ message: "Site Engineer not found." });
      }

      // Update the profilePic field with the new file path
      siteEngineer.profilePicURL = req?.files?.profilePic[0]?.location; // Assuming the profilePic field stores file path
    //   console.log( req?.files?.profilePic[0]?.location)

      // Save the updated Site Engineer object
      await siteEngineer.save();
      console.log(siteEngineer)

      return res.status(200).json({
        message: "Profile picture updated successfully.",
        profilePic: req.files?.location,
      });
   
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = updateProfilePicForSiteEngControllers;
