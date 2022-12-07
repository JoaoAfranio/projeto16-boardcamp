import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 4000;

app.listen(() => {
  console.log(`Server running on PORT ${PORT}`);
});
