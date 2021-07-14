import express, { NextFunction } from "express";

import { quoteSchema } from "../../schemas/quoteSchema";
import { validateRequest } from "../../helpers/schemaValidator";

export const validateQuoteSchema = (
	req: express.Request,
	res: express.Response,
	next: NextFunction
) => {
	validateRequest(req, next, quoteSchema);
};
