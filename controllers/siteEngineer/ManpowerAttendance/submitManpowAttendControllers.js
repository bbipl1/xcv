const siteEngAttendanceModel = require("../../../models/siteEngAttendanceModel");
const SiteEngineers=require("../../../models/siteEngineerModel")
const {getCurrentDateTime}=require("../../../config/date/dateFormate")

const submitManpowerAttendControllers = async (req, res) => {
  try {
    const {siteEngID,siteEngObjId,latitude,longitude,address}=req.body;
    // console.log(siteEngID,siteLocation)
    let workers = req.body.workers;
    let jsonWorker = JSON.parse(workers);
    let files = req.files;
    // console.log(jsonWorker);
    // console.log(files);
    //siteEngObjId is user's object id
    //I have to use doc object id to populate the field
    const filters={$and:[{siteEngId:siteEngID},{siteEngObjId}]};
    const doc=await SiteEngineers.findOne(filters);
    console.log(doc)
    const docId=doc._id;


    const workersDetails = jsonWorker.map((worker) => {
      const matchingFile = files.find(
        (file) => file.fieldname === `photo_${worker.workerId}`
      );
      return {
        ...worker,
        photoURL: matchingFile ? matchingFile.location : null,
      };
    });

    const finalWorkers = workersDetails.map(({ workerId, ...rest }) => ({
        objId: workerId, // Renaming workerId to objId
        ...rest
      }));
      
      console.log(finalWorkers);
      

    const filter={
            
    }
    const payLoads={

        siteEngObjId:docId,
        siteEngId:siteEngID,
        date:getCurrentDateTime().dateFormate,
        day:getCurrentDateTime().dayName,
        time:getCurrentDateTime().timeIn12HourFormat,
        'siteLocation.latitude':latitude,
        'siteLocation.longitude':longitude,
        'siteLocation.address':address,
        URL:null,
        workers:finalWorkers


    }

    // console.log(payLoads);

    const newAttendance= new siteEngAttendanceModel(payLoads);
    const resp=await newAttendance.save();
    if(resp){
        return res.status(200).json({message:"data saved"});
    }else{
        return res.status(401).json({message:"data not saved"});

    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({message:"server error"});
  }
};

module.exports = submitManpowerAttendControllers;
