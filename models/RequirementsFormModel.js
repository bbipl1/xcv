const mongoose=require('mongoose');
const requirementsFormSchema=new mongoose.Schema({
    empType:{
        type:String,
        required:true,
        trim:true,
    },
    empName:{
        type:String,
        required:true,
        trim:true,
    },
    empId:{
        type:String,
        required:true,
        trim:true,
    },
    empMobile:{
        type:String,
        required:true,
        trim:true,
    },
    date:{
        type:String,
        required:true,
        trim:true,
    },
    stateName:{
        type:String,
        required:true,
        trim:true,
    },
    districtName:{
        type:String,
        required:true,
        trim:true,
    },
    blockName:{
        type:String,
        required:true,
        trim:true,
    },
    siteName:{
        type:String,
        required:true,
        trim:true,
    },
    workTypeName:{
        type:String,
        required:true,
        trim:true,
    },
    dateOfRequirement:{
        type:String,
        required:true,
        trim:true,
    },
    requirementType:{
        type:String,
        required:true,
        trim:true,
        
    },
    expensesAmount:{
        type:String,
        required:true,
        trim:true,
    },
    expensesType:{
        type:String,
        required:true,
        trim:true,
    },
    paymentMethod:{
        type:String,
        required:true,
        trim:true,
    },
    paymentStatus:{
        type:String,
        required:true,
        trim:true,
        enum: ['Received', 'Pending'],
    },
    remarks:{
        type:String,
        required:true,
        trim:true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const requirementsFormModel=mongoose.model("requirementsForms",requirementsFormSchema);
module.exports=requirementsFormModel;