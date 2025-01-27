const DailyProgressReportModel=require("../../../models/forms/DailyProgressReportModel")

const findDailyProgressReport=async(req,res)=>{
try {
    
    const data=await DailyProgressReportModel.find();
    if(data){
        return res.status(201).json({message:"Data found",data:data});
    }else{
        res.status(404).json({message:"Data not found"})
    }
} catch (error) {
    console.log(error)
    return res.status(501).json({message:"Server error"})
}
}

module.exports=findDailyProgressReport;