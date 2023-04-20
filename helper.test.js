const { validation, tryParseJson } = require('./helper');
const log4js = require('log4js');

describe('validation', () => {
  test('logs an error message if an environment variable is not set', () => {
    const logger = log4js.getLogger('myLogger');
    const spy = jest.spyOn(logger, 'error');
    process.env.MY_ENV_VAR = undefined;

    validation(['MY_ENV_VAR'], logger);

    expect(spy).toHaveBeenCalledWith(
      'Environment variable MY_ENV_VAR is not set!\n\n'
    );
  });

  test('does not log an error message if all environment variables are set', () => {
    const logger = log4js.getLogger('myLogger');
    const spy = jest.spyOn(logger, 'error');
    process.env.MY_ENV_VAR = '123';

    const result = validation(['MY_ENV_VAR'], logger);

    expect(spy).not.toHaveBeenCalled();
    expect(result).toBe(true);
  });
});

describe('tryParseJson', () => {
  test('parses a JSON string', () => {
    const result = tryParseJson('{"key": "value"}');
    expect(result).toEqual({ key: 'value' });
  });

  test('returns original string if not a JSON string', () => {
    const result = tryParseJson('This is not a JSON string');
    expect(result).toEqual('This is not a JSON string');
  });
});
