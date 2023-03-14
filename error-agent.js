const newrelic = require('newrelic');
require('dotenv').config();

if (process.env.NEWRELIC_APP_NAME === undefined) {
  console.error('No NEWRELIC_APP_NAME process.environment variable is set.');
  return false; // nothing to process
}
if (process.env.NEWRELIC_LICENSE_KEY === undefined) {
  console.error('No NEWRELIC_LICENSE_KEY process.environment variable is set.');
  return false; // nothing to process
}
if (process.env.NEWRELIC_APP_NAME === undefined) {
  console.error('No NEWRELIC_APP_NAME process.environment variable is set.');
  return false; // nothing to process
}
if (process.env.FUNCTION_NAME === undefined) {
  console.error('No FUNCTION_NAME process.environment variable is set.');
  return false; // nothing to process
}

if (process.argv === undefined || process.argv[2] === undefined) {
  console.error('No Error message is provided.');
  return false; // nothing to process
}

newrelic.startWebTransaction(process.env.FUNCTION_NAME.toString(), async () => {
  newrelic.noticeError(process.argv[2]);
});
return true;
