import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "src/lib/auth";
import { HomeView } from "src/modules/home/ui/views/home-view";

const Page = async () => {
const session = await auth. api. getSession({
headers: await headers(),
});

if (!session) {
redirect("/auth/sign-in");
}

return <HomeView />
};

export default Page;