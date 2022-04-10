import { CreateUserDto } from "~/app/controllers/users/dtos/create-user";
import { UpdateUserDto } from "~/app/controllers/users/dtos/update-user";
import { User } from "~/domain/users/models/user";
import { IUserRepository } from "./user.interface";
import database from '../../connection';

import { Users } from "../../entities/users/user";

export class UserRepository implements IUserRepository {

  constructor() { }

  async list(): Promise<User[]> {
    return await database.getRepository(Users).find();
  }

  async create(data: CreateUserDto): Promise<User> {
    const _userExists = await database
      .getRepository(Users)
      .findOne({
        where: {
          email: data.email
        }
      });

    if (_userExists) {
      throw new Error('Email already exists.');
    }

    const user = await database
      .createQueryBuilder()
      .insert()
      .into(Users)
      .values([data])
      .execute();

    return user;
  }

  async getById(id: string): Promise<User> {
    const user = await database
      .getRepository(Users)
      .findOne({
        where: {
          id
        }
      });

    if (!user) {
      throw new Error('Not found.');
    }

    return user;
  }

  async update(id: string, data: UpdateUserDto): Promise<User> {
    const user = await database
      .getRepository(Users)
      .findOne({
        where: {
          id
        }
      });

    if (!user) {
      throw new Error('Not found.');
    }

    const updatedUser = await database
      .createQueryBuilder()
      .update(Users)
      .set(data)
      .where("id = :id", { id })
      .execute();

    return updatedUser;
  }

  async deleteById(id: string): Promise<void> {
    const user = await database
      .getRepository(Users)
      .findOne({
        where: {
          id
        }
      });

    if (!user) {
      throw new Error('Not found.');
    }

    await database
      .createQueryBuilder()
      .delete()
      .from(Users)
      .where("id = :id", { id })
      .execute();

    return;
  }
}