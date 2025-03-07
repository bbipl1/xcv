const {generalFileUpload}=require("../../../uploads/uploadFiles")

const uploadPaymentReceiptMW=(req,res,next)=>{
    const uploader = generalFileUpload("HDD/paymentReceipt").fields([
        { name: "paymentReceipt", maxCount: 10 }, // Field name for file(s)
        { name: "docId", maxCount: 1 },  // Field name for id (non-file)
      ]);
    
      uploader(req, res, (err) => {
        if (err) {
          return next(err); // Pass any errors to the error handler
        }
    
        next(); // Proceed to the next middleware or route handler
      });
}
module.exports=uploadPaymentReceiptMW;