"use client";
import { useRouter } from "next/navigation";
import { use } from "react";
import { Button } from "src/components/ui/button";
import { authClient } from "src/lib/auth-client";

export const Homeview = ()=> {
  const router = useRouter();

  const {data:session} = authClient.useSession();

  if(!session){
    return(
      <p>Loading...</p>
    )
  }

  return(
    <div className = "flex flex-col p-4 gap-y-4">
        <p> Logged in as {session.user.name} </p>
        <br></br>
        <Button onClick = {()=> authClient.signOut({
          fetchOptions : {
            onSuccess : () => router.push("/auth/sign-in")
           }
          })
          }>
          Sign Out
        </Button>
    </div>
  );
   
}
