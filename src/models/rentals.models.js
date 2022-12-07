import joi from "joi";

export const rentalsSchema = joi.object({
  customerId: joi.number().required(),
  gameId: joi.number().required(),
  rentDate: joi.string().required(),
  daysRented: joi.number().required(),
  returnDate: joi.string(),
  originalPrice: joi.number().required(),
  delayFee: joi.number(),
});
