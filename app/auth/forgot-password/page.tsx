"use client";
import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/new-password`,
      });
      if (error) throw error;
      setSuccess("A password reset link has been sent to your email address.");
    } catch (err: any) {
      setError(err.message || "Failed to send reset email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid flex min-h-[calc(100vh-4rem)]">
      {/* Left side - Cake image (hidden on mobile) */}
      <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-center bg-cover bg-center bg-no-repeat relative"
        style={{ backgroundImage: "url('/images/forgot.jpg')" }}>
        {/* Optional overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      </div>

      <div className="flex-1 lg:flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="flex flex-col items-left space-y-2 text-left">
            <h1 className="text-2xl font-bold">Forgot Password</h1>
            <p className="text-muted-foreground">
              Enter your email address and we&apos;ll send you a link to reset your password.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="cake@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Sending..." : "Send Reset Link"}
            </Button>
          </form>
          {success && <div className="text-green-600 text-center font-medium">{success}</div>}
          {error && <div className="text-red-600 text-center font-medium">{error}</div>}
          <div className="text-center text-sm mt-4">
            <Link href="/auth/login" className="font-medium underline underline-offset-4 hover:text-primary">
              Back to Login
            </Link>
          </div>
        </div>
      </div>

    </div>

  );
}
