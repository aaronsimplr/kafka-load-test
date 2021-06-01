import log4js from 'log4js';
import jsonLayout from 'log4js-json-layout';
import { v4 as uuid } from 'uuid';
import { serializeError } from 'serialize-error';

const sessionId = process.env.HOSTNAME || uuid();
const logConfig: log4js.Configuration = {
  appenders: {
    out: {
      type: 'console',
      layout: {
        type: 'json',
        source: process.env.ENV_NAME || 'local',
        static: {
          appName: '*****ADD_APP_NAME_HERE*****',
        },
      },
    },
    app: {
      type: 'dateFile',
      filename: `./logs/app-${sessionId}.log`,
      pattern: '.yyyy-MM-dd',
      alwaysIncludePattern: true,
      layout: {
        type: 'json',
      },
      daysToKeep: 7,
      compress: true,
    },
  },
  categories: {
    default: {
      appenders: ['out', 'app'],
      level: process.env.ENV_NAME === 'test' ? 'OFF' : 'debug',
    },
  },
};

log4js.addLayout('json', jsonLayout);
log4js.configure(logConfig);

const customSerializeError = (error: any) =>
  JSON.stringify(serializeError(error));

export { log4js, customSerializeError };
