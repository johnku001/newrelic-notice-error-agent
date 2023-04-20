const validation = (requiredEnvArray, logger) => {
  for (const name of requiredEnvArray) {
    if (process.env[name] === 'undefined') {
      logger.error(`Environment variable ${name} is not set!\n\n`);
      return false;
    }
  }
  return true;
};
const tryParseJson = (text) => {
  try {
    let result = JSON.parse(text);
    return tryParseJson(result);
  } catch (e) {
    return text;
  }
};

module.exports = { validation, tryParseJson };
