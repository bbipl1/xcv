const HDDForm = require("../../../../../../models/officials/siteEng/siteEngHDDFormModel");
const updateSalesAmount = async(req,res) => {
  try {
    let { salesAmount, docId } = req.body;
    if (salesAmount) {
      salesAmount = salesAmount.trim();
    }
    if (docId) {
      docId = docId.trim();
    }
    if (!docId || !salesAmount) {
      return res.status(400).json({ message: "All fields are required." });
    }
    const filter=docId;
    const payload={$set:{salesAmount}};
    const queryOptions={new :true};
    const doc=await HDDForm.findByIdAndUpdate(filter,payload,queryOptions);
    if(doc){
        return res.status(200).json({message:"document updated successfully."});
    }else{
        return res.status(404).json({message:"Unable to find provided document. Update failed."});
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = updateSalesAmount;
