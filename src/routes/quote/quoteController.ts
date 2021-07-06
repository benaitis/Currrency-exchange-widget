import express from "express";
import QuoteService from "./quoteService";
import { validateQuoteSchema } from "./quoteValidator";

const router = express.Router();

const quoteService = new QuoteService();

router.get(
	"/quote",
	validateQuoteSchema,
	quoteService.getQuoteCache,
	quoteService.getQuote
);

export default router;
