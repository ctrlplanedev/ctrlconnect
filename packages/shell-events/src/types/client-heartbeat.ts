import { z } from "zod";

export default z.object({
  type: z
    .literal("client.heartbeat")
    .describe("Type of payload - must be client.heartbeat"),
  timestamp: z
    .string()
    .datetime({ offset: true })
    .describe("Timestamp of the heartbeat")
    .optional(),
});
