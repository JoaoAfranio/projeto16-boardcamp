import connection from "../database/db.js";

export async function findAllCustomers(req, res) {
  try {
    const allCustomers = await connection.query("SELECT * FROM customers");
    res.send(allCustomers.rows);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function findCustomer(req, res) {
  const id = req.params.id;

  try {
    const customer = await connection.query("SELECT * FROM customers WHERE id = $1", [id]);
    res.send(customer.rows[0]);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function insertCustomer(req, res) {
  const { name, phone, cpf, birthday } = req.body;

  try {
    await connection.query("INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4)", [name, phone, cpf, birthday]);
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function updateCustomer(req, res) {
  const { name, phone, cpf, birthday } = req.body;
  const id = req.params.id;

  try {
    await connection.query("UPDATE customers SET name = $1, phone = $2, cpf = $3, birthday = $4 WHERE id = $5", [name, phone, cpf, birthday, id]);
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
