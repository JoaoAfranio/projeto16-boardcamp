import express from "express";
import cors from "cors";
import categoriesRoutes from "./routes/categories.routes.js";
import gamesRoutes from "./routes/games.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use(categoriesRoutes);
app.use(gamesRoutes);

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
