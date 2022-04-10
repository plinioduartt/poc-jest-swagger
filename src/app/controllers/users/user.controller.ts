import { Request, Response } from 'express';
import { User } from "~/domain/users/models/user";
import { IUserService } from "~/domain/users/services/user.interface";

export class UserController {
  private readonly _service: IUserService;
  private readonly _customErrorStatusCode: any = {
    'Not found.': 404
  }

  constructor(serviceInstance: IUserService) {
    this._service = serviceInstance;
  }

  async list(request: Request, response: Response): Promise<Response<User[]>> {
    const users = await this._service.list();

    return response.status(200).json({ users });
  }

  async getById(request: Request, response: Response): Promise<Response<User>> {
    const { id } = request.params;

    try {
      const user = await this._service.getById(id);

      return response.status(200).json({ user });
    } catch (error) {
      return response
        .status(this._customErrorStatusCode[error.message] || 500)
        .json({ error: error.message || "Unexpected error." });
    }
  }

  async create(request: Request, response: Response): Promise<Response<User>> {
    const data = request.body;

    try {
      const user = await this._service.create(data);
      return response.status(200).json({ user });
    } catch (error) {
      return response
        .status(this._customErrorStatusCode[error.message] || 500)
        .json({ error: error.message || "Unexpected error." });
    }
  }

  async update(request: Request, response: Response): Promise<Response<User>> {
    const { id } = request.params;
    const data = request.body;

    try {
      const user = await this._service.update(id, data);

      return response.status(200).json({ user });
    } catch (error) {
      return response
        .status(this._customErrorStatusCode[error.message] || 500)
        .json({ error: error.message || "Unexpected error." });
    }
  }

  async delete(request: Request, response: Response): Promise<Response<void>> {
    const { id } = request.params;

    try {
      await this._service.deleteById(id);
      return response.status(200).json({ message: "Deletado com sucesso" });
    } catch (error) {
      return response
        .status(this._customErrorStatusCode[error.message] || 500)
        .json({ error: error.message || "Unexpected error." });
    }
  }
}