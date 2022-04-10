import express from 'express';
import { UserController } from './app/controllers/users/user.controller';
import { UserService } from './domain/users/services/user';
import { MockUserRepository } from './infra/database/repositories/users/mock-user.repository';
import { UserRepository } from './infra/database/repositories/users/user.repository';

const router = express.Router();
router.use(express.json());
const userRepository = process.env.NODE_ENV === "test" ? new MockUserRepository() : new UserRepository();
let userController = new UserController(new UserService(userRepository));

router.get('/users', userController.list.bind(userController));
router.get('/users/:id', userController.getById.bind(userController));
router.post('/users', userController.create.bind(userController));
router.patch('/users/:id', userController.update.bind(userController));
router.delete('/users/:id', userController.delete.bind(userController));

export default router;