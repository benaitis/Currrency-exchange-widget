import express, { NextFunction } from "express";
import axios from "axios";

import LRUCache from "../../cache/LRUCache";
import { roundNumberToLower } from "../../helpers/number";

class QuoteService {
	cache = new LRUCache(5);

	getQuoteCache = (
		req: express.Request,
		res: express.Response,
		next: NextFunction
	) => {
		const baseCurrency: string = req.query.baseCurrency as string;
		const quoteCurrency: string = req.query.quoteCurrency as string;
		const amount: string = req.query.baseAmount as string;
		const key = `${baseCurrency}-${quoteCurrency}`;
		const cachedValue = this.cache.get(key);
		if (cachedValue) {
			const rate = cachedValue;
			const quoteAmount = Number(rate) * Number(amount);
			res.send({
				exchangeRate: rate,
				quoteAmount: roundNumberToLower(quoteAmount),
			});
		} else {
			next();
		}
	};

	getQuote = (req: express.Request, res: express.Response) => {
		axios
			.get(
				`https://api.exchangerate-api.com/v4/latest/${req.query.baseCurrency}`
			)
			.then((response) => {
				const quoteCurrency = req.query.quoteCurrency as string;
				const baseCurrency: string = req.query.baseCurrency as string;
				const amount = req.query.baseAmount as string;
				const rate = response.data.rates[quoteCurrency];
				const quoteAmount = Number(rate) * Number(amount);
				const key = `${baseCurrency}-${quoteCurrency}`;

				this.cache.set(key, rate);

				res.send({
					exchangeRate: rate,
					quoteAmount: roundNumberToLower(quoteAmount),
				});
			})
			.catch(() => {
				res.sendStatus(500);
			});
	};
}

export default QuoteService;
