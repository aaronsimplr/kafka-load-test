import readline from 'readline';
import { Kafka, Consumer } from 'kafkajs';
import yargs from 'yargs';

const argv = yargs
  .usage(
    'Usage: consume --topic <topic> --groupId <groupId> --numOfConsumers <numOfConsumers>',
  )
  .example(
    'consume --topic topicA --groupId group1 --numOfConsumers 1',
    'Uses one consumer from group1.',
  )
  .option('topic', {
    describe: 'The topic you wish to subscribe to.',
    demandOption: 'The topic is required.',
    type: 'string',
    nargs: 1,
  })
  .option('groupId', {
    describe: 'Any name you wish to use for the group Id.',
    demandOption: 'The groupId is required.',
    type: 'string',
    nargs: 1,
  })
  .option('numOfConsumers', {
    describe: 'The number of consumers to use.',
    demandOption: 'The number of consumers is required.',
    type: 'number',
    nargs: 1,
  })
  .describe('help', 'Show help.').argv;

import { environment } from './config/environment';
import { consumerData } from './types/index';

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: environment.brokers,
  ssl: true,
  sasl: {
    mechanism: 'plain',
    username: environment.username,
    password: environment.password,
  },
});

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

async function createConsumer(
  groupId: string,
  topic: string,
): Promise<Consumer> {
  const consumer = kafka.consumer({ groupId });
  await consumer.connect();
  await consumer.subscribe({ topic });
  return consumer;
}

function addInterval(consData: consumerData): void {
  setInterval(() => {
    const { messageArr, messagesPerSecond } = consData;

    if (messageArr.length === 10) {
      messageArr.shift();
    }

    if (messagesPerSecond > 0) {
      messageArr.push(messagesPerSecond);
    }

    const average = messageArr.reduce((a, b) => a + b, 0) / messageArr.length;

    if (!isNaN(average)) {
      consData.avgMessagesPerSecond = Math.floor(average);
    }

    consData.messagesPerSecond = 0;
  }, 1000);
}

const consumers: Array<Promise<void>> = [];
const consumerData: Array<consumerData> = [];

async function start(): Promise<void> {
  const { topic, groupId, numOfConsumers } = argv;

  for (let i = 0; i < numOfConsumers; i++) {
    const consumer = await createConsumer(groupId, topic);

    consumerData.push({
      messageArr: [],
      messagesPerSecond: 0,
      index: i,
      avgMessagesPerSecond: 0,
    });

    addInterval(consumerData[i]);

    consumers.push(
      consumer.run({
        eachMessage: async () => {
          consumerData[i].messagesPerSecond =
            consumerData[i].messagesPerSecond + 1;
        },
      }),
    );
  }

  await Promise.all(consumers);
}

process.stdin.on('keypress', async (_unusedStr, key) => {
  console.clear();

  const { topic, groupId } = argv;

  if (key.ctrl && key.name === 'c') {
    process.exit();
  } else if (key.name === 'a') {
    const consumer = await createConsumer(groupId, topic);

    const index = consumerData.length;

    consumerData.push({
      messageArr: [],
      messagesPerSecond: 0,
      index,
      avgMessagesPerSecond: 0,
    });

    addInterval(consumerData[index]);

    await consumer.run({
      eachMessage: async () => {
        consumerData[index].messagesPerSecond =
          consumerData[index].messagesPerSecond + 1;
      },
    });
  }

  const consumerDataToShow = consumerData.map((data, idx) => {
    return {
      consumer: idx,
      avgMessagesPerSecond: data.avgMessagesPerSecond,
    };
  });

  console.table(consumerDataToShow);
});

start()
  .then(() => {
    console.log('Consumers are running!');
  })
  .catch((error) => console.error(error));

setInterval(() => {
  console.clear();
  console.log('Press "a" to add another consumer. Press ctrl + "c" to quit.');
  const consumerDataToShow = consumerData.map((data, idx) => {
    return {
      consumer: idx,
      avgMessagesPerSecond: data.avgMessagesPerSecond,
    };
  });
  console.table(consumerDataToShow);
}, 1000);
