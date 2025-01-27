const Worker=require("../../models/workerModel")
const getAllWorkers = async (req, res) => {
    const { siteEngineerId } = req.query;
  
    try {
      // Fetch workers from the database based on site engineer ID
      const workers = await Worker.find({ 'siteEngCurrent.siteEngId':siteEngineerId });
      console.log(workers)
  
      // Respond with the workers data
      res.status(200).json(workers);
    } catch (error) {
      console.error('Error fetching workers:', error);
      res.status(500).json({ message: 'Error fetching workers.' });
    }
  };

  module.exports=getAllWorkers