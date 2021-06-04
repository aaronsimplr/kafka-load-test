## Available Scripts

+ `clean` - remove coverage data, Jest cache and transpiled files,
+ `build` - transpile TypeScript to ES6,
+ `build:watch` - interactive watch mode to automatically transpile source files,
+ `lint` - lint source files and tests,
+ `test` - run tests,
+ `test:watch` - interactive watch mode to automatically re-run tests
+ `start` - run the transpiled project from `build/src` folder
+ `build:run` - rebuild and start

## Instruction

1. Make sure to have the environment variables set for USERNAME, PASSWORD, and BROKERS. BROKERS is a comma separated string.

2. When starting the script run 'npm start' followed by the flags needed to run the script.

Example: npm run start -- consume --topic topic101 --groupId group1 --numOfConsumers 1

In this example we start 1 consumer subscribed to the topic 'topic101' with a groupp Id of 'group1'.

3. Once the script has initiated you have the option to add new consumers within the same group. You can do this by hitting the 'a' key.

