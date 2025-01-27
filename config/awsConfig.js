const AWS = require('aws-sdk');

// Explicitly provide AWS credentials
AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRECT_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// Initialize AWS S3 with provided credentials
const s3 = new AWS.S3();
module.exports=s3;
