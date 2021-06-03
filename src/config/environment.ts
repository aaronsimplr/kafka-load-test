import * as dotenv from 'dotenv';
dotenv.config();

// eslint-disable
import { EnvironmentData } from '../types/environment';
import { parseArrayFromString, parseString } from './util';

export const environment: EnvironmentData = {
  username: parseString(process.env.USERNAME),
  password: parseString(process.env.PASSWORD),
  brokers: parseArrayFromString(process.env.BROKERS),
};
