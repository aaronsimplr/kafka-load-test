import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { ExampleService } from '@/services/ExampleService';
import { log4js, customSerializeError } from '@/services/logger';

const logger = log4js.getLogger('ExampleController');

/**
 * This class will control the routes multiply and divide.
 * @exports ExampleController
 */
export class ExampleController {
  /**
   * This function will gather the params needed to do the multiply operation
   * and call the service that will do the multiplication then return the result.
   *
   * @param request express.Request This is the request object that contains the params needed.
   * @param response express.Response This is the response object used to reply to the client.
   * @returns void.
   */
  static multiply(request: express.Request, response: express.Response): void {
    try {
      const x: number = parseInt(request.params.x);
      const y: number = parseInt(request.params.y);

      const result = ExampleService.multiply(x, y);
      response
        .status(StatusCodes.OK)
        .send({ code: 0, message: 'multiplication successfull', data: result });
    } catch (error) {
      logger.error('Failed to multiply', customSerializeError(error));
      response
        .status(StatusCodes.BAD_REQUEST)
        .send({ code: 1, message: error.message });
    }
  }

  /**
   * This function will gather the params needed to do the divide operation
   * and call the service that will do the division then return the result.
   *
   * @param request express.Request This is the request object that contains the params needed.
   * @param response express.Response This is the response object used to reply to the client.
   * @returns void.
   */
  static divide(request: express.Request, response: express.Response): void {
    try {
      const x: number = parseInt(request.params.x);
      const y: number = parseInt(request.params.y);

      const result = ExampleService.divide(x, y);
      response
        .status(StatusCodes.OK)
        .send({ code: 0, message: 'multiplication successfull', data: result });
    } catch (error) {
      logger.error('Failed to divide', customSerializeError(error));
      response
        .status(StatusCodes.BAD_REQUEST)
        .send({ code: 1, message: error.message });
    }
  }

  /**
   * This function will gather the params needed to do the divide operation - always divide by 0 and rethrow
   * and call the service that will do the division then return the result.
   *
   * @param request express.Request This is the request object that contains the params needed.
   * @param response express.Response This is the response object used to reply to the client.
   * @returns void.
   */
  static divideRethrow(
    request: express.Request,
    response: express.Response,
  ): void {
    try {
      const x: number = parseInt(request.params.x);
      const y: number = parseInt(request.params.y);

      const result = ExampleService.divide(x, y);
      response
        .status(StatusCodes.OK)
        .send({ code: 0, message: 'multiplication successfull', data: result });
    } catch (error) {
      logger.error(
        'Failed to multiply, rethrowing',
        customSerializeError(error),
      );
      throw error;
    }
  }
}
