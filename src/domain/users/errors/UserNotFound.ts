export class UserNotFound extends Error {
  constructor() {
    super('Not found.');
    this.name = "UserNotFound"
  }
}