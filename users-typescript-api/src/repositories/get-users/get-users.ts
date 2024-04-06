import { IGetUsersRepository } from "../../controllers/get-users/protocols";
import { User } from "../../models/users";

export class MongoGetUsersRepository implements IGetUsersRepository {
   async getUsers(): Promise<User[]> {
    return [
      {
        firstName: "luis",
        lastName: "felippe",
        email: "luis@gmail.com",
        password: "asdasd",
      },
    ];
  }
}
