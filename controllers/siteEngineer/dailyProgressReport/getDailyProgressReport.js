const DailyProgressReportModel = require("../../../models/forms/DailyProgressReportModel");

const findDailyProgressReport = async (req, res) => {
  try {
    const { id } = req.query;
    let data = {};
    if (id) {
      data = await DailyProgressReportModel.find({ id });
    } else {
      data = await DailyProgressReportModel.find();
      data = data.sort(
        (a, b) =>
          new Date(b.date.split("-").reverse().join("-")) -
          new Date(a.date.split("-").reverse().join("-"))
      );

    //   console.log("data is",);
    }

    if (data) {
      return res.status(201).json({ message: "Data found", data });
    } else {
      res.status(404).json({ message: "Data not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(501).json({ message: "Server error" });
  }
};

module.exports = findDailyProgressReport;
