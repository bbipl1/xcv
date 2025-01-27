const SiteDetailsModel =require('../../models/siteManagementModel')
const addLocationNameControllers=async(req,res)=>{
    try {
        
        const {state,district,location}=req.body;
        const filter={
            "states.stateName":state,
            "states.districts.districtName":district,
            
        }
        const newData={
            "states.$[state].districts.$[district].locations.locationName":location
        }
        const arrayFilter=[
            { "state.stateName": state },          
            { "district.districtName": district }, 
            
        ];
        const result=await SiteDetailsModel.updateOne(filter,{$push:newData},{arrayFilters:arrayFilter});
        if(result){
            res.status(201).json({message:"locationName updated successfully."})
        }else{
            res.status(401).json({message:"Getting error."})
        }

    } catch (error) {
        console.log(error)
        res.status(501).json({message:"Server error"});
    }

}

module.exports=addLocationNameControllers;