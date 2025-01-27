const SiteDetailsModel =require('../../models/siteManagementModel')
const addSiteNameControllers=async(req,res)=>{
    try {
        
        const {state,district,location,siteName}=req.body;
        const filter={
            "states.stateName":state,
            "states.districts.districtName":district,
            "states.districts.locations.locationName":location
        }
        const newData={
            "states.$[state].districts.$[district].locations.$[location].siteName":siteName
        }
        const arrayFilter=[
            { "state.stateName": state },          
            { "district.districtName": district }, 
            { "location.locationName": location },
        ];
        const result=await SiteDetailsModel.updateOne(filter,{$push:newData},{arrayFilters:arrayFilter});
        if(result){
            res.status(201).json({message:"siteName updated successfully."})
        }else{
            res.status(401).json({message:"Geting error."})
        }

    } catch (error) {
        console.log(error)
        res.status(501).json({message:"Server error"});
    }

}

module.exports=addSiteNameControllers;