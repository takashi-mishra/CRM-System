export const getHealth = (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Real Estate CRM API is running",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV ?? "development",
  });
};