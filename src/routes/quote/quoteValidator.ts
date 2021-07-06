import express, { NextFunction } from "express";
import joi from "joi";

import { validateRequest } from "../../helpers/schemaValidator";

const SUPPORTED_CURRENCIES = ["USD", "EUR", "GBP", "ILS"];

export const validateQuoteSchema = (
	req: express.Request,
	res: express.Response,
	next: NextFunction
) => {
	const schema = joi.object({
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
	validateRequest(req, next, schema);
};
