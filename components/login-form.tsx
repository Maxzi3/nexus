/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react"; 
import Image from "next/image";
import toast from "react-hot-toast";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); 
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Welcome back!");
        
        router.push("/dashboard");
        router.refresh();
      } else {
        toast.error(data.message || data.error || "Invalid credentials");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const onBack = () => router.push("/");

  return (
    <>
      <div className="flex items-center justify-between p-4">
        <Button
          type="button"
          onClick={onBack}
          variant="ghost"
          className="text-muted-foreground hover:text-foreground"
          disabled={isLoading}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>

      <div className="min-h-screen flex items-center justify-center bg-background px-4 -mt-16">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md bg-foreground p-8 rounded-xl border border-border flex flex-col gap-6 shadow-lg"
        >
          <div className="text-center">
            <Image
              src="/logo.png"
              alt="Logo"
              width={100}
              height={100}
              className="mx-auto"
              priority
            />
            <h2 className="text-3xl font-bold text-foreground">Sign In</h2>
          </div>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-3 rounded-lg bg-background border border-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            required
            disabled={isLoading}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-3 rounded-lg bg-background border border-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            required
            disabled={isLoading}
          />

          <Button
            type="submit"
            disabled={isLoading}
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full h-12 font-medium flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>
      </div>
    </>
  );
}
