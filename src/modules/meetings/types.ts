import { inferRouterOutputs } from "@trpc/server";

import type { AppRouter } from "src/trpc/routers/_app";

export type MeetingGetOne = inferRouterOutputs<AppRouter>["meetings"] ["getOne"];