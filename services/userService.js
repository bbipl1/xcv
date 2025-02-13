const mongoose = require("mongoose");
const UserModel = require("../models/userModel");
const SiteEngineersModel = require("../models/siteEngineerModel");

const addSiteEng = async () => {
  try {
    // Await the result of the query
    const users = await UserModel.find(); // Await the database query

    if (users && users.length > 0) {
      // Iterate over users using a for...of loop
      for (const user of users) {
        if (
          user.department === "construction" &&
          user.role === "site-engineer"
        ) {
          //   console.log("I am here");

          // Check if this SiteEngineer already exists by `siteEngObjId`
          const existingSiteEng = await SiteEngineersModel.findOne({
            siteEngObjId: user._id,
            siteEngId: user.id,
          });

          try {
            //update siteEng in the user model
            const alreadyExistId=user.siteEngObjId;
            if(!alreadyExistId){
              user.siteEngObjId = existingSiteEng._id;
              const updatedUser = await user.save();
              if(updatedUser){
                console.log("user updated with new siteEngineer.")
              }else{
                console.log("unable to update with new siteEngineer.")

              }
            }else{
              console.log("user is up-to-date updated.");
            }
           
          } catch (error) {
            console.log(error);
          }

          if (existingSiteEng) {
            console.log(`Site Engineer already exists for user: ${user._id}`);
            continue; // Skip to the next user if the data is already present
          } else {
            console.log("not", existingSiteEng, user._id, user.id);
          }

          // If no existing entry is found, create the site engineer
          const siteEngData = {
            siteEngObjId: user._id, // Correctly assign ObjectId from UserModel
            siteEngId: user.id, // Assuming 'id' is a unique identifier
          };

          // Create a new site engineer entry
          const siteEng = new SiteEngineersModel(siteEngData);

          // Save the site engineer to the database
          await siteEng.save();
          console.log(`Site Engineer added for user: ${user._id}`);
        }
      }
    } else {
      console.log("No users found");
    }
  } catch (error) {
    console.error("Error adding Site Engineer:", error);
  }
};

module.exports = addSiteEng;
