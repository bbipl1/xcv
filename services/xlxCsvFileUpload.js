const csvParser = require('csv-parser');
const xlsx = require('xlsx');
const User = require('../models/userModel');
const stream = require('stream');
const bcrypt = require('bcryptjs');

// Parse CSV file
const parseCSV = (fileBuffer) => {
    return new Promise((resolve, reject) => {
        const results = [];
        const bufferStream = new stream.PassThrough();
        bufferStream.end(fileBuffer);

        bufferStream
            .pipe(csvParser())
            .on('data', (data) => results.push(data))
            .on('end', () => resolve(results))
            .on('error', (err) => reject(err));
    });
};

// Parse Excel file
const parseExcel = (fileBuffer) => {
    const workbook = xlsx.read(fileBuffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    return xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
};

// Save extracted data to MongoDB using .save() for each user
const saveToDatabase = async (data) => {
    try {
        

        const savePromises = data.map(async (item) => {
            
            // const hashedPassword = await bcrypt.hash(String(item.EmpPassword), 10);
            const hashedPassword=item.Password;
            // console.log(item.EmpName.trim().toLowerCase())
            const user = new User({
                id: item.Id?.trim(),
                name: item.Name?.trim(),
                mobile: item.Mobile?.toString().trim().toLowerCase(),
                password: hashedPassword?.toString().trim().toLowerCase(),
                role: item.Role?.trim().toLowerCase() || 'Employee',
                email: item.Email?.trim().toLowerCase() || '',
                department: item.Department?.trim().toLowerCase() || '',
                gender: item.Gender?.trim().toLowerCase() || '',
            });

            // Save each user document using .save()
            return user.save();
        });

        // Wait for all save operations to complete
        await Promise.all(savePromises);
        console.log('User data saved successfully');
    } catch (err) {
        console.error('Error saving data to database:', err);
        throw new Error('Failed to save data to database');
    }
};

// Process uploaded file and extract data
const processFile = async (fileBuffer, fileName) => {
    let extractedData = [];
    if (fileName.endsWith('.csv')) {
        extractedData = await parseCSV(fileBuffer);
    } else if (fileName.endsWith('.xls') || fileName.endsWith('.xlsx')) {
        extractedData = parseExcel(fileBuffer);
    } else {
        throw new Error('Unsupported file format');
    }

    // Save the extracted data to the database
    await saveToDatabase(extractedData);

    return extractedData;
};

module.exports = {
    processFile,
};
