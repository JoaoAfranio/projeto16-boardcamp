import connection from "../database/db.js";

export async function findRentals(req, res) {
  try {
    const selectRental = await connection.query("SELECT * FROM rentals");
    const allCustomers = await connection.query("SELECT id, name FROM customers");
    const allGames = await connection.query(
      'SELECT games.id, games.name, categories.id as "categoryId", categories.name as "categoryName" FROM games INNER JOIN categories ON "categoryId" = categories.id'
    );

    const hashCustomers = {};
    allCustomers.rows.forEach((c) => (hashCustomers[c.id] = c));

    const hashGames = {};
    allGames.rows.forEach((g) => (hashGames[g.id] = g));

    const allRentals = selectRental.rows;
    allRentals.forEach((rental) => {
      const idCustomer = rental.customerId;
      const idGame = rental.gameId;
      rental.customer = hashCustomers[idCustomer];
      rental.game = hashGames[idGame];
    });

    res.send(allRentals);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function insertRental(req, res) {
  const { customerId, gameId, daysRented } = req.body;

  const date = new Date();
  const formatedDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

  const game = res.locals.game;
  const originalPrice = daysRented * game.pricePerDay;

  try {
    await connection.query('INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "originalPrice") VALUES ($1, $2, $3, $4, $5)', [
      customerId,
      gameId,
      formatedDate,
      daysRented,
      originalPrice,
    ]);
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
