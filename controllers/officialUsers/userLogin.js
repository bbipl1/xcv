const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../../models/userModel');

// Login functionality using empId or empMobile
const userLogin = async (req, res) => {
    const { empId, empMobile, empPassword,empDepartment } = req.body;
    // throw new Error("Something went wrong");
    try {
        // Find user by empId or empMobile
        const user = await User.findOne({
            $or: [{ id: empId?.trim(),department:empDepartment }, { mobile: empMobile?.trim(),department:empDepartment }] // Match either empId or empMobile
        });

        if (!user) {
            console.log("User not found.")
            return res.status(404).json({
                message: 'Invalid credentials.',
            });
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await user.comparePassword(empPassword);
        if (!isMatch) {
            return res.status(401).json({
                message: 'Invalid credentials. Incorrect password.',
            });
        }

        // Generate JWT token
        // console.log(x)
        const token = jwt.sign(
            { userId: user._id, id: user.id, mobile: user.mobile },
            process.env.JWT_SECRET || 'your_jwt_secret', // Use your own secret key here
            { expiresIn: '1h' } // Token expires in 1 hour
        );

        // Respond with the token
        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                name: user.name,
                mobile: user.mobile,
                role: user.role,
                email: user.email,
                objId:user._id,
                siteEngObjId:user.siteEngObjId
            }
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({
            message: 'Server error, please try again later.',
        });
    }
};

module.exports = {
    userLogin,
};
