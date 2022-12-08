import { Router } from "express";
import { findRentals, insertRental, deleteRental } from "../controllers/rentals.controllers.js";
import { rentalSchemaValidation, deleteRentalValidation } from "../middlewares/rentals.middleware.js";

const router = Router();

router.get("/rentals", findRentals);
router.post("/rentals", rentalSchemaValidation, insertRental);
router.delete("/rentals/:id", deleteRentalValidation, deleteRental);

export default router;
