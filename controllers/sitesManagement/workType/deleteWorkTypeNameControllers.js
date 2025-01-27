const SiteManagement = require('../../../models/siteManagementModel'); // Adjust the path as needed

// Controller for deleting a work type
const deleteWorkTypeController = async (req, res) => {
    try {
        const { stateId, districtId, blockId, siteId, workTypeId } = req.body;

        console.log("State ID:", stateId);
        console.log("District ID:", districtId);
        console.log("Block ID:", blockId);
        console.log("Site ID:", siteId);
        console.log("Work Type ID:", workTypeId);

        // Validate required fields
        if (!stateId || !districtId || !blockId || !siteId || !workTypeId) {
            return res.status(400).json({ 
                message: "All fields (stateId, districtId, blockId, siteId, workTypeId) are required." 
            });
        }

        // Find and update the document to remove the work type
        const result = await SiteManagement.findOneAndUpdate(
            {
                'states._id': stateId,
                'states.districts._id': districtId,
                'states.districts.blocks._id': blockId,
                'states.districts.blocks.sites._id': siteId,
            },
            {
                $pull: {
                    'states.$[stateElem].districts.$[districtElem].blocks.$[blockElem].sites.$[siteElem].workType': { _id: workTypeId },
                },
            },
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
            return res.status(404).json({ 
                message: "State, district, block, site, or work type not found." 
            });
        }

        res.status(200).json({
            message: "Work type deleted successfully.",
            data: result,
        });
    } catch (error) {
        console.error("Error deleting work type:", error);
        res.status(500).json({ 
            message: "Server error. Please try again later." 
        });
    }
};

module.exports = deleteWorkTypeController;
