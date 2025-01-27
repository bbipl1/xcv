const SiteManagement = require('../../../models/siteManagementModel');

const addDistrictNameControllers = async (req, res) => {
    try {
        // console.log("I am working");

        const { stateId, districtName } = req.body; // Expect both stateId and districtName

        console.log(stateId, districtName);

        // Validate the input
        if (!stateId || !districtName || typeof districtName !== 'string') {
            return res.status(400).json({ message: "Invalid state or district name provided." });
        }

        // Step 1: Check if districtName already exists in the document for the given state
        const existingDoc = await SiteManagement.findOne({
            states: {
                $elemMatch: {
                    _id: stateId,
                    districts: {
                        $elemMatch: {
                            districtName: districtName,
                        },
                    },
                },
            },
        });
        

        if (existingDoc) {
            console.log("District already exists in this state.");
            return res.status(400).json({ message: "District name already exists in this state." });
        }

        // Step 2: Add the district to the specified state
        const updateResult = await SiteManagement.updateOne(
            { 'states._id': stateId },
            {
                $addToSet: { 
                    'states.$.districts': { districtName } 
                }
            }
        );

        // Check if the district was actually added or already exists
        if (updateResult.modifiedCount > 0 || updateResult.upsertedCount > 0) {
            console.log("District added successfully.");
            return res.status(200).json({ message: "District added to the existing state." });
        } else {
            console.log("District already exists or no changes were made.");
            return res.status(400).json({ message: "District name already exists or no changes were made." });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: `Server error: ${error.message}` });
    }
};

module.exports = addDistrictNameControllers;
