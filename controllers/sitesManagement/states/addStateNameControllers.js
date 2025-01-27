const SiteManagement = require('../../../models/siteManagementModel');

const addStateNameControllers = async (req, res) => {
    try {
        // console.log("I am working");

        const { state } = req.body;
        // console.log(state);

        // Validate the input
        if (!state || typeof state !== 'string') {
            return res.status(400).json({ message: "Invalid state name provided." });
        }

        // Step 1: Check if document already exists
        const existingDoc = await SiteManagement.findOne({ 'states.stateName': state });

        if (existingDoc) {
            console.log("Document already exists with the provided state name.");
            return res.status(400).json({ message: "State name already exists." });
        }

        // Step 2: Force the `states` field to be an array for all documents (if not already an array)
        await SiteManagement.updateMany(
            { "states": { $not: { $type: "array" } } },  // Documents where `states` is NOT an array
            { $set: { "states": [] } }  // Set `states` to an empty array
        );

        // Step 3: Now attempt to add the new state
        const filter = { 'states.stateName': { $ne: state } };  // Ensure no state with the same name exists in the `states` array

        const update = {
            $addToSet: {
                states: {
                    stateName: state,
                    districts: []  // Initialize districts as an empty array
                }
            }
        };

        // Options for findOneAndUpdate
        const options = { upsert: true, new: true };

        // Step 4: Execute the update operation
        const result = await SiteManagement.findOneAndUpdate(filter, update, options);

        if (result) {
            console.log(result);
            return res.status(201).json({ message: "State name updated successfully.", data: result });
        } else {
            return res.status(500).json({ message: "Failed to update state name." });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: `Server error: ${error.message}` });
    }
};

module.exports = addStateNameControllers;
