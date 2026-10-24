import type { ReactNode } from "react";
import { Navigate } from "react-router";
import { useAuth } from "./AuthContext";
import { supabase } from "../../../lib/supabase";

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#0b0b1a" }}>
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-full border-2 border-[#8b5cf6]/30 border-t-[#8b5cf6] animate-spin" />
          <p className="text-white/40 text-sm" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            Verifying access...
          </p>
        </div>
      </div>
    );
  }

  if (!user) return <Navigate to="/admin/login" replace />;
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "#0b0b1a" }}>
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
          </div>
          <h2 className="text-white text-xl font-bold mb-2" style={{ fontFamily: "Sora, sans-serif" }}>
            Access Denied
          </h2>
          <p className="text-white/45 text-sm mb-6" style={{ fontFamily: "Inter, sans-serif" }}>
            Your account is not authorized to access the admin area.
          </p>
          <button
            onClick={() => supabase.auth.signOut()}
            className="px-5 py-2.5 rounded-xl bg-white/6 border border-white/10 text-white/70 text-sm hover:bg-white/10 transition-colors"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
