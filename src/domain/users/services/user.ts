import { CreateUserDto } from "~/app/controllers/users/dtos/create-user";
import { IUserRepository } from "~/infra/database/repositories/users/user.interface";
import { User } from "../models/user";
import { IUserService } from "./user.interface";

export class UserService implements IUserService {
  private readonly _repository: IUserRepository;

  constructor(repository: IUserRepository) {
    this._repository = repository;
  }

  public async list(): Promise<User[]> {
    return await this._repository.list();
  }

  public async create(data: CreateUserDto): Promise<User> {
    // verificar se o email já existe
    // criptografar a senha
    return await this._repository.create(data);
  }

  public async getById(id: string): Promise<User> {
    return await this._repository.getById(id);
  }

  public async update(id: string, data: CreateUserDto): Promise<User> {
     // verificar se o email já existe
    // criptografar a senha
    return await this._repository.update(id, data);
  }

  public async deleteById(id: string): Promise<void> {
    return await this._repository.deleteById(id);
  }

}