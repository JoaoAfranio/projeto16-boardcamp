import { customersSchema } from "../models/customers.models.js";
import connection from "../database/db.js";

export async function customerSchemaValidation(req, res, next) {
  const customer = req.body;

  const { error } = customersSchema.validate(customer);

  if (error) return res.sendStatus(400);

  next();
}

export async function customerCreateValidation(req, res, next) {
  const customer = req.body;

  const existsCustomer = await connection.query("SELECT * FROM customers WHERE cpf= $1", [customer.cpf]);
  if (existsCustomer.rowCount !== 0) return res.sendStatus(409);

  next();
}
