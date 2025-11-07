// 'use client';

// // import React from 'react';
// // import { Calendar, Clock, Users, Video, Bot, TrendingUp, Activity, Bell, Plus, ArrowRight, Play, Eye } from 'lucide-react';
// // import { Button } from 'src/components/ui/button';
// // import { authClient } from 'src/lib/auth-client';
// // import { useQueries, useQuery } from '@tanstack/react-query';
// // import { useTRPC } from 'src/trpc/client';
// // import { da } from 'date-fns/locale';

// export const HomeView = () => {  

//     return (
//       <div>
//           Home View
//       </div>
//     )
// };

"use client";

import { Button } from "src/components/ui/button";
import { authClient } from "src/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function HomeView() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Prevent hydration mismatch by not rendering until mounted
  if (!isMounted) {
    return (
      <div className="flex flex-col p-4 gap-y-4">
        <p>Loading...</p>
      </div>
    );
  }

  if (isPending || !session) {
    return (
      <div className="flex flex-col p-4 gap-y-4">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-4 gap-y-4">
      <p>Logged in as {session.user?.name || "Unknown User"}</p>

      <Button
        onClick={() =>
          authClient.signOut({
            fetchOptions: {
              onSuccess: () => {
                router.push("/auth/sign-in"); // Redirect to sign-in page after sign out
              },
            },
          })
        }
      >
        Sign Out
      </Button>
    </div>
  );
}




