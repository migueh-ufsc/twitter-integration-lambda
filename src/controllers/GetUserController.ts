import { BaseController } from 'contracts/controllers/BaseController';
import { GetUserUseCase } from 'usecases/GetUserUseCase';
import { HttpRequest, HttpResponse } from 'contracts/server/Http';
import { HttpError } from 'common/errors/HttpError';
import { GetUserParams } from 'contracts/http/Params';
import { logger } from 'infra/logger';

export class GetUserController implements BaseController {
  constructor(readonly useCase: GetUserUseCase) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const { query } = request;
      logger.info('nova request', query);
      if (!query.id && !query.username)
        throw new HttpError({
          status: 400,
          message:
            'Para buscar um usuário é necessario um "id" ou um "username"',
        });

      const input: GetUserParams = {
        id: query.id as string,
        username: query.username as string,
        refresh: query.refresh ? Boolean(query.refresh) : false,
      };

      return await this.useCase.execute(input);
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
