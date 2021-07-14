import { expect, describe, afterEach, jest, it } from "@jest/globals";
import { getMockReq } from "@jest-mock/express";

import { quoteSchema } from "../src/schemas/quoteSchema";
import { validateRequest } from "../src/helpers/schemaValidator";

describe("Schema validator test suite", () => {
	afterEach(() => {
		jest.restoreAllMocks();
	});
	it("should return baseAmount validation error", () => {
		const req = getMockReq({
			query: {
				baseCurrency: "USD",
				quoteCurrency: "EUR",
				baseAmount: null,
			},
		});

		const next = jest.fn();

		validateRequest(req, next, quoteSchema);

		expect(next).toHaveBeenCalled();
		expect(next).toHaveBeenCalledWith(
			`Validation error: "baseAmount" must be a number`
		);
	});

	it("should return currency validation error if incorrect currency is used", () => {
		const req = getMockReq({
			query: {
				baseCurrency: "LTL",
				quoteCurrency: "EUR",
				baseAmount: 15,
			},
		});
		const next = jest.fn();

		validateRequest(req, next, quoteSchema);

		expect(next).toHaveBeenCalled();
		expect(next).toHaveBeenCalledWith(
			`Validation error: \"baseCurrency\" must be one of [USD, EUR, GBP, ILS]`
		);
	});

	it("Should pass schema validation and call next provided function", () => {
		const req = getMockReq({
			query: {
				baseCurrency: "GBP",
				quoteCurrency: "EUR",
				baseAmount: 15,
			},
		});
		const next = jest.fn();
		validateRequest(req, next, quoteSchema);
		expect(next).toHaveBeenCalled();
		expect(next).toHaveBeenCalledWith();
	});
});
