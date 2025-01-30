const Users = require("../../models/userModel");
const getUser = async (req,res) => {
  try {
    const { id } = req.query;
    if(!id){
        return res
        .status(400)
        .json({ message: "user id is required", status: "false" });
    }
    // console.log(id)
    const response = await Users.findOne({ id });
    // { password: -1, token: -1 }
    // console.log(response)
    if (response) {
      return res
        .status(200)
        .json({ message: "data fetched", data: response});
    } else {
      return res
        .status(404)
        .json({ message: "user not found", data: response });
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = getUser;
