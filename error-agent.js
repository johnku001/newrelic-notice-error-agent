require('dotenv').config();
const newrelic = require('newrelic');
const { flatten } = require('flat');
const { validation, tryParseJson } = require('./helper.js');

const log4js = require('log4js');
const logger = log4js.getLogger();
logger.level = 'debug';

const requiredEnv = [
  'NEWRELIC_APP_NAME',
  'NEWRELIC_LICENSE_KEY',
  'FUNCTION_NAME',
  'ARGO_WORKFLOW_ERROR',
  'ARGO_WORKFLOW_NAME',
  'ARGO_WORKFLOW_STATUS',
  'ARGO_WORKFLOW_DURATION',
];

logger.info('Start sending Error Message to NewRelic');
if (!validation(requiredEnv, logger)) {
  process.exit(1);
}

const argumentsMap = {
  workflow_name: process.env.ARGO_WORKFLOW_NAME,
  workflow_status: process.env.ARGO_WORKFLOW_STATUS,
  workflow_duration: process.env.ARGO_WORKFLOW_DURATION,
  error: tryParseJson(process.env.ARGO_WORKFLOW_ERROR),
};

newrelic.startWebTransaction(process.env.FUNCTION_NAME.toString(), async () => {
  newrelic.noticeError(
    'Workflow Error',
    flatten(argumentsMap, {
      delimiter: '.',
      safe: false,
    })
  );
});

logger.info(
  'Error message sent to New Relic:  \n',
  flatten(argumentsMap, {
    delimiter: '.',
    safe: false,
  })
);
