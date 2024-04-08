import { IGetUsersRepository } from "../../controllers/get-users/protocols";
import { User } from "../../models/users";
import { MongoClient } from "../../database/mongo";

export class MongoGetUsersRepository implements IGetUsersRepository {
  async getUsers(): Promise<User[]> {
    const db = MongoClient.db;

    // Searching and get all users for collection "users"
    const users = await db
      .collection<Omit<User, "id">>("users")
      .find({})
      .toArray();

    // Assigning mongo default id to user model id
    return users.map(({ _id, ...rest }) => ({
      ...rest,
      id: _id.toHexString(),
    }));
  }
}
