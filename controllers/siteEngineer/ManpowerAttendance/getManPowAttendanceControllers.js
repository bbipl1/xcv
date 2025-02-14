const siteEngAttendanceModel = require("../../../models/siteEngAttendanceModel");

const getManPowerAttendance = async (req, res) => {
  try {
    const response = await siteEngAttendanceModel
      .find()
      .populate({
        path: "workers.objId",
        select: "name date day mobile", // Select required fields
      })
      .populate({
        path: "siteEngObjId", 
        populate: {
            path: "siteEngObjId", // Replace this with the actual field name
            model: "User", // Specify the model if it's a different referenced document
            select: "name email mobile", // Select necessary fields
          },
      })
      .exec();

    if (response.length > 0) {
      return res.status(200).json({ message: "Data fetched successfully", data: response });
    } else {
      return res.status(404).json({ message: "No data found", data: [] });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = getManPowerAttendance;
