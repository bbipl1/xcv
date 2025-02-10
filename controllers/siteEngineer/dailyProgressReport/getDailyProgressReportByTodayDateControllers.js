const DailyProgressReportModel=require("../../../models/forms/DailyProgressReportModel")
const {dateFormate}=require("../../../config/date/dateFormate")

const findDailyProgressReportByDate=async(req,res)=>{
try {

    const {id}=req.query;
    let data={};
    console.log("i am",id)
    const filter={$and:[{id},{date:dateFormate}]}
    if(id){
        data=await DailyProgressReportModel.findOne(filter);
    }
    
    console.log(data)
    if(data){
        return res.status(201).json({message:"Data found",data:data});
    }else{
        return res.status(404).json({message:"Data not found"})
    }
} catch (error) {
    console.log(error)
    return res.status(501).json({message:"Server error"})
}
}

module.exports=findDailyProgressReportByDate;