import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import api from "./api";
import cors from "cors";

const app: express.Application = express();
const address = "0.0.0.0:3000";

app.use(cors());

app.use(bodyParser.json());

app.get("/", function (req: Request, res: Response) {
  res.send("WELCOME TO THE STOREFRONT API");
});
app.use("/api", api);

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});

export default app;
