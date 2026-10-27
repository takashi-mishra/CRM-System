import "dotenv/config";

const requiredVariables = ["MONGODB_URI", "CLIENT_URL"];

for (const variable of requiredVariables) {
  if (!process.env[variable]) {
    throw new Error(
      `Missing required environment variable: ${variable}`
    );
  }
}

const port = Number(process.env.PORT ?? 5000);

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error("PORT must be a valid TCP port between 1 and 65535.");
}

export const env = Object.freeze({
  nodeEnv: process.env.NODE_ENV ?? "development",
  port,
  clientUrl: process.env.CLIENT_URL,
  mongoUri: process.env.MONGODB_URI,
  isProduction: process.env.NODE_ENV === "production",
});