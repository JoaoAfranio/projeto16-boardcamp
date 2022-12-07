import connection from "../database/db.js";

export async function findCategories(req, res) {
  try {
    const allCategories = await connection.query("SELECT * FROM categories");
    res.send(allCategories.rows);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function insertCategory(req, res) {
  const { name } = req.body;

  try {
    await connection.query("INSERT INTO categories (name) VALUES ($1)", [name]);
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
