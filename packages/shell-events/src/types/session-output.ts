import { z } from "zod";

export default z.object({
  type: z
    .literal("session.output")
    .describe("Type of payload - must be session.output"),
  sessionId: z.string().describe("ID of the session that generated the output"),
  data: z.string().describe("Output data from the PTY session"),
});
