const RequirementsFormModel = require('../../models/RequirementsFormModel');

const submitForm = async (req, res) => {
    try {
        const {
            empType,
            empName,
            empId,
            empMobile,
            state,
            district,
            block,
            siteName,
            workType,
            date,
            dateOfRequirement,
            requirementType,
            expensesAmount,
            expensesType,
            paymentMethod,
            paymentStatus,
            remarks,
        } = req.body;

        console.log(req.body); // Log request body for debugging

        // Validate required fields
        if (
            !empType ||
            !empName ||
            !empId ||
            !empMobile ||
            !state ||
            !district ||
            !block ||
            !siteName ||
            !workType ||
            !date ||
            !dateOfRequirement ||
            !requirementType ||
            !expensesAmount ||
            !expensesType ||
            !paymentMethod ||
            !paymentStatus ||
            !remarks
        ) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // Prepare data object with schema-compliant field names
        const data = {
            empType,
            empId,
            empName,
            empMobile,
            stateName:state,
            districtName:district,
            blockName:block,
            siteName,
            workTypeName:workType,
            date,
            dateOfRequirement,
            requirementType,
            expensesAmount,
            expensesType,
            paymentMethod,
            paymentStatus,
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

module.exports = submitForm;
