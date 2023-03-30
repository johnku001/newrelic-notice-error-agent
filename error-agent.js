const newrelic = require('newrelic');
const { flatten } = require('flat');
require('dotenv').config();

console.log(`\n`);

let argumentsMap = {};

const tryParseJson = (text) => {
  try {
    let result = eval(text.replace("'", ''));
    return tryParseJson(result);
  } catch (e) {
    return text;
  }
};

const getProcessArguments = (argv) => {
  argv.splice(2).forEach((element) => {
    if (element.includes('=')) {
      const [key, value] = element.split('=');
      argumentsMap[key] = tryParseJson(value);
    }
  });
};

if (process.env.NEWRELIC_APP_NAME === undefined) {
  console.log('No NEWRELIC_APP_NAME process.environment variable is set!\n\n');
  process.exit(1); // nothing to process
}
if (process.env.NEWRELIC_LICENSE_KEY === undefined) {
  console.log(
    'No NEWRELIC_LICENSE_KEY process.environment variable is set!\n\n'
  );
  process.exit(1); // nothing to process
}
if (process.env.NEWRELIC_APP_NAME === undefined) {
  console.log('No NEWRELIC_APP_NAME process.environment variable is set!\n\n');
  process.exit(1); // nothing to process
}
if (process.env.FUNCTION_NAME === undefined) {
  console.log('No FUNCTION_NAME process.environment variable is set!\n\n');
  process.exit(1); // nothing to process
}

if (process.argv === undefined || process.argv.length < 3) {
  console.log('No Argument is provided\n\n');
  process.exit(1);
}

getProcessArguments(process.argv);

if (argumentsMap.error === undefined) {
  console.log('No error is provided\n\n');
  process.exit(1);
}

newrelic.startWebTransaction(process.env.FUNCTION_NAME.toString(), async () => {
  newrelic.noticeError(
    'Workflow Error',
    flatten(argumentsMap, {
      delimiter: '.',
      safe: false,
    })
  );
});

console.log(
  'Error message sent to New Relic:  \n',
  flatten(argumentsMap, {
    delimiter: '.',
    safe: false,
  })
);
console.log(`\n`);
console.log(`\n`);
