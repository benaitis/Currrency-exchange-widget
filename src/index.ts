import express from "express";

import quoteController from "./routes/quote/quoteController";

const app = express();
const port = 8080;

app.use("/", quoteController);

app.listen(port, () => {
	// tslint:disable-next-line:no-console
	console.log(`server started at http://localhost:${port}`);
});
