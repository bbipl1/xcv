const SiteManagement = require("../../models/siteManagementModel");

const findSitesDetails = async (req, res) => {
  try {
    const { stateName, districtName, blockName, siteName, workTypeName } =
      req.query; // Get query parameters

    // Build the filter dynamically based on the provided query parameters
    let filter = {};

    // If stateName is provided, filter by stateName
    if (workTypeName) {
      filter = {
        "states.districts.blocks.sites.workType.workTypeName": workTypeName,
      };
    } else if (workTypeName && siteName) {
      filter = {
        "states.districts.blocks.sites.siteName": siteName,
      };
    } else if (workTypeName && siteName && blockName) {
      filter = {
        "states.districts.blocks.blockName": blockName,
      };
    } else if (workTypeName && siteName && blockName && districtName) {
      filter = {
        "states.districts.districtName": districtName,
      };
    } else if (
      workTypeName &&
      siteName &&
      blockName &&
      districtName &&
      stateName
    ) {
      filter = {
        "states.stateName": stateName,
      };
    }

    // Fetch data based on the constructed filter
    const result = await SiteManagement.find(filter);

    if (result.length > 0) {
    //   console.log(result);
      return res
        .status(200)
        .json({ message: "Data fetched successfully.", data: result });
    } else {
      return res
        .status(404)
        .json({ message: "No data found matching the criteria." });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: `Server error: ${error.message}` });
  }
};

module.exports = findSitesDetails;
