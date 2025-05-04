const express = require("express");
const router = express.Router();
const wishlistController = require("../controllers/wishlistController");
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");

// Apply authentication middleware to all routes in this router
router.use(authenticate);

// Public route: Create a new wishlist
router.post("/", authorize("member"), wishlistController.createWishlist);

// Add media to a specific wishlist
router.post("/:id/media", authorize("member"), wishlistController.addMediaToWishlist);

// Remove media from a specific wishlist
router.delete("/:wishlistId/media/:mediaId", authorize("member"), wishlistController.removeMediaFromWishlist);

// Delete a specific wishlist
router.delete("/:id", authorize("member"), wishlistController.deleteWishlist);

// Get all wishlists
router.get("/", authorize("member"), wishlistController.getAllWishlists);

// Get details of a specific wishlist
router.get("/:id", authorize("member"), wishlistController.getWishlistWithDetails);

module.exports = router;
