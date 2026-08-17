/**
 * Centralized error handler middleware for Express
 */
export const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    success: false,
    error: 'Not Found',
    message: `Endpoint ${req.method} ${req.originalUrl} does not exist.`
  });
};

export const globalErrorHandler = (err, req, res, next) => {
  console.error('🔥 Server Error:', err);

  const statusCode = err.status || err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    error: err.name || 'InternalServerError',
    message: err.message || 'An unexpected error occurred on the server.'
  });
};
