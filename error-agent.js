const newrelic = require('newrelic');
const flat = require('flat');
require('dotenv').config();

console.log(`\n`);

let argumentsMap = {};
const getProcessArguments = (argv) => {
  argv.splice(2).forEach((element) => {
    if (element.includes('=')) {
      const [key, value] = element.split('=');
      argumentsMap[key] = value;
    }
  });
};

if (process.env.NEWRELIC_APP_NAME === undefined) {
  console.error(
    'No NEWRELIC_APP_NAME process.environment variable is set!\n\n'
  );
  process.exit(1); // nothing to process
}
if (process.env.NEWRELIC_LICENSE_KEY === undefined) {
  console.error(
    'No NEWRELIC_LICENSE_KEY process.environment variable is set!\n\n'
  );
  process.exit(1); // nothing to process
}
if (process.env.NEWRELIC_APP_NAME === undefined) {
  console.error(
    'No NEWRELIC_APP_NAME process.environment variable is set!\n\n'
  );
  process.exit(1); // nothing to process
}
if (process.env.FUNCTION_NAME === undefined) {
  console.error('No FUNCTION_NAME process.environment variable is set!\n\n');
  process.exit(1); // nothing to process
}

if (process.argv === undefined || process.argv.length < 3) {
  console.error('No Argument is provided\n\n');
  process.exit(1);
}

getProcessArguments(process.argv);

if (argumentsMap.message === undefined) {
  console.error('No message is provided\n\n');
  process.exit(1);
}

newrelic.startWebTransaction(process.env.FUNCTION_NAME.toString(), async () => {
  newrelic.noticeError(argumentsMap.message, flat({ ...argumentsMap }), {
    delimiter: '.',
  });
});

console.log('Error message sent to New Relic: \n', argumentsMap);
console.log(`\n`);
console.log(`\n`);
