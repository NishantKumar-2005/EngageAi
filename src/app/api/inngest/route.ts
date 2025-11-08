import { serve } from "inngest/next";
import { inngest } from "src/inngest/client";
 import { meetingsProcessing } from "src/inngest/function";

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    meetingsProcessing,
  ],
});