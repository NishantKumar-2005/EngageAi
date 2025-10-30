import { createTRPCRouter, baseProcedure} from "src/trpc/init"
import { agents } from "src/db/schema";
import { db } from "src/db";




export const agentsRouter = createTRPCRouter({
    getMany: baseProcedure.query(async ()=>{
        const data = await db.select().from(agents);
        await new Promise((resolve) => setTimeout(resolve, 5000)); 

        return data;
    })
});