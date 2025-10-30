import { z } from 'zod';
import { baseProcedure, createTRPCRouter } from '../init';
import { agentsRouter } from 'src/modules/agents/server/procedures';
export const appRouter = createTRPCRouter({
    agents: agentsRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;