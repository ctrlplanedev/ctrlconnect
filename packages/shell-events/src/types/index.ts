import { z } from "zod";

import clientHeartbeat from "./client-heartbeat";
import sessionCreate from "./session-create";
import sessionDelete from "./session-delete";
import sessionInput from "./session-input";
import sessionOutput from "./session-output";

export type ClientHeartbeat = z.infer<typeof clientHeartbeat>;
export type SessionCreate = z.infer<typeof sessionCreate>;
export type SessionInput = z.infer<typeof sessionInput>;
export type SessionOutput = z.infer<typeof sessionOutput>;
export type SessionDelete = z.infer<typeof sessionDelete>;

export {
  clientHeartbeat,
  sessionCreate,
  sessionDelete,
  sessionInput,
  sessionOutput,
};
