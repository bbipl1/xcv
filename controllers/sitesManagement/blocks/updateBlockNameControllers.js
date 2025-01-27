const SiteManagement = require('../../../models/siteManagementModel'); // Adjust the path as needed

// Controller for updating a district name
const updateBlockNameController = async (req, res) => {
    try {
        const { stateId, districtId,blockId,blockName } = req.body;
        // const { districtName } = req.body;

        console.log(stateId)
        console.log(districtId)
        console.log(blockId)
        console.log(blockName)

        // Validate required fields
        if (!stateId || !districtId || !blockId || !blockName || typeof blockName !== 'string') {
            return res.status(400).json({ message: "All fields are required." });
        }

        // Check if the district name already exists
        const isDuplicate = await SiteManagement.exists({
            'states.districts.block.blockName': blockName.trim(),
        });

        if (isDuplicate) {
            return res.status(401).json({ message: "Block name already exists." });
        }

        // Update the district name
        const result = await SiteManagement.findOneAndUpdate(
            { 'states._id': stateId, 'states.districts._id': districtId,'states.districts.blocks._id': blockId },
            { $set: { 'states.$[stateElem].districts.$[districtElem].blocks.$[blockElem].blockName': blockName.trim() } },
            {
                new: true, // Return the updated document
                arrayFilters: [
                    { 'stateElem._id': stateId },
                    { 'districtElem._id': districtId },
                    {'blockElem._id':blockId},
                ],
            }
        );

        console.log(result)

        // Check if the update was successful
        if (!result) {
            return res.status(404).json({ message: "State or district or block not found." });
        }

        // Respond with success
        res.status(200).json({
            message: "Block name updated successfully.",
            data: result,
        });
    } catch (error) {
        console.error("Error updating blcok name:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};

module.exports = updateBlockNameController;
