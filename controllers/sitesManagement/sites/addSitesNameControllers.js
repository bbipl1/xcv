const SiteManagement = require('../../../models/siteManagementModel'); // Adjust the path as needed

const addSitesNameControllers = async (req, res) => {
    try {
        const { stateId, districtId, blockId, siteName } = req.body;

        // Step 1: Validate input
        if (!stateId || !districtId || !blockId || typeof siteName !== 'string' || !siteName.trim()) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const trimmedSiteName = siteName.trim();

        console.log("Input Data:", { stateId, districtId, blockId, siteName: trimmedSiteName });

        // Step 2: Check if the site already exists in the block
        const siteExists = await SiteManagement.findOne({
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
                                            siteName: trimmedSiteName,
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
        
        if (siteExists) {
            return res.status(400).json({ message: "Site name already exists in this block." });
        }

        // Step 3: Add the site to the specified block within the district
        const updateResult = await SiteManagement.updateOne(
            { 'states._id': stateId }, // Match the state
            {
                $addToSet: {
                    'states.$[stateElem].districts.$[districtElem].blocks.$[blockElem].sites': {
                        siteName: trimmedSiteName,
                        workType: [] // You can add workType logic here as needed
                    }
                }
            },
            {
                arrayFilters: [
                    { 'stateElem._id': stateId }, // Filter for the correct state
                    { 'districtElem._id': districtId }, // Filter for the correct district
                    { 'blockElem._id': blockId } // Filter for the correct block
                ],
                new: true // Return the updated document
            }
        );

        console.log("Update Result:", updateResult);

        // Step 4: Return appropriate response
        if (updateResult.modifiedCount > 0) {
            return res.status(200).json({ message: "Site added successfully." });
        } else {
            return res.status(400).json({ message: "No changes were made. Ensure the state, district, and block IDs are correct." });
        }
    } catch (error) {
        console.error("Error adding site:", error);
        return res.status(500).json({ message: `Server error: ${error.message}` });
    }
};

module.exports = addSitesNameControllers;
