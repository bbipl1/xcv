const SiteManagement = require('../../../models/siteManagementModel');

const addBlockNameControllers = async (req, res) => {
    try {
        const { stateId, districtId, blockName } = req.body;

        // Step 1: Validate input
        if (!stateId || !districtId || typeof blockName !== 'string' || !blockName.trim()) {
            return res.status(400).json({ message: "Invalid input: stateId, districtId, and blockName are required." });
        }

        const trimmedBlockName = blockName.trim();

        console.log("Input Data:", { stateId, districtId, blockName });

        // Step 2: Check if the block already exists
        const blockExists = await SiteManagement.findOne({
            'states._id': stateId,
            'states.districts._id': districtId,
            'states.districts.blocks.blockName': trimmedBlockName,
        });

        if (blockExists) {
            return res.status(400).json({ message: "Block name already exists in this district." });
        }

        // Step 3: Add the block to the specified district using array filters
        const updateResult = await SiteManagement.updateOne(
            { 'states._id': stateId }, // Match the state
            {
                $addToSet: {
                    'states.$[stateElem].districts.$[districtElem].blocks': {
                        blockName: trimmedBlockName,
                        sites: []
                    }
                }
            },
            {
                arrayFilters: [
                    { 'stateElem._id': stateId }, // Filter for the correct state
                    { 'districtElem._id': districtId } // Filter for the correct district
                ]
            }
        );

        console.log("Update Result:", updateResult);

        // Step 4: Return appropriate response
        if (updateResult.modifiedCount > 0) {
            return res.status(200).json({ message: "Block added successfully." });
        } else {
            return res.status(400).json({ message: "No changes were made. Ensure the state and district IDs are correct." });
        }
    } catch (error) {
        console.error("Error adding block:", error);
        return res.status(500).json({ message: `Server error: ${error.message}` });
    }
};

module.exports = addBlockNameControllers;
