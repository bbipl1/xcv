const SiteManagement = require('../../../models/siteManagementModel'); // Adjust the path as needed

// Controller for updating a site name
const updateSiteNameController = async (req, res) => {
    try {
        const { stateId, districtId, blockId, siteId, siteName } = req.body;

        console.log("State ID:", stateId);
        console.log("District ID:", districtId);
        console.log("Block ID:", blockId);
        console.log("Site ID:", siteId);
        console.log("New Site Name:", siteName);

        // Validate required fields
        if (!stateId || !districtId || !blockId || !siteId || !siteName || typeof siteName !== 'string') {
            return res.status(400).json({ message: "All fields (stateId, districtId, blockId, siteId, siteName) are required." });
        }

        // Check if the site name already exists within the specified block
        const isDuplicate = await SiteManagement.exists({
            'states._id': stateId,
            'states.districts._id': districtId,
            'states.districts.blocks._id': blockId,
            'states.districts.blocks.sites.siteName': siteName.trim(),
        });

        if (isDuplicate) {
            return res.status(409).json({ message: "Site name already exists in the selected block." });
        }

        // Update the site name
        const result = await SiteManagement.findOneAndUpdate(
            {
                'states._id': stateId,
                'states.districts._id': districtId,
                'states.districts.blocks._id': blockId,
                'states.districts.blocks.sites._id': siteId,
            },
            { $set: { 'states.$[stateElem].districts.$[districtElem].blocks.$[blockElem].sites.$[siteElem].siteName': siteName.trim() } },
            {
                new: true, // Return the updated document
                arrayFilters: [
                    { 'stateElem._id': stateId },
                    { 'districtElem._id': districtId },
                    { 'blockElem._id': blockId },
                    { 'siteElem._id': siteId },
                ],
            }
        );

        if (!result) {
            return res.status(404).json({ message: "State, district, block, or site not found." });
        }

        res.status(200).json({
            message: "Site name updated successfully.",
            data: result,
        });
    } catch (error) {
        console.error("Error updating site name:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};

module.exports = updateSiteNameController;
