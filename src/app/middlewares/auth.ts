import { NextFunction, Request, Response } from "express";

class AuthMiddleware {
  constructor() { }

  public init(request: Request, response: Response, next: NextFunction) {
    console.log(`${request.method} - ${request.path}`);
    next();
  }
}

export default new AuthMiddleware();