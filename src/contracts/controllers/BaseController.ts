import { HttpResponse } from 'contracts/server/Http';
import { BaseUseCase } from 'contracts/usecases/BaseUseCase';

export interface BaseController {
  useCase: BaseUseCase;
  handle: (request: any) => Promise<HttpResponse>;
}
