const SiteManagement = require('../../../models/siteManagementModel'); // Adjust the path as needed

// Controller for deleting a district by stateId and districtId
const deleteDistrictNameController = async (req, res) => {
    try {
        const { stateId, districtId } = req.query;

        console.log("I am working")
        // Validate the required parameters
        if (!stateId || !districtId) {
            console.log("State ID and district ID are required.");
            return res.status(400).json({ message: "State ID and district ID are required." });
        }

        // Use MongoDB's `$pull` operator to remove the district from the nested array
        const result = await SiteManagement.findOneAndUpdate(
            { 'states._id': stateId }, // Match the state by its ID
            { $pull: { 'states.$.districts': { _id: districtId } } }, // Remove the district by its ID within the matched state
            { new: true } // Return the updated document
        );

        // If no document was found or updated
        if (!result) {
            console.log("State or district not found.");
            return res.status(405).json({ message: "State or district not found." });
        }

        // Respond with the updated document
        res.status(200).json({
            message: "District deleted successfully.",
            data: result,
        });
        console.log("District deleted successfully.");
    } catch (error) {
        // Handle any errors that occur
        console.error("Error deleting district:", error);
        res.status(500).json({ message: `Server error: ${error.message}` });
    }
};

module.exports = deleteDistrictNameController;
