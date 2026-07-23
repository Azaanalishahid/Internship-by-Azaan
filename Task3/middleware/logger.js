/**
 * Custom Logger Middleware
 * Prints request method and timestamp to the console and tracks logs for the UI.
 */
const logsBuffer = [];
const MAX_LOGS = 100;

const logger = (req, res, next) => {
  const startTime = Date.now();
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.originalUrl || req.url;

  // Print request method & time to the console
  console.log(`[${timestamp}] METHOD: ${method} | URL: ${url}`);

  // Record finish event for dashboard display
  res.on('finish', () => {
    const durationMs = Date.now() - startTime;
    const logEntry = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp,
      method,
      url,
      statusCode: res.statusCode,
      durationMs
    };

    logsBuffer.unshift(logEntry);
    if (logsBuffer.length > MAX_LOGS) {
      logsBuffer.pop();
    }
  });

  next();
};

logger.getLogs = () => logsBuffer;
logger.clearLogs = () => {
  logsBuffer.length = 0;
};

module.exports = logger;
