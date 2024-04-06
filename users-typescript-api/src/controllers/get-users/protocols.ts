import { User } from "../../models/users";
import { IHttpResponse } from "../protocols";

export interface IGetUsersController {
  handle(): Promise<IHttpResponse<User[]> | IHttpResponse<string>>;
}

export interface IGetUsersRepository {
  getUsers(): Promise<User[]>;
}
