const workerModel = require("../../../models/workerModel");

const unlockEditableForWorkers = async (req,res) => {
  try {
    let { id } = req.body;
    id = id?.trim();
    const worker = await workerModel.findById(id);
    if (!worker) {
      return res
        .status(404)
        .json({ msg: "Manpower not found.", status: "failed" });
    }
    worker.isEditable = true;
    await worker.save();
    return res
      .status(200)
      .json({ msg: "Manpower unlocked.", status: "success" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ err: "Internal server error.", status: "failed" });
  }
};

module.exports = unlockEditableForWorkers;
