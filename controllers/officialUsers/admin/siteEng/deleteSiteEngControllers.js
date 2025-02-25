const HDDFormModel = require("../../../../models/officials/siteEng/siteEngHDDFormModel");

const deleteHddForm = async (req, res) => {  
    try {
        const { docId } = req.query;

        if (!docId) {
            return res.status(400).json({ message: "Mandatory information is required." });
        }

        const response = await HDDFormModel.findByIdAndDelete(docId);

        if (response) {
            return res.status(200).json({ message: "Document deleted successfully." });
        } else {
            return res.status(404).json({ message: "Document not found." });
        }
    } catch (error) {
        console.error("Error deleting document:", error); // Improved error logging
        return res.status(500).json({ message: "Internal server error." });
    }
};

module.exports = deleteHddForm;
