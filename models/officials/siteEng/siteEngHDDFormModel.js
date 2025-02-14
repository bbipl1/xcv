const mongoose = require("mongoose");

const schema = {
  siteEngId: { type: String, trim: true, required: true, unique: false },
  siteEngObjId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SiteEngineers",
    trim: true,
    required: true,
    unique: false,
  },
  date: { type: String, trim: true, required: true, unique: false },
  time: { type: String, trim: true, required: true, unique: false },
  day: { type: String, trim: true, required: true, unique: false },
  dateOfRequirements: {
    type: String,
    trim: true,
    required: true,
    unique: false,
  },
  hddDetails:[{
    dia: { type: String, trim: true, required: true, unique: false },
    meter: { type: String, trim: true, required: true, unique: false },
    rate: { type: String, trim: true, required: true, unique: false },
    amount: { type: String, trim: true, required: false, unique: false },
  }],
  
  paymentRec: {
    status: { type: String, trim: true, required: true, unique: false },
    amount: { type: String, trim: true, required: false, unique: false },
  },

  expenses:[ {
    name: { type: String, trim: true, required: true, unique: false },
    value: { type: String, trim: true, required: true, unique: false },
  }],
  remarks: { type: String, trim: true, required: true, unique: false },
};
const HDDFormSchema = new mongoose.Schema(schema);
const HDDFormModel = mongoose.model("HDDForm", HDDFormSchema);
module.exports = HDDFormModel;
