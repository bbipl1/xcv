const EndUser = require("../../models/endUser/EndUserModel");

const createNewEndUser = async (req, res) => {
  try {
    const { firstName, lastName, email, mobile, password,countryCode,gender,dob } = req.body;

    firstName = firstName.trim();
    lastName = lastName.trim();
    email = email.trim();
    mobile = mobile.trim();
    password = password.trim();
    countryCode=countryCode.trim()

    //ensure none of details are empty
    if (!firstName || !lastName || !email || !mobile || !password || !countryCode || !gender || !dob) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const data={
        firstName,
        lastName,
        fullname:firstName+" "+lastName,
        email,
        mobile,
        password,
        isEmailVerified:false,
        isMobileVerified:false,
        countryCode,
        gender,
        dob
    }

    const newEnduser=new EndUser(data);
    const response=await newEnduser.save();
    if(response){
        return res.status(200).json({message:"user created successfully."});
    }else{
        return res.status(501).json({message:"getting server error while creating a new end user."});

    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};
module.exports = createNewEndUser;
