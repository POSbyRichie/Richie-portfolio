import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { Eye, EyeOff, Lock, Mail, Zap } from "lucide-react";
import { useAuth } from "./AuthContext";
import { supabase } from "../../../lib/supabase";

export function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resetMode, setResetMode] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const { signIn, user, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && isAdmin) navigate("/admin", { replace: true });
  }, [user, isAdmin, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter your email and password.");
      return;
    }
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) {
      if (error.toLowerCase().includes("fetch") || error.toLowerCase().includes("network")) {
        toast.error("Cannot reach Supabase. Check your internet connection and Supabase project status.");
      } else if (error.toLowerCase().includes("invalid") || error.toLowerCase().includes("credentials")) {
        toast.error("Wrong email or password. Please try again.");
      } else {
        toast.error(error);
      }
    } else {
      toast.success("Welcome back!");
      navigate("/admin");
    }
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) { toast.error("Enter your email to reset password."); return; }
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/admin/reset-password`,
    });
    setLoading(false);
    if (error) { toast.error(error.message); return; }
    setResetSent(true);
    toast.success("Password reset link sent to your email.");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{ background: "linear-gradient(135deg, #060610 0%, #0b0b1a 50%, #0d0d20 100%)" }}
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(124,58,237,0.12) 0%, transparent 70%)" }} />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo / Brand */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4"
            style={{ background: "linear-gradient(135deg, #7c3aed, #8b5cf6)", boxShadow: "0 0 32px rgba(139,92,246,0.35)" }}>
            <Zap size={26} className="text-white" />
          </div>
          <h1 className="text-white text-2xl font-bold mb-1" style={{ fontFamily: "Sora, sans-serif" }}>
            CMS Admin
          </h1>
          <p className="text-white/40 text-sm" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            CodeWithRichie Portfolio
          </p>
        </div>

        {/* Card */}
        <div
          className="rounded-3xl border border-white/8 p-8"
          style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(12px)" }}
        >
          {resetSent ? (
            <div className="text-center py-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                <Mail size={24} className="text-emerald-400" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2" style={{ fontFamily: "Sora, sans-serif" }}>Check Your Email</h3>
              <p className="text-white/45 text-sm mb-6" style={{ fontFamily: "Inter, sans-serif" }}>
                A password reset link has been sent to <span className="text-white/70">{email}</span>.
              </p>
              <button onClick={() => { setResetMode(false); setResetSent(false); }}
                className="text-[#8b5cf6] text-sm hover:underline">
                Back to login
              </button>
            </div>
          ) : (
            <form onSubmit={resetMode ? handleReset : handleLogin} className="flex flex-col gap-5">
              <h2 className="text-white font-semibold text-lg mb-1" style={{ fontFamily: "Sora, sans-serif" }}>
                {resetMode ? "Reset Password" : "Sign In"}
              </h2>

              {/* Email */}
              <div>
                <label className="block text-white/45 text-xs mb-2" style={{ fontFamily: "JetBrains Mono, monospace" }}>
                  Email address
                </label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="malisrichard@icloud.com"
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/4 border border-white/8 text-white placeholder-white/20 focus:outline-none focus:border-[#8b5cf6]/50 focus:bg-white/6 transition-all text-sm"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  />
                </div>
              </div>

              {/* Password */}
              {!resetMode && (
                <div>
                  <label className="block text-white/45 text-xs mb-2" style={{ fontFamily: "JetBrains Mono, monospace" }}>
                    Password
                  </label>
                  <div className="relative">
                    <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="w-full pl-10 pr-10 py-3 rounded-xl bg-white/4 border border-white/8 text-white placeholder-white/20 focus:outline-none focus:border-[#8b5cf6]/50 focus:bg-white/6 transition-all text-sm"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                    >
                      {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl text-white font-semibold flex items-center justify-center gap-2 transition-all duration-200 hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  background: "linear-gradient(135deg, #7c3aed, #8b5cf6)",
                  boxShadow: "0 0 24px rgba(139,92,246,0.3)",
                }}
              >
                {loading ? (
                  <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Processing...</>
                ) : resetMode ? "Send Reset Link" : "Sign In"}
              </button>

              {/* Toggle */}
              <button
                type="button"
                onClick={() => { setResetMode(!resetMode); setResetSent(false); }}
                className="text-center text-white/35 hover:text-white/65 text-xs transition-colors"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {resetMode ? "← Back to sign in" : "Forgot your password?"}
              </button>
            </form>
          )}
        </div>

        <p className="text-center text-white/20 text-xs mt-6" style={{ fontFamily: "Inter, sans-serif" }}>
          Admin access only. Unauthorized users will be refused.
        </p>
      </div>
    </div>
  );
}
