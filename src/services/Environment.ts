import { config } from 'dotenv';
import path from 'path';
import {
  stringOrNull,
  numberOrNull,
  bool,
  arrayOrNull,
} from './parseEnvVariables';

// update Docker files
// update env property from slack messages
config({
  path: process.env.DOTENV_FILE_PATCH || path.resolve(process.cwd(), '.env'),
});

const environmentName = process.env.NODE_ENV || '';
if (!['production', 'local', 'test'].includes(environmentName)) {
  throw new Error(`Please set correct NODE_ENV - ${environmentName}`);
}

if (!['prod', 'local', 'test', 'qa', 'dev'].includes(environmentName)) {
  throw new Error(`Please set correct APP_ENV_NAME - ${environmentName}`);
}

const errors: string[] = [];

///// ADD HERE ENVIRONMENT VARIABLES

export type EnvironmentSchema = {
  nodeEnv: string;
  isTestMode: boolean;
  globalRoutePrefix: string;

  appContext: {
    envName: string;
    port: string;
    jwtSecret: string | null;
  };

  someTemplateContext: {
    num: number | null;
    isTrue: boolean;
    someArray: any[] | null;
  };
};

let environment: EnvironmentSchema = {
  nodeEnv: process.env.NODE_ENV!,
  isTestMode: process.env.NODE_ENV === 'test',
  globalRoutePrefix: 'api',

  appContext: {
    envName: process.env.APP_ENV_NAME!,
    port: process.env.APP_PORT!,
    jwtSecret: stringOrNull('JWT_SECRET', errors),
  },

  someTemplateContext: {
    num: numberOrNull('TEMP_NUM', errors),
    isTrue: bool('TEMP_BOOL', errors)!,
    someArray: arrayOrNull('TEMP_ARRAY', errors),
  },
};

///// END OF ENVIRONMENT VARIABLES

if (errors?.length) {
  throw new Error(errors.join('\n'));
}

if (environment.isTestMode) {
  const testEnvironment = require('./EnvironmentForTest').env;

  const wrongKeys = isKeysTheSameInEveryObject(environment, testEnvironment);
  if (wrongKeys.size) {
    throw new Error(
      `Files "EnvironmentForTest.ts" and "Environment.js" have different keys - ${JSON.stringify(
        [...wrongKeys],
      )}.`,
    );
  }
  environment = testEnvironment;
}

const emptyEnvs = processEnvironmentCheck(environment);
if (emptyEnvs.length) {
  throw new Error(
    `Please set environment variables for: \n ${emptyEnvs.join('\n ')}`,
  );
}

export { environment as env };

function isKeysTheSameInEveryObject(obj1, obj2, set = new Set()) {
  const whiteKeyList = ['whitelistedDomainsAndPaths', 'redisSecondaryUrls'];
  deepCheckKeys(obj2, obj1, whiteKeyList, set);
  deepCheckKeys(obj1, obj2, whiteKeyList, set);

  return set;
}

function getUniqueElem(obj1, obj2) {
  const sourceKeys1 = Object.keys(obj1);
  const sourceKeys2 = Object.keys(obj2);

  const unique1 = sourceKeys1.filter((o) => sourceKeys2.indexOf(o) === -1);
  const unique2 = sourceKeys2.filter((o) => sourceKeys1.indexOf(o) === -1);

  return unique1.concat(unique2);
}

function deepCheckKeys(obj1, obj2, whiteKeyList, set) {
  const sourceKeys = Object.keys(obj1);

  const unique = getUniqueElem(obj1, obj2);
  if (unique.length) {
    unique.forEach((item) => {
      if (!whiteKeyList.includes(item)) {
        set.add(item);
      }
    });

    return null;
  }

  sourceKeys.forEach((key) => {
    if (
      obj1[key] !== null &&
      typeof obj1[key] === 'object' &&
      !Array.isArray(obj1[key]) &&
      !whiteKeyList.includes(key)
    ) {
      return isKeysTheSameInEveryObject(obj1[key], obj2[key], set);
    }

    return null;
  });

  return null;
}

function processEnvironmentCheck(
  env,
  parentKey = '',
  undefinedValues: string[] = [],
) {
  Object.keys(env).forEach((key) => {
    const value = env[key];
    const objectPath = parentKey ? `${parentKey}->${key}` : key;
    if (value != null && typeof value === 'object') {
      return processEnvironmentCheck(value, objectPath, undefinedValues);
    } else if (
      (value != null && Array.isArray(value) && !value.length) ||
      typeof value === 'undefined'
    ) {
      undefinedValues.push(objectPath);
    }

    return null;
  });

  return undefinedValues;
}
