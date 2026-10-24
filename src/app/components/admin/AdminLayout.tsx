import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router";
import {
  LayoutDashboard, FolderOpen, Plus, LogOut, Zap, Menu, X,
} from "lucide-react";
import { useAuth } from "./AuthContext";

const navItems = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/projects", label: "Projects", icon: FolderOpen, end: false },
  { to: "/admin/projects/new", label: "New Project", icon: Plus, end: false },
];

export function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin/login");
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-6 border-b border-white/6">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: "linear-gradient(135deg,#7c3aed,#8b5cf6)", boxShadow: "0 0 20px rgba(139,92,246,0.35)" }}
        >
          <Zap size={18} className="text-white" />
        </div>
        <div>
          <p className="text-white text-sm font-bold leading-tight" style={{ fontFamily: "Sora, sans-serif" }}>CMS Admin</p>
          <p className="text-white/35 text-xs" style={{ fontFamily: "Space Grotesk, sans-serif" }}>CodeWithRichie</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                isActive
                  ? "text-white font-semibold border-l-2 border-[#8b5cf6] pl-[10px]"
                  : "text-white/45 hover:text-white/75 hover:bg-white/4"
              }`
            }
            style={({ isActive }) => ({
              fontFamily: "Space Grotesk, sans-serif",
              background: isActive ? "rgba(139,92,246,0.15)" : undefined,
            })}
          >
            <Icon size={16} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* User + sign out */}
      <div className="px-3 py-4 border-t border-white/6">
        <p className="text-white/30 text-xs px-3 mb-3 truncate" style={{ fontFamily: "Inter, sans-serif" }}>
          {user?.email}
        </p>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/45 hover:text-red-400 hover:bg-red-500/8 w-full transition-all duration-200"
          style={{ fontFamily: "Space Grotesk, sans-serif" }}
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "#0b0b1a" }}>
      {/* Desktop sidebar */}
      <aside
        className="hidden md:flex flex-col w-60 flex-shrink-0 h-full"
        style={{ background: "rgba(255,255,255,0.02)", borderRight: "1px solid rgba(255,255,255,0.06)" }}
      >
        <SidebarContent />
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/60 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
          <aside
            className="fixed left-0 top-0 z-50 flex flex-col w-64 h-full md:hidden"
            style={{ background: "#0f0f1e", borderRight: "1px solid rgba(255,255,255,0.08)" }}
          >
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute top-4 right-4 text-white/40 hover:text-white/70 transition-colors"
            >
              <X size={20} />
            </button>
            <SidebarContent />
          </aside>
        </>
      )}

      {/* Main content */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Header */}
        <header
          className="flex items-center gap-4 px-5 py-4 flex-shrink-0"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.01)" }}
        >
          <button
            className="md:hidden text-white/40 hover:text-white/70 transition-colors"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={22} />
          </button>
          <div className="flex-1" />
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
            style={{ background: "linear-gradient(135deg,#7c3aed,#8b5cf6)", fontFamily: "Sora, sans-serif" }}
          >
            {user?.email?.[0]?.toUpperCase() ?? "A"}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-5 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
