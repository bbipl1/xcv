const SiteManagement = require('../../../models/siteManagementModel'); // Adjust the path as needed

// Controller for updating a district name
const updateDistrictNameController = async (req, res) => {
    try {
        const { stateId, districtId } = req.query;
        const { districtName } = req.body;

        // console.log(stateId)
        // console.log(districtId)
        // console.log(districtName)

        // Validate required fields
        if (!stateId || !districtId || !districtName || typeof districtName !== 'string') {
            return res.status(400).json({ message: "Invalid input. State ID, district ID, and district name are required." });
        }

        // Check if the district name already exists
        const isDuplicate = await SiteManagement.exists({
            'states.districts.districtName': districtName.trim(),
        });

        if (isDuplicate) {
            return res.status(401).json({ message: "District name already exists." });
        }

        // Update the district name
        const result = await SiteManagement.findOneAndUpdate(
            { 'states._id': stateId, 'states.districts._id': districtId },
            { $set: { 'states.$[stateElem].districts.$[districtElem].districtName': districtName.trim() } },
            {
                new: true, // Return the updated document
                arrayFilters: [
                    { 'stateElem._id': stateId },
                    { 'districtElem._id': districtId },
                ],
            }
        );

        console.log(result)

        // Check if the update was successful
        if (!result) {
            return res.status(404).json({ message: "State or district not found." });
        }

        // Respond with success
        res.status(200).json({
            message: "District name updated successfully.",
            data: result,
        });
    } catch (error) {
        console.error("Error updating district name:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};

module.exports = updateDistrictNameController;
