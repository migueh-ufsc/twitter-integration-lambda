import { HttpError } from 'common/errors/HttpError';
import { BaseController } from 'contracts/controllers/BaseController';
import { Request, Response, NextFunction, RequestHandler } from 'express';
import { logger } from 'infra/logger';
import Joi from 'joi';

export const requestHandlerMidd = (
  controller: BaseController,
): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const httpResponse = await controller.handle(req);
      res.status(httpResponse.status).json(httpResponse.body);
    } catch (error) {
      if (error instanceof HttpError)
        return res.status(error.status).send(error.message);

      return res
        .status(500)
        .send('An internal error occourred, try again later');
    } finally {
      next();
    }
  };
};

export const validate = (schema: Joi.Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      logger.error(error);
      return res.status(400).json(error.details);
    }
    next();
  };
};
