const SiteManagement = require('../../../models/siteManagementModel'); // Adjust the path as needed

// Controller for updating a work type name
const updateWorkTypeNameController = async (req, res) => {
    try {
        const { stateId, districtId, blockId, siteId, workTypeId, workTypeName } = req.body;

        console.log("State ID:", stateId);
        console.log("District ID:", districtId);
        console.log("Block ID:", blockId);
        console.log("Site ID:", siteId);
        console.log("Work Type ID:", workTypeId);
        console.log("New Work Type Name:", workTypeName);

        // Validate required fields
        if (!stateId || !districtId || !blockId || !siteId || !workTypeId || !workTypeName || typeof workTypeName !== 'string') {
            return res.status(400).json({ 
                message: "All fields (stateId, districtId, blockId, siteId, workTypeId, workTypeName) are required." 
            });
        }

        // Check if the work type name already exists within the specified site
        const isDuplicate = await SiteManagement.exists({
            'states._id': stateId,
            'states.districts._id': districtId,
            'states.districts.blocks._id': blockId,
            'states.districts.blocks.sites._id': siteId,
            'states.districts.blocks.sites.workType': {
                $elemMatch: {
                    _id: { $ne: workTypeId }, // Exclude the current work type
                    workTypeName: workTypeName.trim(),
                },
            },
        });

        if (isDuplicate) {
            return res.status(409).json({ 
                message: "A work type with the specified name already exists in the selected site." 
            });
        }

        // Update the work type name
        const result = await SiteManagement.findOneAndUpdate(
            {
                'states._id': stateId,
                'states.districts._id': districtId,
                'states.districts.blocks._id': blockId,
                'states.districts.blocks.sites._id': siteId,
                'states.districts.blocks.sites.workType._id': workTypeId,
            },
            {
                $set: {
                    'states.$[stateElem].districts.$[districtElem].blocks.$[blockElem].sites.$[siteElem].workType.$[workTypeElem].workTypeName': workTypeName.trim(),
                },
            },
            {
                new: true, // Return the updated document
                arrayFilters: [
                    { 'stateElem._id': stateId },
                    { 'districtElem._id': districtId },
                    { 'blockElem._id': blockId },
                    { 'siteElem._id': siteId },
                    { 'workTypeElem._id': workTypeId },
                ],
            }
        );

        if (!result) {
            return res.status(404).json({ 
                message: "State, district, block, site, or work type not found." 
            });
        }

        res.status(200).json({
            message: "Work type name updated successfully.",
            data: result,
        });
    } catch (error) {
        console.error("Error updating work type name:", error);
        res.status(500).json({ 
            message: "Server error. Please try again later." 
        });
    }
};

module.exports = updateWorkTypeNameController;
