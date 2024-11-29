import { BaseController } from 'contracts/controllers/BaseController';
import { CreateUserUseCase } from 'usecases/CreateUserUserCase';
import { HttpRequest, HttpResponse } from 'contracts/server/Http';
import { HttpError } from 'common/errors/HttpError';
import { logger } from 'infra/logger';

export class CreateUserController implements BaseController {
  constructor(readonly useCase: CreateUserUseCase) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      // passa body direto pq ja foi validado no middleware
      const user = await this.useCase.execute(request.body);
      return {
        status: 201,
        body: user,
      };
    } catch (error) {
      if (error.status) throw error;

      logger.error(error);

      throw new HttpError({
        message: 'Internal Server Error',
        status: 500,
      });
    }
  }
}
