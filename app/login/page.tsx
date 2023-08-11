import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import AuthButtonClient from "@/app/auth-button-client";
import social from "../social_world.svg";
import Image from "next/image";

export default async function Login() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect("/");
  }
  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-bl from-violet-500 to-fuchsia-500">
      <div className=" w-10/12 h-3/4 flex flex-row shadow-md rounded-xl">
        <div className="grid place-items-center w-full md:w-1/2 md:rounded-tl-xl md:rounded-bl-xl bg-white">
          <div className="">
            <i className="devicon-twitter-original colored text-6xl"></i>
          </div>
          <div className="text-5xl font-extrabold text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
              Welcome Back
            </span>
          </div>
          <AuthButtonClient session={session} />
        </div>
        <div className="hidden md:grid place-items-center bg-twitter-blue w-1/2 p-5 rounded-tr-xl rounded-br-xl">
          <h1 className="text-center text-2xl">
            Join Twitter today and see all that&apos;s happening in the world
            right now
          </h1>
          <div>
            <Image src={social} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
