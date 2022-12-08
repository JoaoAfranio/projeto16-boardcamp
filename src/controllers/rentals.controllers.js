import connection from "../database/db.js";

export async function findRentals(req, res) {
  const customerId = Number(req.query.customerId);
  const gameId = Number(req.query.gameId);

  try {
    const selectRental = await connection.query(`
      SELECT rentals.*, 
		    customers.name as "customerName", 
		    games.name as "gameName", games."categoryId" as "categoryId", 
		    categories.name as "categoryName"
	    FROM rentals
		    JOIN customers ON "customerId" = customers.id
		    JOIN games ON "gameId" = games.id
		    JOIN categories ON games."categoryId" = categories.id;`);

    const allRentals = selectRental.rows;

    allRentals.forEach((rental) => {
      rental.customer = {
        id: rental.customerId,
        name: rental.customerName,
      };

      rental.game = {
        id: rental.gameId,
        name: rental.gameName,
        categoryId: rental.categoryId,
        categoryName: rental.categoryName,
      };

      delete rental.customerName;
      delete rental.gameName;
      delete rental.categoryId;
      delete rental.categoryName;
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
