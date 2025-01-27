const SiteManagement = require('../../../models/siteManagementModel'); // Adjust the path as needed

// Controller for deleting a site
const deleteSiteNameController = async (req, res) => {
    try {
        const { stateId, districtId, blockId, siteId } = req.body;

        console.log("State ID:", stateId);
        console.log("District ID:", districtId);
        console.log("Block ID:", blockId);
        console.log("Site ID:", siteId);

        // Validate required fields
        if (!stateId || !districtId || !blockId || !siteId) {
            return res.status(400).json({ message: "All fields (stateId, districtId, blockId, siteId) are required." });
        }

        // Find and update by removing the specified site
        const result = await SiteManagement.findOneAndUpdate(
            {
                'states._id': stateId,
                'states.districts._id': districtId,
                'states.districts.blocks._id': blockId,
            },
            {
                $pull: { 'states.$[stateElem].districts.$[districtElem].blocks.$[blockElem].sites': { _id: siteId } },
            },
            {
                new: true, // Return the updated document
                arrayFilters: [
                    { 'stateElem._id': stateId },
                    { 'districtElem._id': districtId },
                    { 'blockElem._id': blockId },
                ],
            }
        );

        // Check if the site was removed
        if (!result) {
            return res.status(404).json({ message: "State, district, block, or site not found." });
        }

        // Check if any site was actually removed
        const block = result.states
            .find((state) => state._id.toString() === stateId)
            ?.districts.find((district) => district._id.toString() === districtId)
            ?.blocks.find((block) => block._id.toString() === blockId);

        if (!block || !block.sites.some((site) => site._id.toString() === siteId)) {
            return res.status(200).json({ message: "Site deleted successfully." });
        }

        return res.status(500).json({ message: "Failed to delete site. Please try again." });
    } catch (error) {
        console.error("Error deleting site:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};

module.exports = deleteSiteNameController;
