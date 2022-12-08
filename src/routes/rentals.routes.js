import { Router } from "express";
import { findRentals, insertRental, deleteRental, returnRental } from "../controllers/rentals.controllers.js";
import { rentalSchemaValidation, deleteRentalValidation, returnRentalValidation } from "../middlewares/rentals.middleware.js";

const router = Router();

router.get("/rentals", findRentals);
router.post("/rentals", rentalSchemaValidation, insertRental);
router.delete("/rentals/:id", deleteRentalValidation, deleteRental);
router.post("/rentals/:id/return", returnRentalValidation, returnRental);

export default router;
