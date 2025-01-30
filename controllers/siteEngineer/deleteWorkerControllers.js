const mongoose = require("mongoose");
const Worker = require("../../models/workerModel");
const SiteEngineers = require("../../models/siteEngineerModel");

const deleteWorkers = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    const { workerId, siteEngId, siteEngObjId } = req.body;
    session.startTransaction();
    // console.log(req.body)

    // Find the Worker
    const worker = await Worker.findById({ _id: workerId }).session(session);
    if (!worker || !worker?.siteEngCurrent) {
      throw new Error("Worker not found or no current site engineer assigned.");
    }

    const siteEng = await SiteEngineers.findOne({
      $and: [{ siteEngId: siteEngId }, { siteEngObjId: siteEngObjId }],
    })
    .session(session);
    

    if (!siteEng) {
      throw new Error("Site Engineer not found.");
    }

    // console.log(siteEng)
    // console.log(siteEng.workersCurrent)
    
    // Ensure the worker exists in siteEng.workersCurrent before moving
    const workerObj = siteEng.workersCurrent?.find((w) => {
      // console.log(w.toString(), workerId); // Log every comparison
      return w.toString() === workerId;
    });
    
    if (!workerObj) {
      throw new Error(
        "Worker not found in site engineer's current workers list."
      );
    }
    // console.log(workerObj)

    // ✅ Move `siteEngCurrent` (Both ID & ObjId) to `siteEngOld` in Worker Model
    worker.siteEngOld.push({
      siteEngId: worker.siteEngCurrent.siteEngId,
      siteEngObjId: worker.siteEngCurrent.siteEngObjId,
    });

    // Clear `siteEngCurrent`
    worker.siteEngCurrent = null;

    // ✅ Move worker (Both ID & ObjId) from `workersCurrent` to `workersOld` in Site Engineer Model
    siteEng.workersOld.push(worker._id);

    // Remove worker from `workersCurrent`
    siteEng.workersCurrent = siteEng.workersCurrent.filter(
      (id) => id.toString() !== workerId
    );

    // Save both models
    await worker.save({ session });
    await siteEng.save({ session });

    // Commit the transaction (everything succeeds)
    await session.commitTransaction();
    session.endSession();

    console.log("Successfully moved site engineer and worker.");
    res.status(200).json({ success: true, worker, siteEng });
  } catch (error) {
    // Rollback if anything fails
    await session.abortTransaction();
    session.endSession();

    console.error("Error moving site engineer and worker:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = deleteWorkers;
