import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import {
  Plus, Search, Globe, Edit2, Trash2, Star, FolderOpen, ExternalLink,
} from "lucide-react";
import { getAllProjects, deleteProject } from "../../../lib/projectService";
import type { Project } from "../../../lib/types";
import { DeleteDialog } from "./DeleteDialog";

type StatusFilter = "all" | "published" | "draft";

export function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [deleteTarget, setDeleteTarget] = useState<Project | null>(null);
  const navigate = useNavigate();

  const load = async () => {
    try {
      const data = await getAllProjects();
      setProjects(data);
    } catch {
      toast.error("Failed to load projects.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteProject(deleteTarget.id);
      toast.success(`"${deleteTarget.title}" deleted.`);
      setProjects(prev => prev.filter(p => p.id !== deleteTarget.id));
    } catch {
      toast.error("Failed to delete project.");
      throw new Error("delete failed");
    }
  };

  const filtered = projects.filter(p => {
    const matchStatus = statusFilter === "all" || p.status === statusFilter;
    const q = search.toLowerCase();
    const matchSearch = !q || p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || (p.client ?? "").toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  const statusTabs: { key: StatusFilter; label: string }[] = [
    { key: "all", label: "All" },
    { key: "published", label: "Published" },
    { key: "draft", label: "Draft" },
  ];

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <FolderOpen size={16} className="text-[#8b5cf6]" />
            <span className="text-[#8b5cf6] text-xs tracking-widest uppercase" style={{ fontFamily: "JetBrains Mono, monospace" }}>
              Content
            </span>
          </div>
          <h1 className="text-white text-2xl font-bold" style={{ fontFamily: "Sora, sans-serif" }}>Projects</h1>
          <p className="text-white/35 text-sm mt-1" style={{ fontFamily: "Inter, sans-serif" }}>
            {projects.length} total project{projects.length !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          onClick={() => navigate("/admin/projects/new")}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold transition-all hover:opacity-90"
          style={{
            fontFamily: "Space Grotesk, sans-serif",
            background: "linear-gradient(135deg,#7c3aed,#8b5cf6)",
            boxShadow: "0 0 20px rgba(139,92,246,0.3)",
          }}
        >
          <Plus size={15} />
          <span className="hidden sm:inline">New Project</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        {/* Search */}
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search projects..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/4 border border-white/8 text-white placeholder-white/25 focus:outline-none focus:border-[#8b5cf6]/40 text-sm transition-all"
            style={{ fontFamily: "Inter, sans-serif" }}
          />
        </div>
        {/* Status tabs */}
        <div className="flex rounded-xl border border-white/8 overflow-hidden flex-shrink-0" style={{ background: "rgba(255,255,255,0.02)" }}>
          {statusTabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setStatusFilter(tab.key)}
              className="px-4 py-2.5 text-sm transition-all"
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                background: statusFilter === tab.key ? "rgba(139,92,246,0.2)" : "transparent",
                color: statusFilter === tab.key ? "#a78bfa" : "rgba(255,255,255,0.4)",
                fontWeight: statusFilter === tab.key ? 600 : 400,
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex flex-col gap-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-white/3 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-white/6 p-16 text-center" style={{ background: "rgba(255,255,255,0.02)" }}>
          <FolderOpen size={36} className="text-white/15 mx-auto mb-4" />
          <p className="text-white/35 text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
            {search ? "No projects match your search." : "No projects yet."}
          </p>
          {!search && (
            <button
              onClick={() => navigate("/admin/projects/new")}
              className="mt-4 text-[#8b5cf6] text-sm hover:underline"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              Add your first project →
            </button>
          )}
        </div>
      ) : (
        <div className="rounded-2xl border border-white/6 overflow-hidden" style={{ background: "rgba(255,255,255,0.02)" }}>
          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  {["Project", "Category", "Status", "", "Actions"].map(h => (
                    <th key={h} className="text-left px-5 py-3 text-white/25 text-xs" style={{ fontFamily: "JetBrains Mono, monospace" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(p => (
                  <tr
                    key={p.id}
                    className="hover:bg-white/2 transition-colors"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                  >
                    {/* Project */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-white/5"
                          style={{ border: "1px solid rgba(255,255,255,0.06)" }}
                        >
                          {p.featured_image ? (
                            <img src={p.featured_image} alt={p.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <FolderOpen size={14} className="text-white/20" />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="text-white text-sm font-medium leading-tight" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                            {p.title}
                          </p>
                          {p.client && (
                            <p className="text-white/30 text-xs mt-0.5" style={{ fontFamily: "Inter, sans-serif" }}>{p.client}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    {/* Category */}
                    <td className="px-5 py-3.5">
                      <span className="text-white/45 text-xs" style={{ fontFamily: "Inter, sans-serif" }}>{p.category}</span>
                    </td>
                    {/* Status */}
                    <td className="px-5 py-3.5">
                      <span
                        className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium"
                        style={{
                          background: p.status === "published" ? "rgba(16,185,129,0.12)" : "rgba(245,158,11,0.12)",
                          color: p.status === "published" ? "#10b981" : "#f59e0b",
                          fontFamily: "Space Grotesk, sans-serif",
                        }}
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ background: p.status === "published" ? "#10b981" : "#f59e0b" }}
                        />
                        {p.status === "published" ? "Published" : "Draft"}
                      </span>
                    </td>
                    {/* Featured */}
                    <td className="px-5 py-3.5">
                      {p.featured && <Star size={13} className="text-[#8b5cf6]" fill="currentColor" />}
                    </td>
                    {/* Actions */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        {p.live_url && (
                          <a
                            href={p.live_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white/30 hover:text-white/70 transition-colors"
                          >
                            <ExternalLink size={14} />
                          </a>
                        )}
                        <button
                          onClick={() => navigate(`/admin/projects/${p.id}/edit`)}
                          className="text-[#8b5cf6]/70 hover:text-[#8b5cf6] transition-colors"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(p)}
                          className="text-red-400/50 hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden flex flex-col divide-y divide-white/4">
            {filtered.map(p => (
              <div key={p.id} className="p-4 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-white/5 border border-white/6">
                  {p.featured_image ? (
                    <img src={p.featured_image} alt={p.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FolderOpen size={16} className="text-white/20" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{p.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs"
                      style={{
                        background: p.status === "published" ? "rgba(16,185,129,0.12)" : "rgba(245,158,11,0.12)",
                        color: p.status === "published" ? "#10b981" : "#f59e0b",
                        fontFamily: "Space Grotesk, sans-serif",
                      }}
                    >
                      {p.status === "published" ? "Published" : "Draft"}
                    </span>
                    <span className="text-white/30 text-xs" style={{ fontFamily: "Inter, sans-serif" }}>{p.category}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <button onClick={() => navigate(`/admin/projects/${p.id}/edit`)} className="text-[#8b5cf6]/70 hover:text-[#8b5cf6]">
                    <Edit2 size={16} />
                  </button>
                  <button onClick={() => setDeleteTarget(p)} className="text-red-400/50 hover:text-red-400">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Delete dialog */}
      <DeleteDialog
        open={!!deleteTarget}
        onOpenChange={open => !open && setDeleteTarget(null)}
        projectTitle={deleteTarget?.title ?? ""}
        onConfirm={handleDelete}
      />
    </div>
  );
}
