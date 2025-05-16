const { default: mongoose } = require("mongoose");

const waterDetailsFormate = {
  updatedDate: { type: String, unique: true, required: true, trim: true },
  quantity: { type: String, unique: false, required: true, trim: true },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    unique: false,
    required: true,
    ref: "User",
  },
  remarks: { type: String, unique: false, required: true, trim: true },
  submittedDate: { type: String, unique: false, required: true, trim: true },
  submittedTime: { type: String, unique: false, required: true, trim: true },
  submittedDay: { type: String, unique: false, required: true, trim: true },
};
const waterDetailsSchema = new mongoose.Schema(waterDetailsFormate);
const WaterDetails = mongoose.model("waterDetails", waterDetailsSchema);

module.exports = WaterDetails;
