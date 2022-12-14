import connection from "../database/db.js";

export async function findGames(req, res) {
  const name = req.query.name;

  try {
    if (name) {
      const filterByNameGames = await connection.query(
        `SELECT *, categories.name as "categoryName" from categories INNER JOIN games ON "categoryId" = categories.id WHERE lower(games.name) LIKE lower('${name}%') `
      );

      return res.send(filterByNameGames.rows);
    }

    const allGames = await connection.query('SELECT *, categories.name as "categoryName" from categories INNER JOIN games ON "categoryId" = categories.id');

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
