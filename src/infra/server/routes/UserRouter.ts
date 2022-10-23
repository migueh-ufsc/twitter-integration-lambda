import { GetUserController } from 'controllers/GetUserController';
import { Router } from 'express';
import { TweetService } from 'services/TweetService';
import { UserService } from 'services/UserService';
import { GetUserUseCase } from 'usecases/GetUserUseCase';
import { requestHandlerMidd } from '../Middlewares';

const router = Router();

router.get(
  '/',
  requestHandlerMidd(
    new GetUserController(
      new GetUserUseCase(new UserService(), new TweetService()),
    ),
  ),
);

export default router;
