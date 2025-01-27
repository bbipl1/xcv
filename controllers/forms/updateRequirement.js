const mongoose = require('mongoose');

const requirementsFormModel=require('../../models/RequirementsFormModel')

const updatePaymentStatusByObjectId = async (req,res ) => {
    try {
        const {objectId,newStatus}=req.body
        // Validate newStatus to ensure it's either 'Received' or 'Pending'
        if (!['Received', 'Pending'].includes(newStatus)) {
            throw new Error('Invalid payment status. Must be either "Received" or "Pending".');
        }

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(objectId)) {
            throw new Error('Invalid ObjectId.');
        }

        const updatedDocument = await requirementsFormModel.findByIdAndUpdate(
            objectId, // Filter using the ObjectId
            { paymentStatus: newStatus }, // Update field
            { new: true } // Return the updated document
        );

        if (!updatedDocument) {
            console.log("No document found with the provided ObjectId.");
            return null;
        }

        console.log("Updated Document:", updatedDocument);
        return updatedDocument;
    } catch (error) {
        console.error("Error updating payment status:", error.message);
    }
};

module.exports=updatePaymentStatusByObjectId
