const WaterDetails = require("../../../models/managements/waterManagementsModel");

const getWaterDetails=async(req,res)=>{
try {

    const {id}=req.query;
    let data=null;
    if(id){
        data=await WaterDetails.find({updatedBy:id}).sort({ updatedDate: 1 });
    }else{
        data=await WaterDetails.find().populate("updatedBy").sort({ updatedDate: 1 });
    }
    console.log(data,id)
    return res.status(200).json({msg:"data fetched",status:"ok",data:data});
    
} catch (error) {
    console.log(error)
    return res.status(500).json({err:"Server internal error.",status:"failed"})
}
}

module.exports=getWaterDetails;