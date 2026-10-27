export const errorMiddleware = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  const statusCode = Number.isInteger(err.statusCode)
    ? err.statusCode
    : 500;

  const isProduction = process.env.NODE_ENV === "production";

  const response = {
    success: false,
    message:
      statusCode >= 500 && isProduction
        ? "Internal server error"
        : err.message || "Something went wrong",
  };

  // Include debugging information only during development.
  if (!isProduction && err.stack) {
    response.stack = err.stack;
  }

  return res.status(statusCode).json(response);
};