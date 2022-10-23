import { HttpResponse } from 'contracts/server/Http';
import { BaseUseCase } from 'contracts/usecases/BaseUseCase';
import { Request } from 'express';

export interface BaseController {
  useCase: BaseUseCase;
  handle: (request: Request) => Promise<HttpResponse>;
}
