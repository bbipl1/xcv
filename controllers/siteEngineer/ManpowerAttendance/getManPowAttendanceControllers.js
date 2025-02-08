const siteEngAttendanceModel = require("../../../models/siteEngAttendanceModel");

const getManPowerAttendance=async(req,res)=>{

    try {

        const response=await siteEngAttendanceModel.find().populate("workers.objId");
        if(response){
            return res.status(200).json({message:"data fetched success",data:response});
        }else{
            return res.status(404).json({message:"data not fetched success",data:response});
          
        }
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"server error",data:error});

    }
}

module.exports=getManPowerAttendance;