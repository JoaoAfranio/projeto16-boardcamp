import connection from "../database/db.js";

export async function findGames(req, res) {
  try {
    const allGames = await connection.query("SELECT * FROM games");
    res.send(allGames.rows);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function insertGame(req, res) {
  const { name, image, stockTotal, categoryId, pricePerDay } = req.body;

  try {
    await connection.query('INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5)', [
      name,
      image,
      stockTotal,
      categoryId,
      pricePerDay,
    ]);

    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
