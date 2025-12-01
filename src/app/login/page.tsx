'use client'
import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import { saveToken } from '@/lib/auth';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { API_BASE } from '@/lib/config';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({ username: '', password: '' });

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setError('');
    setFieldErrors({ username: '', password: '' });

    const newErrors: any = {};
    if (!username.trim()) newErrors.username = "Please fill in this field";
    if (!password.trim()) newErrors.password = "Please fill in this field";

    if (Object.keys(newErrors).length > 0) {
      setFieldErrors(newErrors);
      return;
    }

    const res = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message || 'Login Failed');
      return;
    }

    saveToken(data.accessToken);
    router.push('/dashboard');
  }

  return (
    <div className="flex justify-center items-center h-screen p-6 bg-black">
      <Card className="w-full max-w-sm p-4 rounded-xl shadow-xl bg-zinc-900 border border-red-600">
        <CardContent>
          <h2 className="text-3xl font-bold mb-4 text-center text-red-500">
            Login
          </h2>

          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <p className="text-red-400 text-center font-medium">
                {error}
              </p>
            )}

            <div>
              <Input
                className="bg-zinc-800 text-white border-red-600 focus:border-red-500"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {fieldErrors.username && (
                <p className="text-red-400 text-sm mt-1">{fieldErrors.username}</p>
              )}
            </div>

            <div>
              <Input
                type="password"
                className="bg-zinc-800 text-white border-red-600 focus:border-red-500"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {fieldErrors.password && (
                <p className="text-red-400 text-sm mt-1">
