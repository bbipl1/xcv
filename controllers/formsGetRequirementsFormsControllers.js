const express = require("express");
const RequirementsFormModel = require("../models/RequirementsFormModel");

const getAllForms=async(req,res)=>{
    try {
        // Fetch all forms from the database
        console.log("fetching...")
        const forms = await RequirementsFormModel.find();
    
        if (forms.length === 0) {
          return res.status(405).json({ message: "No forms found." });
        }
    
        res.status(200).json(forms);
      } catch (error) {
        console.error("Error fetching forms:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
      }
}

module.exports=getAllForms