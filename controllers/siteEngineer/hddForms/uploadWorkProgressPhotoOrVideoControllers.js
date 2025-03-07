const HDDForm = require("../../../models/officials/siteEng/siteEngHDDFormModel");
const { getCurrentDateTime } = require("../../../config/date/dateFormate");

const uploadWorkProgressPhotoOrVideoControllers = async (req, res) => {
  try {
    const date = getCurrentDateTime().dateFormate;
    const time = getCurrentDateTime().timeIn12HourFormat;
    const day = getCurrentDateTime().dayName;
    let { docId, id } = req.body;
    // console.log("uploading",req.body)
    docId = docId?.trim();
    id = id?.trim();
    if (!docId) {
      return res.status(400).json({ message: "All fields are required." });
    }
    let files = req.files || [];
    if (Array.isArray(files) && files.length == 0) {
      return res.status(400).json({ message: "File/s not found." });
    }

    const filesPayload = files?.WorkProgressPhotoOrVideo?.map((file) => ({
      url: file?.location,
      date,
      time,
      day,
    }));

    if (Array.isArray(filesPayload) && filesPayload.length == 0) {
      return res.status(404).json({
        message: "File/s not found. or url is missing.",
      });
    }

    const doc = await HDDForm.findById(docId);
    if (!doc) {
      return res.status(404).json({ message: "Document not found." });
    }

    doc.workProgressPhotoOrVideo.push(...filesPayload);

    await doc.save();
    return res
      .status(200)
      .json({ message: "work progress images/videos updated successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server internal error" });
  }
};

module.exports = uploadWorkProgressPhotoOrVideoControllers;
