const express = require("express");
const RequirementsFormModel = require("../../models/RequirementsFormModel");

const getAllForms=async(req,res)=>{
    try {
        // Fetch all forms from the database
        // console.log("fetching...")
        let forms = await RequirementsFormModel.find();
        forms = forms.sort(
          (a, b) =>
            new Date(b.date.split("-").reverse().join("-")) -
            new Date(a.date.split("-").reverse().join("-"))
        );
    
        if (forms.length === 0) {
          console.log("requirements form not found")
          return res.status(405).json({ message: "No forms found." });
        }
        
        console.log("requirements form fetched and sent")
        res.status(200).json(forms);
      } catch (error) {
        console.error("Error fetching forms:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
      }
}

module.exports=getAllForms