import { rentalsSchema } from "../models/rentals.models.js";
import connection from "../database/db.js";

export async function rentalSchemaValidation(req, res, next) {
  const rental = req.body;

  const { error } = rentalsSchema.validate(rental);

  if (error) return res.sendStatus(400);

  const existsCustomer = await connection.query("SELECT * FROM customers WHERE id= $1", [rental.customerId]);
  if (existsCustomer.rowCount === 0) return res.sendStatus(400);

  const existsGame = await connection.query("SELECT * FROM games WHERE id= $1", [rental.gameId]);
  if (existsGame.rowCount === 0) return res.sendStatus(400);

  const rentedGames = await connection.query('SELECT * FROM rentals WHERE "gameId"= $1', [rental.gameId]);

  const game = existsGame.rows[0];

  if (rentedGames.rowCount >= game.stockTotal) return res.sendStatus(400);

  res.locals.game = game;

  next();
}

export async function deleteRentalValidation(req, res, next) {
  const id = req.params.id;

  const existsRental = await connection.query("SELECT * FROM rentals where id= $1", [id]);

  if (existsRental.rowCount === 0) return res.sendStatus(404);

  const rental = existsRental.rows[0];

  if (rental.returnDate === null) return res.sendStatus(400);

  next();
}

export async function returnRentalValidation(req, res, next) {
  const id = req.params.id;

  const existsRental = await connection.query("SELECT * FROM rentals where id= $1", [id]);

  if (existsRental.rowCount === 0) return res.sendStatus(404);

  const rental = existsRental.rows[0];

  if (rental.returnDate !== null) return res.sendStatus(400);

  res.locals.rental = rental;
  next();
}
