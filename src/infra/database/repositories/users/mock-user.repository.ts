import { CreateUserDto } from "~/app/controllers/users/dtos/create-user";
import { UpdateUserDto } from "~/app/controllers/users/dtos/update-user";
import { User } from "~/domain/users/models/user";
import { IUserRepository } from "./user.interface";

export class MockUserRepository implements IUserRepository {
  private readonly _users: User[] = [
    { id: '1', name: "Plinio", email: "plinio.duartes@hotmail.com" },
    { id: '2', name: "Joan", email: "joan@gmail.com" },
  ];

  constructor() { }

  async list() {
    return this._users
  }

  async create(data: CreateUserDto) {
    const foundUsers = this._users.filter((item: User) => item?.email === data.email);

    if (foundUsers && foundUsers.length > 0) {
      throw new Error('Email already exists.');
    }

    const newUser: User = { ...data, id: JSON.stringify(++this._users.length) };
    this._users.push(newUser);
    return newUser;
  }

  async getById(id: string) {
    const foundUsers = this._users.filter((item: User) => parseInt(item?.id) === parseInt(id));

    if (!foundUsers || foundUsers.length === 0) {
      throw new Error('Not found.');
    }

    return foundUsers[0];
  }

  async update(id: string, data: UpdateUserDto) {
    const index: number = this._users.findIndex((item: User) => parseInt(item?.id) === parseInt(id));

    if (index === -1) {
      throw new Error('Not found.');
    }

    Object.assign(this._users[index], data);

    return this._users[index];
  }

  async deleteById(id: string) {
    const index: number = this._users.findIndex((item: User) => parseInt(item?.id) === parseInt(id));

    if (index === -1) {
      throw new Error('Not found.');
    }

    this._users.splice(index, 1);
  }
}