const mongoose = require("mongoose");
const schema = {
  siteEngObjId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    trim: true,
    unique: true,
    required: true,
  },
  siteEngId: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  address: {
    type: String,
    trim: true,
    required: false,
    unique: false,
  },

  profilePicURL: {
    type: String,
    trim: true,
    required: false,
    unique: false,
  },
  workersCurrent: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workers",
      trim: true,
      required: false,
      unique: true,
    },
  ],
  workersOld: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workers",
      trim: true,
      required: false,
      unique: true,
    },
  ],
};

const SiteEngineersSchema = new mongoose.Schema(schema);
const SiteEngineersModel = mongoose.model("SiteEngineers", SiteEngineersSchema);
module.exports = SiteEngineersModel;
