import { CreateUserDto } from "~/app/controllers/users/dtos/create-user";
import { UpdateUserDto } from "~/app/controllers/users/dtos/update-user";
import { User } from "~/domain/users/models/user";

export interface IUserRepository {
  list(): Promise<User[]>;
  create(data: CreateUserDto): Promise<User>;
  getById(id: string): Promise<User>;
  update(id: string, data: UpdateUserDto): Promise<User>;
  deleteById(id: string): Promise<void>;
}