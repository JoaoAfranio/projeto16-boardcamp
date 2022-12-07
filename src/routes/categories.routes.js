import { Router } from "express";
import { findCategories, insertCategory } from "../controllers/categories.controllers.js";
import { categorySchemaValidation } from "../middlewares/categories.middleware.js";

const router = Router();

router.get("/categories", findCategories);
router.post("/categories", categorySchemaValidation, insertCategory);

export default router;
