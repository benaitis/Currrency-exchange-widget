import express, { NextFunction } from "express";
import joi from "joi";

export const validateRequest = (
	req: express.Request,
	next: NextFunction,
	schema: joi.ObjectSchema<any>
) => {
	const options = {
		abortEarly: false,
		allowUnknown: true,
		stripUnknown: true,
	};
	const { error, value } = schema.validate(req.query, options);
	if (error) {
		next(
			`Validation error: ${error.details.map((x: any) => x.message).join(", ")}`
		);
	} else {
		req.body = value;
		next();
	}
};
