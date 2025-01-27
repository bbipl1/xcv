const SiteManagement = require('../../../models/siteManagementModel'); // Adjust the path as needed

const addWorkTypesNameControllers = async (req, res) => {
    try {
        const { stateId, districtId, blockId, siteId, workTypeName } = req.body;

        // Step 1: Validate input
        console.log(req.body)
        if (!stateId || !districtId || !blockId || !siteId || typeof workTypeName !== 'string' || !workTypeName.trim()) {
            return res.status(400).json({ message: "All fields are required and workTypeName must be a valid string." });
        }else{
            console.log("not found")
        }

        const trimmedWorkTypeName = workTypeName.trim();

        console.log("Input Data:", { stateId, districtId, blockId, siteId, workTypeName: trimmedWorkTypeName });

        const workTypeExists = await SiteManagement.findOne({
            states: {
                $elemMatch: {
                    _id: stateId,
                    districts: {
                        $elemMatch: {
                            _id: districtId,
                            blocks: {
                                $elemMatch: {
                                    _id: blockId,
                                    sites: {
                                        $elemMatch: {
                                            _id: siteId,
                                            'workType.workTypeName': trimmedWorkTypeName,
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
        
        // console.log("i found it:",workTypeExists.states[0].districts)

        if (workTypeExists) {
            return res.status(400).json({ message: "Work type name already exists in this site." });
        }

        // Step 3: Add the work type to the specified site
        const updateResult = await SiteManagement.updateOne(
            {
                'states._id': stateId,
                'states.districts._id': districtId,
                'states.districts.blocks._id': blockId,
                'states.districts.blocks.sites._id': siteId,
            },
            {
                $addToSet: {
                    'states.$[stateElem].districts.$[districtElem].blocks.$[blockElem].sites.$[siteElem].workType': {
                        workTypeName: trimmedWorkTypeName,
                    },
                },
            },
            {
                arrayFilters: [
                    { 'stateElem._id': stateId },
                    { 'districtElem._id': districtId },
                    { 'blockElem._id': blockId },
                    { 'siteElem._id': siteId },
                ],
                new: true, // Return the updated document
            }
        );

        console.log("Update Result:", updateResult);

        // Step 4: Return appropriate response
        if (updateResult.modifiedCount > 0) {
            return res.status(200).json({ message: "Work type added successfully." });
        } else {
            return res.status(400).json({
                message: "No changes were made. Ensure the state, district, block, and site IDs are correct.",
            });
        }
    } catch (error) {
        console.error("Error adding work type:", error);
        return res.status(500).json({ message: `Server error: ${error.message}` });
    }
};

module.exports = addWorkTypesNameControllers;
