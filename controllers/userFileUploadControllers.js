const multer = require('multer');
const service = require('../services/xlxCsvFileUpload'); // Assuming you have a service file to handle the file logic

// Multer setup for in-memory file handling
const upload = multer({ storage: multer.memoryStorage() });

// User file upload function
const userFileUpload = async (req, res) => {
    try {
        // File has already been uploaded by multer before entering this function
        const fileBuffer = req.file.buffer;
        const fileName = req.file.originalname.toLowerCase();

        // Call service to process the file and extract data
        const extractedData = await service.processFile(fileBuffer, fileName);

        res.json({
            message:'User details extracted and saved successfully',
            data: extractedData,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error processing file',
            error: error.message,
        });
    }
};

// Export multer as middleware to be used in the route
const uploadFile = upload.single('file');

// Export functions
module.exports = {
    userFileUpload,
    uploadFile,
};
