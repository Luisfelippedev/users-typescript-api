import { User } from "../../models/users";
import { IHttpResponse } from "../protocols";
import { IGetUsersController, IGetUsersRepository } from "./protocols";

export class GetUsersController implements IGetUsersController {
  constructor(private readonly getUsersRepository: IGetUsersRepository) {}

  async handle(): Promise<IHttpResponse<User[]> | IHttpResponse<string>> {
    // Validar requisição
    // Redirecionar chamada para o repository

    try {
      const users = await this.getUsersRepository.getUsers();
      return {
        statusCode: 200,
        body: users,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: "Something went wrong.",
      };
    }
  }
}
