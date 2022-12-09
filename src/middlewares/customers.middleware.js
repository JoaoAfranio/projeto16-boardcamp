import { customersSchema } from "../models/customers.models.js";
import connection from "../database/db.js";

export async function customerSchemaValidation(req, res, next) {
  const customer = req.body;
  const { error } = customersSchema.validate(customer);
  if (error) return res.sendStatus(400);

  next();
}

export async function insertCustomerValidation(req, res, next) {
  const customer = req.body;

  const existsCustomer = await connection.query("SELECT * FROM customers WHERE cpf= $1", [customer.cpf]);
  if (existsCustomer.rowCount !== 0) return res.sendStatus(409);

  next();
}

export async function updateCustomerValidation(req, res, next) {
  const id = Number(req.params.id);
  const customer = req.body;

  const cpfInUse = await connection.query("SELECT * FROM customers WHERE cpf= $1 AND id != $2", [customer.cpf, id]);
  if (cpfInUse.rowCount !== 0) return res.sendStatus(409);

  next();
}
