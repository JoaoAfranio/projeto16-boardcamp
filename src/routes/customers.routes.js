import { Router } from "express";
import { findAllCustomers, findCustomer, insertCustomer, updateCustomer } from "../controllers/customers.controller.js";
import { customerSchemaValidation } from "../middlewares/customers.middleware.js";

const router = Router();

router.get("/customers", findAllCustomers);
router.get("/customers/:id", findCustomer);
router.post("/customers", customerSchemaValidation, insertCustomer);
router.put("/customers/:id", customerSchemaValidation, updateCustomer);

export default router;
