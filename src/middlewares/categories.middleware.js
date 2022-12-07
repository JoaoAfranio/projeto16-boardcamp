import { categoriesSchema } from "../models/categories.model.js";
import connection from "../database/db.js";

export async function categorySchemaValidation(req, res, next) {
  const category = req.body;

  const { error } = categoriesSchema.validate(category);

  if (error) return res.sendStatus(400);

  const existsCategory = await connection.query("SELECT * FROM categories WHERE name= $1", [category.name]);

  if (existsCategory.rowCount !== 0) return res.sendStatus(409);

  next();
}
