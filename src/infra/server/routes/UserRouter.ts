import { GetUserController } from 'controllers/GetUserController';
import { Router } from 'express';
import { TweetService } from 'services/TweetService';
import { UserService } from 'services/UserService';
import { GetUserUseCase } from 'usecases/GetUserUseCase';
import { requestHandlerMidd, validate } from '../Middlewares';
import { CreateUserController } from 'controllers/CreateUserController';
import { CreateUserUseCase } from 'usecases/CreateUserUserCase';
import { createUserBodyValidator } from '../validators/CreateUserBody';

const router = Router();

router.get(
  '/',
  requestHandlerMidd(
    new GetUserController(
      new GetUserUseCase(new UserService(), new TweetService()),
    ),
  ),
);

router.post(
  '/',
  validate(createUserBodyValidator),
  requestHandlerMidd(
    new CreateUserController(new CreateUserUseCase(new UserService())),
  ),
);

export default router;
