const express = require("express");
const router = express.Router();
const subscriptionController = require("../controllers/subscriptionController");
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");

// Apply authentication middleware on all subscription routes
router.use(authenticate);

// Public routes (accessible to anyone)
router.get("/types", subscriptionController.getSubscriptionTypes);

// Routes requiring 'member' role
router.use(authorize("member")); // Apply 'member' role authorization

// Member subscribes to library system
router.post("/", subscriptionController.subscribeToLibrary);

// Member upgrade or downgrade subscription
router.put("/", subscriptionController.updateSubscription);

// Member remove subscription
router.delete("/", subscriptionController.removeSubscription);

// Billing routes (restricted access)
router.get("/member/:memberId", subscriptionController.getMemberSubscription);
router.post("/billing", subscriptionController.processPayment);
router.get("/billing/history/:memberId", subscriptionController.getBillingHistory);
router.post("/renew", subscriptionController.renewSubscription);
router.put("/auto-renew", subscriptionController.toggleAutoRenewal);

module.exports = router;
