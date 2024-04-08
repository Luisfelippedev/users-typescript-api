import { User } from "../../models/users";
import { IHttpRequest, IHttpResponse } from "../protocols";
import {
  ICreateUser,
  ICreateUserController,
  IMongoCreateUserRepository,
} from "./protocols";

export class CreateUserController implements ICreateUserController {
  constructor(
    private readonly createUserRepository: IMongoCreateUserRepository
  ) {}

  async handle(
    httpRequest: IHttpRequest<ICreateUser>
  ): Promise<IHttpResponse<User> | IHttpResponse<String>> {
    try {
      const user = await this.createUserRepository.createUser(httpRequest.body);
      console.log(user);
      return {
        statusCode: 200,
        body: user,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: "Something went wrong: " + error,
      };
    }
  }
}
