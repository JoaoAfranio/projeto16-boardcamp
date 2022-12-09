import { Router } from "express";
import { findAllCustomers, findCustomer, insertCustomer, updateCustomer } from "../controllers/customers.controller.js";
import { customerSchemaValidation, insertCustomerValidation, updateCustomerValidation } from "../middlewares/customers.middleware.js";

const router = Router();

router.get("/customers", findAllCustomers);
router.get("/customers/:id", findCustomer);
router.post("/customers", customerSchemaValidation, insertCustomerValidation, insertCustomer);
router.put("/customers/:id", customerSchemaValidation, updateCustomerValidation, updateCustomer);

export default router;
