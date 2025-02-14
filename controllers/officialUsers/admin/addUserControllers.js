const User = require("../../../models/userModel");

const addNewUser = async (req,res) => {
  try {
    let {id,name,mobile,email,department,role,gender,password}=req.body
    id=id?.trim();
    name=name?.trim();
    mobile=mobile?.trim();
    email=email?.trim();
    department=department?.trim();
    role=role?.trim();
    gender=gender?.trim();
    password=password?.trim();

    if(!id || !name || !mobile  || !department || !role || !gender || !password){
        return res.status(400).json({message:"All fields are required."});
    }
    // const users=await User.find();
    // const totalNoOfUsers=users.length;
    // const id = "BB" + String(totalNoOfUsers).padStart(4, '0');
    const payload={
        id,
        name,
        mobile,
        email,
        department,
        role,
        gender,
        password
    }

    console.log(payload)

    const newUser=new User(payload);
    const response=await newUser.save();
    if(response){
        console.log("User added successfully")
        return res.status(200).json({message:"User added successfully"});
    }else{
        console.log("getting an error while adding a new user")
        return res.status(501).json({message:"getting an error while adding a new user"});
        
    }
    
} catch (error) {
    console.log(error);
    return res.status(500).json({message:"getting an server error"});
  }
};

module.exports = addNewUser;
