import express from "express";
import { config } from "dotenv";
import { GetUsersController } from "./controllers/get-users/get-users";
import { MongoGetUsersRepository } from "./repositories/get-users/mongo-get-users";
import { IGetUsersRepository } from "./controllers/get-users/protocols";
import { MongoClient } from "./database/mongo";
import { MongoCreateUsersRepository } from "./repositories/create-users/mongo-create-users";
import { CreateUserController } from "./controllers/create-user/create-user";

const main = async (): Promise<void> => {
  config();

  // Express
  const app = express();
  const port = process.env.PORT || 8000;
  app.listen(port, () => console.log("Express running on port 8000"));
  app.use(express.json());

  // Mongo
  await MongoClient.connect();

  app.get("/", (req, res) => {
    res.send("hello world");
  });

  app.get("/users", async (req, res) => {
    const mongoGetUsersRepository = new MongoGetUsersRepository();
    const getUsersController = new GetUsersController(mongoGetUsersRepository);
    const { body, statusCode } = await getUsersController.handle();

    res.send(body).status(statusCode);
  });

  app.post("/createUser", async (req, res) => {
    const mongoCreateUsersRepository = new MongoCreateUsersRepository();
    const createUserController = new CreateUserController(
      mongoCreateUsersRepository
    );
    const { body, statusCode } = await createUserController.handle({
      body: req.body,
    });

    res.send(body).status(statusCode);
  });
};

main();
