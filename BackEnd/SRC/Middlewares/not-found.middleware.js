export const notFoundMiddleware = (req, res, next) => {
  res.status(404);

  next(
    Object.assign(
      new Error(`Route not found: ${req.method} ${req.originalUrl}`),
      { statusCode: 404 }
    )
  );
};