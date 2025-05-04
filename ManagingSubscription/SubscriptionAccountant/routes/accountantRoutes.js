const express = require("express");
const router = express.Router();
const accountantController = require("../controllers/accountantController");
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");

// Apply authentication middleware to all routes in this router
router.use(authenticate);

// Routes accessible only by 'accountant' role
router.get("/", authorize("accountant"), accountantController.getMemberSubscriptionList);
router.put("/", authorize("accountant"), accountantController.updateMemberSubscription);
router.get("/billing", authorize("accountant"), accountantController.getAllBillingRecords);
router.get("/billing/:subscriptionId", authorize("accountant"), accountantController.getBillingHistory);
router.put("/billing/:billingId", authorize("accountant"), accountantController.updateBillingStatus);

module.exports = router;
