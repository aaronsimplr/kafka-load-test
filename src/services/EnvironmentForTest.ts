import { EnvironmentSchema } from './Environment';

const environment: EnvironmentSchema = {
  nodeEnv: 'test',
  isTestMode: true,
  globalRoutePrefix: '/apiTest',

  appContext: {
    envName: 'test',
    port: '8080',
    jwtSecret:
      '7587729494A9B0E92F07C9D20B05797C5434DA94995052CC877703B7AC305908',
  },

  someTemplateContext: {
    num: 1,
    isTrue: true,
    someArray: ['a', 'b', 'c'],
  },
};

export { environment as env };
