const express = require("express");
const User = require('./models/userModel');
const connectDB = require("./config/db");
const cors = require("cors");
// const multer=require("multer")
const multer = require("multer");
const dotenv = require("dotenv").config();
const server = express();
const PORT = process.env.PORT;

//-------------------------------------
// upload files start here
//-------------------------------------------------------------------------
const upload=multer();
//-------------------------------------------------------------------------
// upload files end here
//-------------------------------------------------------------------------

//---------------------------------------------------------

const attendanceRoutes = require('./routes/attendanceRoutes');
const userRoutes = require('./routes/userRoutes');
const endUserRoutes = require('./routes/endUser/endUserRouter');
const mailRouter =require("./routes/mailRouter");
const formsRouter=require('./routes/formsRouter');
const sitesManagementRouter=require("./routes/sitesManagementRouter");
const attendanceOfDevAndFinRouter = require("./routes/attendanceOfDevAndFinRoutes");
const siteEngineerRoutes = require("./routes/siteEngineerRoutes");
const addSiteEng=require("./services/userService");
const adminRoutes=require("./routes/adminRoutes");
// Middleware
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

//-----------------------Admin-Start---------------------------------
server.use("/api/admin",adminRoutes)
//-----------------------Admin-End-----------------------------------
// Use the routes
server.use('/api', attendanceRoutes); // router for attendance
server.use('/api/attendance/dev-and-fin', attendanceOfDevAndFinRouter); // router for attendance
server.use('/api', userRoutes); // router for users
server.use('/api/email', mailRouter); // router for emails
server.use('/api/forms', formsRouter); // router for forms
server.use('/api/site-management',sitesManagementRouter ); // router for siteDetails
//site-engineers
server.use('/api/constructions/site-engineers',siteEngineerRoutes)

//----------------START-END-USER-----------------------------------------------------------------------------------------
server.use("/api/end-users",endUserRoutes)
//----------------END-END-USER-------------------------------------------------------------------------------------------

// Root endpoint to check if server is working fine
server.get("/", (req, res) => {
    res.send("I am working fine");
});

//-------------------------------------------------------------------------------
// services start
//------------------------------------------------------------------------------

addSiteEng()
// Listen and connect to DB
const startServer = async () => {
    try {
        // Start the server
        server.listen(PORT, async () => {
            console.log("Server is listing on port: ", PORT);
            await connectDB(); // Ensure the DB connection is successful
            
            // Check if the user already exists
            const existingUser = await User.findOne({
                $or: [
                    { id: "BB0001" },  // Check for duplicate empId
                    { mobile: "9415285000" }  // Check for duplicate empMobile
                ]
            });

            if (existingUser) {
                console.log("User already exists, skipping creation.");
            } else {
                // Create a new user (just an example)
                const newUser = new User({
                    id: "BB0001", // Example empId
                    name: "Avnesh pratap singh", // Example name
                    mobile: "9415285000", // Example mobile
                    role: "admin", // Example role
                    email: "rakesh@businessbasket.in", // Example email
                    password: "Avnesh123@", // This will be hashed automatically in the model
                    gender: "male", // This will be hashed automatically in the model
                    department: "admin", // This will be hashed automatically in the model
                });

                // Save the new user to the database
                await newUser.save();
                console.log("New user added successfully");
            }
        });
    } catch (error) {
        console.error("Error starting the server or connecting to DB:", error);
    }
};

// Call the function to start the server
startServer();
