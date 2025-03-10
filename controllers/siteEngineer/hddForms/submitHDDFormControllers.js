const HDDForm = require("../../../models/officials/siteEng/siteEngHDDFormModel");
const { getCurrentDateTime } = require("../../../config/date/dateFormate");
const submitHDDFormControllers = async (req, res) => {
  try {
    const date = getCurrentDateTime().dateFormate;
    const time = getCurrentDateTime().timeIn12HourFormat;
    const day = getCurrentDateTime().dayName;

    if (!date || !time || !day) {
      return res.status(501).json({ message: "date-time error" });
    }

    const {
    siteEngId,
      siteEngObjId,
      dateOfRequirements,
      hddDetails,
      expenses,
      siteName,
      remarks,
      clientName,
      clientAmount,
      companyName,
      companyAmount,
      paidBy
    } = req.body;

    console.log(req.body)

    if (
      !siteEngId ||
      !siteEngObjId ||
      !dateOfRequirements ||
      !expenses ||
      !siteName
     
    ) {
      return res
        .status(400)
        .json({ message: "All mendatory fields are required." });
    }

    const payload = {
      siteEngId,
      siteEngObjId,
      dateOfRequirements,
      hddDetails,
      expenses,
      remarks,
      date,
      siteName,
      time,
      day,
      'paymentReceivedFromClient.amount':String(clientAmount)?.trim(),
      'paymentReceivedFromClient.clientName':clientName?.trim(),
      'paymentReceivedFromClient.date':date,
      'paymentReceivedFromClient.time':time,
      'paymentReceivedFromClient.day':day,

      'paymentReceivedFromCompany.amount':String(companyAmount)?.trim(),
      'paymentReceivedFromCompany.companyName':String(companyName)?.trim(),
      'paymentReceivedFromCompany.paidBy':String(paidBy)?.trim(),
      'paymentReceivedFromCompany.date':date,
      'paymentReceivedFromCompany.time':time,
      'paymentReceivedFromCompany.day':day,

    };

    const newHddForm=new HDDForm(payload);
    const response=await newHddForm.save();
    if(response){
        return res.status(200).json({message:"HDD form saved successfully."});
    }else{
        
        return res.status(502).json({message:"getting error while saving the document."});
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = submitHDDFormControllers;
