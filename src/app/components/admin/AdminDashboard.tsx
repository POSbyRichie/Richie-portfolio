import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { FolderOpen, Globe, FileText, Star, Plus, ArrowRight, TrendingUp } from "lucide-react";
import { getAllProjects } from "../../../lib/projectService";
import type { Project } from "../../../lib/types";

export function AdminDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getAllProjects()
      .then(setProjects)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const published = projects.filter(p => p.status === "published").length;
  const drafts = projects.filter(p => p.status === "draft").length;
  const featured = projects.filter(p => p.featured).length;
  const recent = [...projects].slice(0, 5);

  const stats = [
    { label: "Total Projects", value: projects.length, icon: FolderOpen, color: "#8b5cf6", glow: "rgba(139,92,246,0.2)" },
    { label: "Published", value: published, icon: Globe, color: "#10b981", glow: "rgba(16,185,129,0.2)" },
    { label: "Drafts", value: drafts, icon: FileText, color: "#f59e0b", glow: "rgba(245,158,11,0.2)" },
    { label: "Featured", value: featured, icon: Star, color: "#3b82f6", glow: "rgba(59,130,246,0.2)" },
  ];

  return (
    <div>
      {/* Page header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <TrendingUp size={16} className="text-[#8b5cf6]" />
          <span className="text-[#8b5cf6] text-xs tracking-widest uppercase" style={{ fontFamily: "JetBrains Mono, monospace" }}>
            Overview
          </span>
        </div>
        <h1 className="text-white text-2xl font-bold" style={{ fontFamily: "Sora, sans-serif" }}>Dashboard</h1>
        <p className="text-white/35 text-sm mt-1" style={{ fontFamily: "Inter, sans-serif" }}>
          Manage your portfolio projects and content.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(s => (
          <div
            key={s.label}
            className="rounded-2xl border border-white/6 p-5"
            style={{ background: "rgba(255,255,255,0.02)" }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
              style={{ background: s.glow }}
            >
              <s.icon size={18} style={{ color: s.color }} />
            </div>
            <p className="text-white/40 text-xs mb-1" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{s.label}</p>
            {loading ? (
              <div className="h-7 w-10 bg-white/8 rounded animate-pulse" />
            ) : (
              <p className="text-white text-2xl font-bold" style={{ fontFamily: "Sora, sans-serif" }}>{s.value}</p>
            )}
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="flex flex-wrap gap-3 mb-8">
        <button
          onClick={() => navigate("/admin/projects/new")}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold transition-all duration-200 hover:opacity-90"
          style={{
            fontFamily: "Space Grotesk, sans-serif",
            background: "linear-gradient(135deg,#7c3aed,#8b5cf6)",
            boxShadow: "0 0 20px rgba(139,92,246,0.3)",
          }}
        >
          <Plus size={15} />
          Add New Project
        </button>
        <button
          onClick={() => navigate("/admin/projects")}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white/70 text-sm border border-white/10 hover:bg-white/5 transition-all duration-200"
          style={{ fontFamily: "Space Grotesk, sans-serif" }}
        >
          View All Projects
          <ArrowRight size={15} />
        </button>
      </div>

      {/* Recent projects */}
      <div className="rounded-2xl border border-white/6" style={{ background: "rgba(255,255,255,0.02)" }}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/6">
          <h2 className="text-white font-semibold text-sm" style={{ fontFamily: "Sora, sans-serif" }}>Recent Projects</h2>
          <button
            onClick={() => navigate("/admin/projects")}
            className="text-[#8b5cf6] text-xs hover:underline"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            View all →
          </button>
        </div>

        {loading ? (
          <div className="p-6 flex flex-col gap-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-10 bg-white/4 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : recent.length === 0 ? (
          <div className="p-12 text-center">
            <FolderOpen size={32} className="text-white/15 mx-auto mb-3" />
            <p className="text-white/30 text-sm" style={{ fontFamily: "Inter, sans-serif" }}>No projects yet. Add your first!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/4">
                  {["Title", "Category", "Status", "Featured", ""].map(h => (
                    <th key={h} className="text-left px-6 py-3 text-white/30 text-xs" style={{ fontFamily: "JetBrains Mono, monospace" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recent.map(p => (
                  <tr key={p.id} className="border-b border-white/4 last:border-0 hover:bg-white/2 transition-colors">
                    <td className="px-6 py-3.5">
                      <p className="text-white text-sm font-medium truncate max-w-[180px]" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                        {p.title}
                      </p>
                    </td>
                    <td className="px-6 py-3.5">
                      <span className="text-white/45 text-xs" style={{ fontFamily: "Inter, sans-serif" }}>{p.category}</span>
                    </td>
                    <td className="px-6 py-3.5">
                      <span
                        className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
                        style={{
                          fontFamily: "Space Grotesk, sans-serif",
                          background: p.status === "published" ? "rgba(16,185,129,0.15)" : "rgba(245,158,11,0.15)",
                          color: p.status === "published" ? "#10b981" : "#f59e0b",
                        }}
                      >
                        {p.status === "published" ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="px-6 py-3.5">
                      {p.featured && (
                        <Star size={13} className="text-[#8b5cf6]" fill="currentColor" />
                      )}
                    </td>
                    <td className="px-6 py-3.5">
                      <button
                        onClick={() => navigate(`/admin/projects/${p.id}/edit`)}
                        className="text-[#8b5cf6] text-xs hover:underline"
                        style={{ fontFamily: "Space Grotesk, sans-serif" }}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
