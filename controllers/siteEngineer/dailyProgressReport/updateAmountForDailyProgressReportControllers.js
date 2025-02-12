const DailyProgressReportModel = require("../../../models/forms/DailyProgressReportModel");
const { getCurrentDateTime } = require("../../../config/date/dateFormate");

// AWS SDK v3 configuration
const dateFormate = getCurrentDateTime().dateFormate;
const timeIn12HourFormat = getCurrentDateTime().timeIn12HourFormat;
const dayName = getCurrentDateTime().dayName;

// Controller function to submit the daily progress report
const updateAmountForDailyProgressReport = async (req, res) => {
  try {
    // Extract data from request body
    // objId-document objId or id ,not siteEng objId
    const { objectId, amount } = req.body;

    console.log(req.body);

    const filter = {
      //   $and: [{ _id: objId }, { date: dateFormate }],
      $and: [{ _id: objectId }],
    };

    // const reportData = {
    //   expenses: {
    //     status: expenses.status,
    //     received: "0",
    //   },
    // };

    const existingSiteEngineer = await DailyProgressReportModel.findOne(filter);
    if (!existingSiteEngineer) {
      console.log("Data not found.");
      return res.status(404).json({ message: "Document not found", data: [] });
    }
    const newAmount = Number(amount);
    if (!newAmount) {
      return res.status(400).json({ message: "Amount is required." });
    } else if (newAmount < 0) {
      return res
        .status(400)
        .json({ message: "Amount should be greater than 0." });
    }

    const receivedAmount = Number(existingSiteEngineer.expenses.received);
    const updatedReceivedAmount = Number(receivedAmount) + Number(amount);
    const requiredAmount = Number(existingSiteEngineer.expenses.required);
    if (updatedReceivedAmount > requiredAmount) {
      return res
        .status(401)
        .json({
          message: "Received amount is greater than required amount.",
          status: "failed",
        });
    }
    let currentStatus = "UnPaid";
    if (updatedReceivedAmount === 0) {
      currentStatus = "UnPaid";
    } else if (
      updatedReceivedAmount > 0 &&
      updatedReceivedAmount < requiredAmount
    ) {
      currentStatus = "PartialPaid";
    } else if (updatedReceivedAmount === requiredAmount) {
      currentStatus = "Paid";
    }
    existingSiteEngineer.expenses.received = updatedReceivedAmount.toString();
    existingSiteEngineer.expenses.status = currentStatus;
    const response = await existingSiteEngineer.save();

    console.log(response);

    if (response) {
      return res.status(200).json({
        message: "Amount updated successfully",
        data: response,
        status: "success",
      });
    } else {
      return res
        .status(501)
        .json({ message: "Amount not updated.", status: "failed" });
    }
  } catch (error) {
    console.error("Error saving report:", error);
    return res
      .status(500)
      .json({ message: "Error saving report", error: error.message });
  }
};

module.exports = updateAmountForDailyProgressReport;
