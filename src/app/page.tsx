'use client'

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function IntroPage() {
  const router = useRouter();

  return (
    <div className="flex justify-center items-center h-screen p-6 bg-black">
      <div className="w-full max-w-md p-8 rounded-xl shadow-xl bg-zinc-900 border border-red-600 text-center">
        
        <h1 className="text-5xl font-extrabold mb-6 animate-bounce-slow bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-pink-500 to-red-400">
          Welcome
        </h1>
        
        <p className="text-gray-300 mb-8">
          Welcome to my Next.js and NestJS Authentication
        </p>

        <Button
          onClick={() => router.push("/login")}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg
                     transition-transform duration-200 transform hover:scale-110
                     ring-2 ring-red-500 hover:ring-4 hover:ring-red-600 animate-pulse"
        >
          Enter
        </Button>
      </div>
    </div>
  );
}
