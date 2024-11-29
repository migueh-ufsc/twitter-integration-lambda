import { CreateUserController } from 'controllers/CreateUserController';
import { GetUserController } from 'controllers/GetUserController';
import { TweetService } from 'services/TweetService';
import { UserService } from 'services/UserService';
import { CreateUserUseCase } from 'usecases/CreateUserUserCase';
import { GetUserUseCase } from 'usecases/GetUserUseCase';

export const GetUser = new GetUserController(
  new GetUserUseCase(new UserService(), new TweetService()),
);

export const CreateUser = new CreateUserController(
  new CreateUserUseCase(new UserService()),
);
