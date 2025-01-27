const SiteDetailsModel =require('../../models/siteManagementModel')
const addSiteDetailsControllers=async(req,res)=>{
const {state,district,location,siteName}=req.body;
const updateData={
    state:{district:{location:siteName}}
}
}

module.exports=addSiteDetailsControllers;