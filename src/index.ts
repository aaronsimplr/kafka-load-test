// should be the first command so can't use configuration
/* istanbul ignore next */
if (process.env.ENABLE_NEWRELIC && process.env.ENABLE_NEWRELIC === 'true') {
  require('newrelic');
}

import express from 'express';
import { status } from '@/routes/status';
import { example } from '@/routes/example';
import { env } from '@/services/Environment';
import { StatusCodes } from 'http-status-codes';
import { log4js, customSerializeError } from '@/services/logger';

const logger = log4js.getLogger('index');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(`/${env.globalRoutePrefix}`, status);
app.use(`/${env.globalRoutePrefix}`, example);

// default error handler
app.use((error, _request, response, _next) => {
  logger.error('Default express error handler', customSerializeError(error));

  if (error.status === 401) {
    return response
      .status(StatusCodes.UNAUTHORIZED)
      .send({ code: 102, message: error.message });
  } else if (error?.status && error?.message && error?.errors) {
    // The following logic is taken from simplr-server
    const [firstError = {}] = error.errors;
    const { messages = [] } = firstError;
    const [message] = messages;

    return response
      .status(error.status)
      .send(`${error.message}${message ? ` - ${message}` : ''}`);
  }

  return response.status(500).send('Internal server error');
});

app.use((_request, response, _next) => {
  return response
    .status(StatusCodes.NOT_FOUND)
    .send({ code: 100, message: 'This is not what you are looking for!' });
});

const server = app.listen(env.appContext.port, () => {
  logger.info(`Application Started on port ${env.appContext.port}`);
});

export { app, server };
