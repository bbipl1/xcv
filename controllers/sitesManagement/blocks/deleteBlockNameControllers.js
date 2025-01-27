const SiteManagement = require('../../../models/siteManagementModel'); // Adjust the path as needed

const deleteBlockNameController = async (req, res) => {
    try {
        const { stateId, districtId, blockId } = req.body;

        console.log("Request received for block deletion");

        // Validate the required parameters
        if (!stateId || !districtId || !blockId) {
            console.log("State ID, District ID, and Block ID are required.");
            return res.status(400).json({ message: "State ID, District ID, and Block ID are required." });
        }

        // Use MongoDB's `$pull` operator to remove the block by blockId within the specific district
        const result = await SiteManagement.findOneAndUpdate(
            { 'states._id': stateId, 'states.districts._id': districtId }, // Match the state and district
            { 
                $pull: { 
                    'states.$[state].districts.$[district].blocks': { _id: blockId } 
                } 
            },
            { 
                arrayFilters: [
                    { 'state._id': stateId }, 
                    { 'district._id': districtId }
                ],
                new: true // Return the updated document
            }
        );

        if (!result) {
            console.log("State, district, or block not found.");
            return res.status(404).json({ message: "State, district, or block not found." });
        }

        console.log("Block deleted successfully.");
        return res.status(200).json({
            message: "Block deleted successfully.",
            data: result,
        });
    } catch (error) {
        console.error("Error deleting block:", error);
        res.status(500).json({ message: `Server error: ${error.message}` });
    }
};

module.exports = deleteBlockNameController;
