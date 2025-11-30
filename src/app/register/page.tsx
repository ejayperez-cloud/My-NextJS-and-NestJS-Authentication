'use client'
import { useRouter } from "next/navigation";
import { useState } from "react";
import { saveToken } from '@/lib/auth';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { API_BASE } from '@/lib/config';
import { FormEvent } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleRegister(e: FormEvent) {
    e.preventDefault();
    setError('');

    const res = await fetch(`${API_BASE}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message || 'Register Failed');
      return;
    }

    saveToken(data.accessToken);
    router.push('/login');
  }

  return (
    <div className="flex justify-center items-center h-screen p-6 bg-black">
      <Card className="w-full max-w-sm p-4 rounded-xl shadow-xl bg-zinc-900 border border-red-600">
        <CardContent>
          <h2 className="text-3xl font-bold mb-4 text-center text-red-500">
            Register
          </h2>

          <form onSubmit={handleRegister} className="space-y-4">
            {error && (
              <p className="text-red-400 text-center font-medium">
                {error}
              </p>
            )}

            <Input
              className="bg-zinc-800 text-white border-red-600 focus:border-red-500"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <Input
              type="password"
              className="bg-zinc-800 text-white border-red-600 focus:border-red-500"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold hover:underline cursor-pointer"
              type="submit"
            >
              Register
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
