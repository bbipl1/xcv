const SiteEngHDDFormModel = require("../../../models/officials/siteEng/siteEngHDDFormModel");
const { getCurrentDateTime } = require("../../../config/date/dateFormate");

const updatePaymentReceivedFromClient = async (req, res) => {
  try {
    const date = getCurrentDateTime().dateFormate;
    const time = getCurrentDateTime().timeIn12HourFormat;
    const day = getCurrentDateTime().dayName;

    let { docId, paymentReceivedFromClient, clientName } = req.body;
    docId = docId?.trim();
    paymentReceivedFromClient = paymentReceivedFromClient?.trim();
    clientName = clientName?.trim();

    

    if (!docId || !paymentReceivedFromClient || !clientName) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const filter = docId;
    const payload = {
      $set: {
        "paymentReceivedFromClient.amount": paymentReceivedFromClient,
        "paymentReceivedFromClient.clientName": clientName,
        "paymentReceivedFromClient.date": date,
        "paymentReceivedFromClient.time": time,
        "paymentReceivedFromClient.day": day,
      },
    };
    const options={new:true}

    const response = await SiteEngHDDFormModel.findByIdAndUpdate(filter,payload,options);
    if (response) {
      res.status(200).json({ message: "HDD form updated successfully." });
    } else {
      res.status(404).json({ message: "HDD form not found." });
    }
  } catch (error) {
    console.log(error);
    resizeBy.status(500).json({ message: "Internal server error." });
  }
};
module.exports = updatePaymentReceivedFromClient;
