import { MockUserRepository } from "../../../infra/database/repositories/users/mock-user.repository";
import { UserService } from "./user";

const getServiceInstance = function () {
  const userService = new UserService(new MockUserRepository());
  return userService;
}

describe('User domain service', function () {
  test('CREATE USER ==> it should return a created user', async () => {
    const data = { name: "Plinio", email: "plinio@gmail.com" };
    const userService = getServiceInstance();
    const createdUser = await userService.create(data);
    expect(createdUser).toHaveProperty('name');
    expect(createdUser).toHaveProperty('id');
    expect(parseInt(createdUser.id)).toBe(3);
  });

  test('RETURN USER BY ID ==> it should return a user by id', async () => {
    const id = '2';
    const userService = getServiceInstance();
    const user = await userService.getById(id);
    expect(user).not.toBe(undefined);
    expect(user).not.toBe(null);
    expect(user).toHaveProperty('name');
    expect(user).toHaveProperty('id');
  });

  test('RETURN USER BY ID (NOT FOUND) ==> it should not found a user by id', async () => {
    const id = '9999';
    const userService = getServiceInstance();
    await expect(async () => await userService.getById(id)).rejects.toThrowError('Not found.');
  });

  test('UPDATE USER BY ID ==> it should update a user', async () => {
    const id = '1';
    const data = { name: "Editado", email: "plinio@gmail.com" };
    const userService = getServiceInstance();
    const editedUser = await userService.update(id, data);
    expect(editedUser).not.toBe(undefined);
    expect(editedUser.name).toBe('Editado');
  });

  test('DELETE USER FROM ID ==> it should delete a user from id', async () => {
    const id = '1';
    const userService = getServiceInstance();
    await userService.deleteById(id);
    await expect(async () => await userService.getById(id)).rejects.toThrowError('Not found.');
  });
})