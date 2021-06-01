import express from 'express';
import { ExampleController } from '@/controllers/ExampleController';
import { jwt } from '@/middleware/JWT';
import joi from 'joi';
import { hasRole } from '@/middleware/HasRole';
import * as constants from '@/config/Constants';
import { validate } from '@/middleware/Validate';

/**
 * This file will handle all the routes for multipy and divide.
 * It will ensure the jwt, role and validation middleware is called.
 * @exports express.Router
 */
const example = express.Router();

const validSchema: joi.Schema = joi.object({
  x: joi.number().required(),
  y: joi.number().required(),
});

example.post(
  '/multiply',
  jwt,
  hasRole(constants.exampleAccessRole),
  validate(validSchema),
  ExampleController.multiply,
);

example.post(
  '/divide',
  jwt,
  hasRole(constants.exampleAccessRole),
  validate(validSchema),
  ExampleController.divide,
);

example.post(
  '/divideRethrow',
  jwt,
  hasRole(constants.exampleAccessRole),
  validate(validSchema),
  ExampleController.divideRethrow,
);

export { example };
