const { default: mongoose } = require("mongoose");

// SiteDetails Schema definition
const siteManagementSchema = mongoose.Schema({
  states: [
    {
      stateName: {
        type: String,
        required: true,
        trim: true,
      },
      status: {
        type: String,
        enum: ["Active", "InActive"],
        default: "Active",
      },
      districts: [
        {
          districtName: {
            type: String,
            required: true,
            trim: true,
          },
          status: {
            type: String,
            enum: ["Active", "InActive"],
            default: "Active",
          },
          blocks: [
            {
              blockName: {
                type: String,
                required: true,
                trim: true,
              },
              status: {
                type: String,
                enum: ["Active", "InActive"],
                default: "Active",
              },
              sites: [
                {
                  siteName: {
                    type: String,
                    required: true,
                    trim: true,
                  },
                  status: {
                    type: String,
                    enum: ["Active", "InActive"],
                    default: "Active",
                  },
                  workType: [
                    {
                      workTypeName: {
                        type: String,
                        required: true,
                        trim: true,
                      },
                      status: {
                        type: String,
                        enum: ["Active", "InActive"],
                        default: "Active",
                      },
                      works:[
                        {
                          workName:{

                          },
                          workStatus:{

                          },
                          machinaryUsed:{
                            
                          }
                        }
                      ]
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
});

// Creating the model
const siteManagementModel = mongoose.model("SiteDetails", siteManagementSchema);

module.exports = siteManagementModel;
