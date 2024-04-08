import { User } from "../../models/users";
import { IHttpRequest, IHttpResponse } from "../protocols";

export interface ICreateUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface IMongoCreateUserRepository {
  createUser(params: ICreateUser): Promise<User>;
}

export interface ICreateUserController {
  handle(httpRequest: IHttpRequest<ICreateUser>): Promise<IHttpResponse<User> | IHttpResponse<String>>;
}
