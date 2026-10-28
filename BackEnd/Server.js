import app from "./SRC/app.js";
import { env } from "./SRC/Config/env.js";
import { connectDatabase } from "./SRC/Config/database.js";

let server;

const startServer = async () => {
  try {
    // Connect to MongoDB before accepting requests.
    await connectDatabase();

    // Start the HTTP server only after the database is ready.
    server = app.listen(env.port, () => {
      console.log(
        `Server running at http://localhost:${env.port}`
      );

      console.log(`Environment: ${env.nodeEnv}`);
    });
  } catch (error) {
    console.error("Application startup failed:", error.message);
    process.exitCode = 1;
  }
};

const shutdown = (signal) => {
  console.log(`Received ${signal}. Shutting down gracefully...`);

  if (!server) {
    process.exitCode = 0;
    return;
  }

  server.close(async (error) => {
    if (error) {
      console.error("HTTP server shutdown failed:", error.message);
      process.exitCode = 1;
    }

    try {
      await import("mongoose").then(({ default: mongoose }) =>
        mongoose.disconnect()
      );
    } catch (disconnectError) {
      console.error(
        "MongoDB shutdown failed:",
        disconnectError.message
      );

      process.exitCode = 1;
    }
  });
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

await startServer();