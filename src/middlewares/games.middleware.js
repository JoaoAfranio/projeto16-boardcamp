import { gamesSchema } from "../models/games.model.js";
import connection from "../database/db.js";

export async function gameSchemaValidation(req, res, next) {
  const game = req.body;

  const { error } = gamesSchema.validate(game);

  if (error) return res.sendStatus(400);

  const existsCategory = await connection.query("SELECT * FROM categories WHERE id= $1", [game.categoryId]);
  if (existsCategory.rowCount === 0) return res.sendStatus(400);

  const existsGame = await connection.query("SELECT * FROM games WHERE name= $1", [game.name]);
  if (existsGame.rowCount !== 0) return res.sendStatus(409);

  next();
}
