const ContactUs = require("../../../../models/contactUsModel");
const deleteContactus = async (req, res) => {
  try {
    let { docId } = req?.query;
    docId = docId?.trim();
    if (!docId) {
      return res
        .status(400)
        .json({ message: "mendatory information is required." });
    }

    const response = await ContactUs.findByIdAndDelete(docId);
    if (response) {
      return res
        .status(200)
        .json({ message: "document deleted successfully." });
    } else {
      return res
        .status(404)
        .json({ message: "document not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

module.exports=deleteContactus;
