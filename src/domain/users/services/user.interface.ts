import { CreateUserDto } from "~/app/controllers/users/dtos/create-user";
import { User } from "../models/user";

export interface IUserService {
  list(): Promise<User[]>;
  create(data: CreateUserDto): Promise<User>;
  getById(id: string): Promise<User>;
  update(id: string, data: CreateUserDto): Promise<User>;
  deleteById(id: string): Promise<void>;
}