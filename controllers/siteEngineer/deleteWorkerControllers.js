const Worker=require("../../models/workerModel")
// Delete a worker
const deleteWorker = async (req, res) => {
  const { workerId } = req.params;

  try {
    // Find the worker and delete them from the database
    const worker = await Worker.findByIdAndDelete(workerId);

    if (!worker) {
      return res.status(404).json({ message: 'Worker not found' });
    }

    // Respond with success message
    res.status(200).json({ message: 'Worker deleted successfully' });
  } catch (error) {
    console.error('Error deleting worker:', error);
    res.status(500).json({ message: 'Error deleting worker.' });
  }
};

module.exports=deleteWorker