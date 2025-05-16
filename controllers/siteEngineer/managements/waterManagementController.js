const express=require("express");
const { getCurrentDateTime } = require("../../../config/date/dateFormate");
const WaterDetails = require("../../../models/managements/waterManagementsModel");
const submitWaterDetailsController=async(req,res)=>{
try {
    let {updatedDate,quantity,userId,remarks,rate,supplier,supplierMobileNo}=req.body;
    updatedDate=updatedDate?.toString()?.trim();
    quantity=quantity?.toString()?.trim();
    userId=userId?.toString()?.trim();
    remarks=remarks?.toString()?.trim();
    rate=rate?.toString()?.trim();
    supplier=supplier?.toString()?.trim();
    supplierMobileNo=supplierMobileNo?.toString()?.trim();

    if(!updatedDate || !quantity || !userId || !remarks || !rate || !supplier || !supplierMobileNo){
        return res.status(400).json({status:"failed",err:"All fields are required."})
    }

    const dataToSave={
        updatedDate,
        quantity,
        rate:rate,
        supplier:supplier,
        supplierMobileNo,
        updatedBy:userId,
        remarks,
        submittedDate:getCurrentDateTime().dateFormate,
        submittedTime:getCurrentDateTime().timeIn12HourFormat,
        submittedDay:getCurrentDateTime().dayName
    }

    console.log(dataToSave)

    const newData=new WaterDetails(dataToSave);
    const resData=await newData.save();
    res.status(200).json({status:"ok",data:resData.data,msg:"successfully updated."})
} catch (error) {
    console.log(error);
    return res.status(500).json({err:"Server internal error."})
}
};

module.exports=submitWaterDetailsController;