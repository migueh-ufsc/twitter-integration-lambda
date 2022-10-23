import { BaseController } from 'contracts/controllers/BaseController';
import { GetUserUseCase } from 'usecases/GetUserUseCase';
import { Request } from 'express';
import { HttpResponse } from 'contracts/server/Http';
import { HttpError } from 'common/errors/HttpError';
import { GetUserParams } from 'contracts/http/Params';

export class GetUserController implements BaseController {
  constructor(readonly useCase: GetUserUseCase) {}

  async handle(request: Request): Promise<HttpResponse> {
    try {
      const { query } = request;

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

      throw new HttpError({
        message: 'Internal Server Error',
        status: 500,
      });
    }
  }
}
