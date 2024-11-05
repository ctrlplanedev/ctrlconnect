import { log } from "@ctrlshell/logger";

import { env } from "./config";
import { createServer } from "./server";
import { addSocket } from "./websocket";

const app = createServer();

const server = addSocket(app).listen(env.PORT, async () => {
  console.log(`Server is running on port ${env.PORT}`);
});

const onCloseSignal = () => {
  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });
  setTimeout(() => process.exit(1), 10000).unref(); // Force shutdown after 10s
};

process.on("SIGINT", onCloseSignal);
process.on("SIGTERM", onCloseSignal);
