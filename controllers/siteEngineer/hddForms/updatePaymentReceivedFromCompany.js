const SiteEngHDDFormModel = require("../../../models/officials/siteEng/siteEngHDDFormModel");
const { getCurrentDateTime } = require("../../../config/date/dateFormate");
const updatePaymentReceivedFromCompany = async (req, res) => {
  try {
    const date = getCurrentDateTime().dateFormate;
    const time = getCurrentDateTime().timeIn12HourFormat;
    const day = getCurrentDateTime().dayName;

    let { docId, paymentRecFromCompany, companyName, paidBy } = req.body;
    docId = docId?.trim();
    console.log(req.body)
    paymentRecFromCompany = paymentRecFromCompany?.trim();
    companyName = companyName?.trim();
    console.log(req.body);
    if (!docId || !paymentRecFromCompany || !companyName || !paidBy) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const filter = docId;
    const payload = {
      $set: {
        "paymentReceivedFromCompany.amount": paymentRecFromCompany,
        "paymentReceivedFromCompany.companyName": companyName,
        "paymentReceivedFromCompany.paidBy": paidBy,
        "paymentReceivedFromCompany.date": date,
        "paymentReceivedFromCompany.time": time,
        "paymentReceivedFromCompany.day": day,
      },
    };
    const options = { new: true };
    const response = await SiteEngHDDFormModel.findByIdAndUpdate(
      filter,
      payload,
      options
    );
    if (response) {
      return res.status(200).json({ message: "HDD form updated successfully." });
    } else {
      return res.status(404).json({ message: "HDD form not found." });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error." });
  }
};
module.exports = updatePaymentReceivedFromCompany;
