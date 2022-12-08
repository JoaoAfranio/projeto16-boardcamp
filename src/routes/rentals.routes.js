import { Router } from "express";
import { findRentals, insertRental } from "../controllers/rentals.controllers.js";
import { rentalSchemaValidation } from "../middlewares/rentals.middleware.js";

const router = Router();

router.get("/rentals", findRentals);
router.post("/rentals", rentalSchemaValidation, insertRental);

export default router;
