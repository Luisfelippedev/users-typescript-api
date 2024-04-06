import express from "express";
import { config } from "dotenv";
import { GetUsersController } from "./controllers/get-users/get-users";
import { MongoGetUsersRepository } from "./repositories/get-users/get-users";
import { IGetUsersRepository } from "./controllers/get-users/protocols";
import { MongoClient } from "./database/mongo";

const main = async (): Promise<void> => {
  config();

  // Express
  const app = express();
  const port = process.env.PORT || 8000;
  app.listen(port, () => console.log("Express running on port 8000"));

  // Mongo
  await MongoClient.connect()

  app.get("/", (req, res) => {
    res.send("hello world");
  });

  app.get("/users", async (req, res) => {
    const mongoGetUsersRepository = new MongoGetUsersRepository();
    const getUsersController = new GetUsersController(mongoGetUsersRepository);
    const { body, statusCode } = await getUsersController.handle();

    res.send(body).status(statusCode);
  });
};

main();
