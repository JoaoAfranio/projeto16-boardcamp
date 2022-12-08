import connection from "../database/db.js";

export async function findRentals(req, res) {
  const customerId = Number(req.query.customerId);
  const gameId = Number(req.query.gameId);

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

    if (customerId) {
      const filterByCustomer = allRentals.filter((rental) => rental.customerId === customerId);
      return res.send(filterByCustomer);
    }

    if (gameId) {
      const filterByGame = allRentals.filter((rental) => rental.game.id === gameId);
      return res.send(filterByGame);
    }

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

export async function deleteRental(req, res) {
  const id = req.params.id;

  try {
    await connection.query("DELETE FROM rentals WHERE id = $1", [id]);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
  res.sendStatus(200);
}

export async function returnRental(req, res) {
  const id = req.params.id;
  const rental = res.locals.rental;

  const date = new Date();
  const returnDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

  const rentDate = new Date(rental.rentDate);
  rentDate.setDate(rentDate.getDate() + rental.daysRented);

  const diffTime = date.getTime() - rentDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 3600 * 24));

  let delayFee = 0;

  if (diffDays > 0) delayFee = diffDays * rental.originalPrice;

  try {
    await connection.query('UPDATE rentals SET "returnDate" = $1, "delayFee" = $2 WHERE id = $3', [returnDate, delayFee, id]);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
