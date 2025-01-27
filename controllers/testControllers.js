const test=async(req,res)=>{
    console.log("I am from test controllers.")
    res.status(201).json({Response:"This is the test route"});
}

module.exports={test}