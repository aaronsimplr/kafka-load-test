import { StatusCodes } from 'http-status-codes';
import express from 'express';
import joi from 'joi';

type ValidateFunction = (
  request: express.Request,
  response: express.Response,
  next: express.NextFunction,
) => void;

/**
 * This middleware will validate params being sent.
 * It will allow the request to proceed or return a 400 if the
 * params do not validate.
 */
export const validate = (schema: joi.Schema): ValidateFunction => {
  return async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction,
  ): Promise<void> => {
    try {
      request.params = { ...request.params, ...request.query, ...request.body };
      const result = await schema.validate(request.params);
      if (result.error) {
        response
          .status(StatusCodes.BAD_REQUEST)
          .json({ code: 20, message: result.error.message });
      } else {
        next();
      }
    } catch (error) {
      response
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ code: 21, message: error.message });
    }
  };
};
