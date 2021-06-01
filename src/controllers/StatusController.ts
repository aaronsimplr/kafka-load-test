import express from 'express';
import { StatusCodes } from 'http-status-codes';

/**
 * This class will control the status route
 */
export class StatusController {
  /**
   * This function will return the status to the client
   * @param _request express.Request Not used
   * @param response express.Response The response object to respond to the client with.
   */
  static getStatus(
    _request: express.Request,
    response: express.Response,
  ): void {
    response
      .status(StatusCodes.OK)
      .send({ code: 0, message: 'server is alive!' });
  }
}
