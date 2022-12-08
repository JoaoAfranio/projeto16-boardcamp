import { Router } from "express";
import { findAllCustomers, insertCustomer, updateCustomer } from "../controllers/customers.controller.js";
import { customerCreateValidation, customerSchemaValidation } from "../middlewares/customers.middleware.js";

const router = Router();

router.get("/customers", findAllCustomers);
router.post("/customers", customerSchemaValidation, customerCreateValidation, insertCustomer);
router.put("/customers/:id", customerCreateValidation, updateCustomer);

export default router;
