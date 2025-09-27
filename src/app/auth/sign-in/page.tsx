import { headers } from "next/headers";
import { auth } from "src/lib/auth";
import { redirect } from "next/navigation";
import { SignInView } from "src/modules/auth/ui/views/sign-in-view";

const Page = async() => {
    const session = await auth.api.getSession({
        headers: await headers(),
      });
      
      if(!!session){
        redirect("/");
      }
    return <SignInView />;
}

export default Page;  

//http://localhost:3000/sign-in