const HDDForm = require("../../../models/officials/siteEng/siteEngHDDFormModel");
const getHDDFormControllers = async (req, res) => {
  try {
    const { id } = req.query;
    let response = null;
    if (id) {
      // console.log("id is:",id)
      response = await HDDForm.find({ siteEngId: id });
    } else {
      response = await HDDForm.find();
    }

    if (response) {
      response = response?.sort(
        (a, b) =>
          new Date(b.date.split("-").reverse().join("-")) -
          new Date(a.date.split("-").reverse().join("-"))
      );
      return res
        .status(200)
        .json({ message: "data fetched successfully.", data: response });
    } else {
      return res
        .status(502)
        .json({ message: "getting error while fetching hdd fomrs." });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server internal error." });
  }
};

module.exports = getHDDFormControllers;
