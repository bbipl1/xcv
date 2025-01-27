const SiteDetailsModel = require("../../models/siteManagementModel");
const updateSiteDetailsControllers = async (req, res) => {
  const { state, district, location, siteName } = req.body;
  const updateData = {
    'states.districts.locations.siteName':
  };
};

module.exports = updateSiteDetailsControllers;
