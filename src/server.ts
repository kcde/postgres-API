import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import db from "./database";

const app: express.Application = express();
const address: string = "0.0.0.0:3000";

app.use(bodyParser.json());

app.get("/", function (req: Request, res: Response) {
  res.send("Hello World!");
});

app.post("/", async (req: Request, res: Response) => {
  const conn = await db.connect();
  const sql = "INSERT INTO users (name) VALUES ($1) ";

  let result = await db.query(sql, ["keside"]);
  conn.release();

  res.json(result);
});

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});
