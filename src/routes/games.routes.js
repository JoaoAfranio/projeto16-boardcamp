import { Router } from "express";
import { findGames, insertGame } from "../controllers/games.controllers.js";
import { gameSchemaValidation } from "../middlewares/games.middleware.js";

const router = Router();

router.get("/games", findGames);
router.post("/games", gameSchemaValidation, insertGame);

export default router;
