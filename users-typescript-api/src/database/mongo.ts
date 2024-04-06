import { MongoClient as Mongo, Db } from "mongodb";
import { config } from "dotenv";

config();

export const MongoClient = {
  client: undefined as unknown as Mongo,
  db: undefined as unknown as Db,

  async connect(): Promise<void> {
    // Connection URL
    const url = process.env.MONGODB_URL || "localhost:27017";
    const username = process.env.MONGODB_USERNAME;
    const password = process.env.MONGODB_PASSWORD;

    // Database Name
    const dbName = "users-db";

    // Connection client
    const client = new Mongo(url, { auth: { username, password } });
    const db = client.db(dbName);

    this.client = client;
    this.db = db;

    console.log(`MongoDb running on port 27017`);
  },
};
