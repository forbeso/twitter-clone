"use client";

import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function AuthButtonClient({
  session,
}: {
  session: Session | null;
}) {
  const supabase = createClientComponentClient<Database>({});
  const router = useRouter();

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: "http://localhost:3000/auth/callback",
      },
    });
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <div className="w-full flex justify-center">
      {session ? (
        <button
          onClick={handleSignOut}
          className="btn bg-red-500 rounded w-full p-3">
          Sign out
        </button>
      ) : (
        <button
          onClick={handleSignIn}
          className="btn bg-twitter-blue rounded w-3/4 md:w-1/2 p-3">
          Login with github &nbsp;
          <i className="devicon-github-original"></i>
        </button>
      )}
    </div>
  );
}
