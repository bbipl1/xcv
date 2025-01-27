const SiteManagement = require('../../../models/siteManagementModel'); // Adjust the path as needed

// Controller for updating a state name
const updateStateNameController = async (req, res) => {
    try {
        // Extract stateId from the URL parameters and new stateName from the request body
        const { stateId } = req.query;
        const { stateName } = req.body;

        // Validate that the stateName is provided and is a valid string
        if (!stateName || typeof stateName !== 'string') {
            return res.status(400).json({ message: "Invalid state name provided." });
        }

        // Check if the stateName already exists in any of the states
        const existingState = await SiteManagement.findOne({
            'states.stateName': stateName,  // Look for the state name in the states array
        });

        // If the state name already exists, return a message indicating it's a duplicate
        if (existingState) {
            return res.status(400).json({ message: "State name already exists." });
        }

        // Find the document and update the state name
        const result = await SiteManagement.findOneAndUpdate(
            { 'states._id': stateId }, // Look for the stateId in the states array
            { $set: { 'states.$.stateName': stateName } }, // Update the stateName field within the states array
            { new: true } // Return the updated document
        );

        // If no document was found or updated
        if (!result) {
            return res.status(403).json({ message: "State not found." });
        }

        // Respond with the updated document
        res.status(200).json({
            message: "State name updated successfully",
            data: result,
        });
    } catch (error) {
        // Handle any errors that occur
        console.error(error);
        res.status(500).json({ message: `Server error: ${error.message}` });
    }
};

module.exports = updateStateNameController;
