import joi from "joi";

const SUPPORTED_CURRENCIES = ["USD", "EUR", "GBP", "ILS"];

export const quoteSchema = joi.object({
	baseCurrency: joi
		.string()
		.valid(...SUPPORTED_CURRENCIES)
		.required(),
	quoteCurrency: joi
		.string()
		.valid(...SUPPORTED_CURRENCIES)
		.required(),
	baseAmount: joi.number().required(),
});
