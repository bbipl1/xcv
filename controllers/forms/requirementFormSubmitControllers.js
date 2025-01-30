const RequirementsFormModel = require('../../models/RequirementsFormModel');
const {dayName,dateFormate,timeIn12HourFormat}=require("../../config/date/dateFormate")
const submitRequirementsForm = async (req, res) => {
    try {
        const {
            name,
            id,
            mobile,
            state,
            district,
            block,
            siteName,
            workType,
            dateOfRequirement,
            materialUsed,
            requirements,
            remarks,
        } = req.body;

        console.log(req.body); // Log request body for debugging

        // Validate required fields
        if (
            !name ||
            !id ||
            !mobile ||
            !state ||
            !district ||
            !block ||
            !siteName ||
            !workType ||
            !dateOfRequirement ||
            !materialUsed ||
            !requirements ||
            !remarks
        ) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // Prepare data object with schema-compliant field names
        const data = {
            id,
            name,
            mobile,
            state,
            district,
            block,
            siteName,
            workType,
            date:dateFormate,
            time:timeIn12HourFormat,
            day:dayName,
            dateOfRequirement,
            requirements,
            materialUsed,
            remarks,
        };

        // Save the form data
        const newFormModel = new RequirementsFormModel(data);
        const result = await newFormModel.save();

        if (result) {
            console.log("form saved.")
            return res.status(201).json({ message: "Form saved successfully." });
        }

        res.status(400).json({ message: "Form not saved due to an unknown issue." });
    } catch (error) {
        console.error("Error saving form:", error); // Log detailed error for debugging
        res.status(500).json({ message: "Server error, please try again later." });
    }
};

module.exports = submitRequirementsForm;
