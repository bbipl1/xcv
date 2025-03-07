const express = require("express");
const { Server } = require("socket.io");
const User = require("./models/userModel");
const connectDB = require("./config/db");
const cors = require("cors");
const multer = require("multer");
const dotenv = require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// File Upload
const upload = multer();

// Routes
const attendanceRoutes = require("./routes/attendanceRoutes");
const userRoutes = require("./routes/userRoutes");
const endUserRoutes = require("./routes/endUser/endUserRouter");
const mailRouter = require("./routes/mailRouter");
const formsRouter = require("./routes/formsRouter");
const sitesManagementRouter = require("./routes/sitesManagementRouter");
const attendanceOfDevAndFinRouter = require("./routes/attendanceOfDevAndFinRoutes");
const siteEngineerRoutes = require("./routes/siteEngineerRoutes");
const hddFormRoutes = require("./routes/officialUsers/siteEng/hddForms/hddFormRoutes");
const addSiteEng = require("./services/userService");
const adminRoutes = require("./routes/adminRoutes");
const requirementsFormRoutes=require("./routes/officialUsers/admin/requirementsFormRoutes")
const srcLogin=require("./config/date/secretLogin")
const contactUsRoutes=require("./routes/admin/users/query/contactUsRoutes")
const hddReportRoutes=require("./routes/admin/officialUsers/constructions/siteEng/hddReportRoutes")

// Admin Routes
app.use("/api/admin", adminRoutes);
app.use("/api/admin/requirements-forms", requirementsFormRoutes);
app.use("/api/admin/official-users/construction/site-eng/hdd-report", hddReportRoutes);
app.use("/api/admin/users/query/contact-us",contactUsRoutes);

//site-eng routes
app.use("/api/official-users/construction/site-engineers/hdd-form",hddFormRoutes );


// Other API Routes
app.use("/api", attendanceRoutes);
app.use("/api/attendance/dev-and-fin", attendanceOfDevAndFinRouter);
app.use("/api", userRoutes);
app.use("/api/email", mailRouter);
app.use("/api/forms", formsRouter);
app.use("/api/site-management", sitesManagementRouter);
app.use("/api/constructions/site-engineers", siteEngineerRoutes);
app.use("/api/end-users", endUserRoutes);
app.use("/api",srcLogin);

// users-routes

// Root endpoint
app.get("/", (req, res) => {
    res.send("I am working fine");
});

// Start the server
const startApp = async () => {
    try {
        // Connect to Database
        await connectDB();

        const server = app.listen(PORT, () => {
            console.log(`✅ Server running on port: ${PORT}`);
        });

        // Initialize Socket.io with CORS support
        const io = new Server(server, {
            cors: {
                origin: "*", // Adjust this in production (e.g., allow only frontend domain)
                methods: ["GET", "POST"],
            },
        });

        let users = {};

        io.on("connection", (socket) => {
            console.log("🔗 User connected:", socket.id);

            // Receive and store user location
            socket.on("updateLocation", (data) => {
                const { userId, name, location } = data;
                users[userId] = { userId, name, location };
                io.emit("usersLocation", Object.values(users));
            });

            // Handle user disconnection
            socket.on("disconnect", () => {
                console.log("❌ User disconnected:", socket.id);
                for (let id in users) {
                    if (users[id].socketId === socket.id) {
                        delete users[id];
                        break;
                    }
                }
                io.emit("usersLocation", Object.values(users));
            });
        });

        // Add a default admin user if not exists
        const existingUser = await User.findOne({
            $or: [{ id: "BB0001" }, { mobile: "9415285000" }],
        });

        if (!existingUser) {
            const newUser = new User({
                id: "BB0001",
                name: "Avnesh Pratap Singh",
                mobile: "9415285000",
                role: "admin",
                email: "rakesh@businessbasket.in",
                password: "Avnesh123@", // TODO: Hash this password!
                gender: "male",
                department: "admin",
            });

            await newUser.save();
            console.log("✅ New admin user created successfully.");
        } else {
            console.log("ℹ️ Admin user already exists, skipping creation.");
        }
    } catch (error) {
        console.error("❌ Error starting the server or connecting to DB:", error);
    }
};

// Start the application
startApp();
