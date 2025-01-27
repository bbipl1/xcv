const SiteManagement = require('../../../models/siteManagementModel'); // Adjust the path as needed

// Controller for deleting a state by stateId
const deleteStateNameController = async (req, res) => {
    try {
        // Extract stateId from the query parameters
        const { stateId } = req.query;
        // console.log(stateId)
        // return ;

        // Validate the stateId
        if (!stateId) {
            console.log("All fields are required");
            return res.status(400).json({ message: "State ID is required." });
        }

        // Find the document and remove the state from the states array
        const result = await SiteManagement.findOneAndUpdate(
            { 'states._id': stateId }, // Look for the stateId in the states array
            { $pull: { states: { _id: stateId } } }, // Remove the state from the array
            { new: true } // Return the updated document
        );

        // If no document was found or updated
        if (!result) {
            console.log("State not found.")
            return res.status(404).json({ message: "State not found." });
        }

        // Respond with the updated document
        res.status(200).json({
            message: "State deleted successfully",
            data: result,
        });
        console.log("State deleted successfully.")
    } catch (error) {
        // Handle any errors that occur
        console.error(error);
        res.status(500).json({ message: `Server error: ${error.message}` });
    }
};

module.exports = deleteStateNameController;
