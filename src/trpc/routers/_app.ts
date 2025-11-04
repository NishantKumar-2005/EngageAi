
import {  createTRPCRouter } from '../init';
import { agentsRouter } from 'src/modules/agents/server/procedures';
import { meetingsRouter } from "src/modules/meetings/server/procedures";

export const appRouter = createTRPCRouter({
    agents: agentsRouter,
    meetings: meetingsRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;