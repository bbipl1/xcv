const RequirementsFormModel = require("../../../../models/RequirementsFormModel");

const updateReqFormStatusControllers = async (req, res) => {
  try {
    const { amount, docId } = req.body;

    if (!amount || !docId) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const filter = { _id: docId };

    let recAmt = 0;
    let reqAmt = 0;
    let currentAmount=Number(amount);
    if (currentAmount < 0) {
        return res
          .status(401)
          .json({ message: "Amount can not be negative." });
      }
    let CurrentStatus = "Pending";
    const docs = await RequirementsFormModel.findOne(filter);
    console.log('doc is',docs)
    if (docs) {
      recAmt = Number(docs?.paymentsDetails?.receivedAmt);
      recAmt = recAmt + currentAmount;
      reqAmt = Number(docs?.paymentsDetails?.RequiredAmt);

      if (recAmt === reqAmt) {
        CurrentStatus = "FulFilled";
      } else if (recAmt > 0 && recAmt < reqAmt) {
        CurrentStatus = "Partially FulFilled";
      } else if (recAmt > reqAmt) {
        return res
          .status(401)
          .json({
            message: "Received amount can not be greater than required amount.",
          });
      }
    }

    const payload = {
      "paymentsDetails.receivedAmt": recAmt,
      "paymentsDetails.status": CurrentStatus,
    };

    const response = await RequirementsFormModel.findByIdAndUpdate(
      filter,
      { $set: payload },
      { new: true }
    );
    if (response) {
      return res
        .status(200)
        .json({ message: "Requiremnt form updated successfully." });
    } else {
      return res
        .status(501)
        .json({ message: "getting error while updating the form." });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server internal error" });
  }
};

module.exports = updateReqFormStatusControllers;
