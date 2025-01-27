
const express=require("express");
const addStateNameControllers=require("../controllers/sitesManagement/states/addStateNameControllers.js");
const findSitesDetails = require("../controllers/sitesManagement/findSiteDetails");
const updateStateNameController = require("../controllers/sitesManagement/states/updateStateNameControllers.js");
const deleteStateNameController = require("../controllers/sitesManagement/states/deleteStateNameControllers.js");

//districts
const addDistrictNameControllers=require("../controllers/sitesManagement/districts/addDistrictNameControllers.js");
const updateDistrictNameController = require("../controllers/sitesManagement/districts/updateDistrictNameControllers.js");
const deleteDistrictNameController = require("../controllers/sitesManagement/districts/deleteDistrictNameControllers.js");
const addBlockNameControllers = require("../controllers/sitesManagement/blocks/addBlockNameControllers.js");
const updateBlockNameController = require("../controllers/sitesManagement/blocks/updateBlockNameControllers.js");
const deleteBlockNameController = require("../controllers/sitesManagement/blocks/deleteBlockNameControllers.js");
const addSitesNameControllers = require("../controllers/sitesManagement/sites/addSitesNameControllers.js");
const updateSiteNameController = require("../controllers/sitesManagement/sites/updateSitesNameControllers.js");
const deleteSiteNameController = require("../controllers/sitesManagement/sites/deleteSitesNameControllers.js");
const addWorkTypesNameControllers = require("../controllers/sitesManagement/workType/addworkTypeNameControllers.js");
const updateWorkTypeNameController = require("../controllers/sitesManagement/workType/updateWorkTypeNameControllers.js");
const deleteWorkTypeNameController = require("../controllers/sitesManagement/workType/deleteWorkTypeNameControllers.js");
// const addSiteDetailsControllers = require("../controllers/sitesManagement/addSiteDetailsControllers");
// const { updateContactUsMessages } = require("../controllers/updateContactUsMessages");
// const addSiteNameControllers = require("../controllers/sitesManagement/addSiteNameControllers");
const router=express.Router();

// const addSiteDetails

//routes to create
router.post("/add-state-name",addStateNameControllers);
router.post("/add-district-name",addDistrictNameControllers);
router.post("/add-block-name",addBlockNameControllers);
router.post("/add-site-name",addSitesNameControllers);
router.post("/add-work-type-name",addWorkTypesNameControllers);
// router.post("add-site-details",addSiteDetailsControllers);
// router.post("add-site-name",addSiteNameControllers);
// router.post("add-location-name",addSiteNameControllers);
// router.post("update-site-details",updateContactUsMessages);
//routes to update
router.put("/update-state-name",updateStateNameController);
router.put("/update-district-name",updateDistrictNameController);
router.put("/update-block-name",updateBlockNameController);
router.put("/update-site-name",updateSiteNameController);
router.put("/update-work-type-name",updateWorkTypeNameController);
//routes to delete
router.delete("/delete-state-name",deleteStateNameController)
router.delete("/delete-district-name",deleteDistrictNameController)
router.delete("/delete-block-name",deleteBlockNameController)
router.delete("/delete-site-name",deleteSiteNameController)
router.delete("/delete-work-type-name",deleteWorkTypeNameController)
//routes to find
router.get("/find-site-details",findSitesDetails);

module.exports=router
