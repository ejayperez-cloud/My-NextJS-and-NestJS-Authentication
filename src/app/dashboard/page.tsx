'use client'

import { getToken } from "@/lib/auth";
import {jwtDecode} from "jwt-decode";

interface JwtPayload {
  sub: number;
  username: string;
  role: string;
  exp: number;
  iat: number;
}

export default function DashboardHome() {
  const token = getToken();
  let username = "Guest";

  if (token) {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (decoded.username) {
        username = decoded.username;
      }
    } catch (e) {
      console.error("Token decoding failed:", e);
    }
  }

  return (
    <div className="flex justify-center items-center h-screen p-6 bg-black">
      <div className="w-full max-w-lg p-6 rounded-xl shadow-xl bg-zinc-900 border border-red-600">
        <h2 className="text-3xl font-bold mb-4 text-center text-red-500">
          Dashboard
        </h2>

        <p className="text-xl text-gray-200 text-center mb-4">
          Welcome, <span className="text-red-400 font-bold">{username}</span>
        </p>

        {token && (
          <div className="mt-4">
            <p className="text-red-400 font-semibold">Your Bearer Token</p>
            <pre className="p-3 bg-zinc-800 text-gray-200 text-xs mt-2 rounded-lg border border-red-700 overflow-x-auto whitespace-nowrap max-w-full">
              {token}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
