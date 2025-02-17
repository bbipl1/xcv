const RequirementsFormModel=require("../../../../models/RequirementsFormModel");

const updateReqFormStatusControllers=async(req,res)=>{

    try {

        const {status,docId}=req.body;

        if(!status || !docId){
            return res.status(400).json({message:"All fields are required."});
        }

        const filter={_id:docId};

        const payload={
                'paymentsDetails.status':status
        }

        const response=await RequirementsFormModel.findByIdAndUpdate(filter,{$set:payload},{new :true});
        if(response){
            return res.status(200).json({message:"Requiremnt form updated successfully."});
        }else{
            return res.status(501).json({message:"getting error while updating the form."});

        }
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Server internal error"});
    }

}

module.exports=updateReqFormStatusControllers;