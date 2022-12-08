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
  const id = req.params;

  console.log(id);

  // try {
  //   await connection.query("INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4)", [name, phone, cpf, birthday]);
  //   res.sendStatus(201);
  // } catch (err) {
  //   console.log(err);
  //   res.sendStatus(500);
  // }
}
