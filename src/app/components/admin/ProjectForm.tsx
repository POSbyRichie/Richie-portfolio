import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import {
  Upload, X, Plus, Globe, Github, Star, Eye, EyeOff, Save,
  ArrowLeft, Image as ImageIcon, Loader2, Check,
} from "lucide-react";
import {
  getProjectById, createProject, updateProject, uploadImage, generateSlug,
} from "../../../lib/projectService";
import type { ProjectInsert } from "../../../lib/types";
import { PROJECT_CATEGORIES, TECH_SUGGESTIONS } from "../../../lib/types";

const EMPTY_FORM: ProjectInsert = {
  title: "",
  slug: "",
  short_description: "",
  full_description: "",
  category: PROJECT_CATEGORIES[0],
  client: "",
  completion_date: "",
  technologies: [],
  featured_image: null,
  gallery_images: [],
  live_url: "",
  github_url: "",
  status: "draft",
  featured: false,
  sort_order: 0,
};

export function ProjectForm() {
  const { projectId } = useParams<{ projectId: string }>();
  const isEdit = !!projectId;
  const navigate = useNavigate();

  const [form, setForm] = useState<ProjectInsert>(EMPTY_FORM);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [techInput, setTechInput] = useState("");
  const [slugManual, setSlugManual] = useState(false);
  const [uploadingFeatured, setUploadingFeatured] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);

  const featuredInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  // Load existing project if editing
  useEffect(() => {
    if (!isEdit || !projectId) return;
    getProjectById(projectId)
      .then(p => {
        if (!p) { toast.error("Project not found."); navigate("/admin/projects"); return; }
        setForm({
          title: p.title,
          slug: p.slug,
          short_description: p.short_description,
          full_description: p.full_description ?? "",
          category: p.category,
          client: p.client ?? "",
          completion_date: p.completion_date ?? "",
          technologies: p.technologies,
          featured_image: p.featured_image,
          gallery_images: p.gallery_images,
          live_url: p.live_url ?? "",
          github_url: p.github_url ?? "",
          status: p.status,
          featured: p.featured,
          sort_order: p.sort_order,
        });
        setSlugManual(true); // Don't auto-generate slug when editing
      })
      .catch(() => { toast.error("Failed to load project."); navigate("/admin/projects"); })
      .finally(() => setLoading(false));
  }, [projectId, isEdit, navigate]);

  // Auto-generate slug from title (only when not in edit mode / slug not manually set)
  useEffect(() => {
    if (!slugManual && form.title) {
      setForm(prev => ({ ...prev, slug: generateSlug(form.title) }));
    }
  }, [form.title, slugManual]);

  const set = <K extends keyof ProjectInsert>(key: K, value: ProjectInsert[K]) =>
    setForm(prev => ({ ...prev, [key]: value }));

  // Tech tag management
  const addTech = (tech: string) => {
    const t = tech.trim();
    if (t && !form.technologies.includes(t)) {
      set("technologies", [...form.technologies, t]);
    }
    setTechInput("");
  };

  const removeTech = (tech: string) => {
    set("technologies", form.technologies.filter(t => t !== tech));
  };

  // Featured image upload
  const handleFeaturedUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    if (file.size > 10 * 1024 * 1024) { toast.error("Image must be under 10MB."); return; }
    setUploadingFeatured(true);
    try {
      const url = await uploadImage(file, "featured");
      set("featured_image", url);
      toast.success("Featured image uploaded.");
    } catch {
      toast.error("Image upload failed. Check Supabase storage bucket.");
    } finally {
      setUploadingFeatured(false);
    }
  };

  // Gallery images upload
  const handleGalleryUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const fileArr = Array.from(files).slice(0, 10 - form.gallery_images.length);
    if (fileArr.length === 0) { toast.error("Gallery is full (10 images max)."); return; }
    setUploadingGallery(true);
    const urls: string[] = [];
    try {
      for (const file of fileArr) {
        if (file.size > 10 * 1024 * 1024) continue;
        const url = await uploadImage(file, "gallery");
        urls.push(url);
      }
      set("gallery_images", [...form.gallery_images, ...urls]);
      toast.success(`${urls.length} image${urls.length > 1 ? "s" : ""} uploaded.`);
    } catch {
      toast.error("Some images failed to upload.");
    } finally {
      setUploadingGallery(false);
    }
  };

  const removeGalleryImage = (url: string) => {
    set("gallery_images", form.gallery_images.filter(u => u !== url));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) { toast.error("Title is required."); return; }
    if (!form.slug.trim()) { toast.error("Slug is required."); return; }
    if (!form.short_description.trim()) { toast.error("Short description is required."); return; }

    setSaving(true);
    try {
      if (isEdit && projectId) {
        await updateProject(projectId, form);
        toast.success("Project updated successfully.");
      } else {
        await createProject(form);
        toast.success("Project created successfully.");
      }
      navigate("/admin/projects");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Save failed.";
      toast.error(msg.includes("duplicate") ? "A project with this slug already exists." : `Save failed: ${msg}`);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 size={32} className="text-[#8b5cf6] animate-spin" />
      </div>
    );
  }

  const inputCls = "w-full px-4 py-3 rounded-xl bg-white/4 border border-white/8 text-white placeholder-white/25 focus:outline-none focus:border-[#8b5cf6]/40 focus:bg-white/5 transition-all text-sm";
  const labelCls = "block text-white/45 text-xs mb-2";

  return (
    <form onSubmit={handleSubmit}>
      {/* Page header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          type="button"
          onClick={() => navigate("/admin/projects")}
          className="w-9 h-9 rounded-xl border border-white/10 flex items-center justify-center text-white/45 hover:text-white/75 hover:bg-white/5 transition-all"
        >
          <ArrowLeft size={16} />
        </button>
        <div className="flex-1">
          <h1 className="text-white text-2xl font-bold" style={{ fontFamily: "Sora, sans-serif" }}>
            {isEdit ? "Edit Project" : "New Project"}
          </h1>
          <p className="text-white/35 text-sm mt-0.5" style={{ fontFamily: "Inter, sans-serif" }}>
            {isEdit ? "Update project details." : "Add a new portfolio project."}
          </p>
        </div>
        {/* Status toggle + Save */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => set("status", form.status === "published" ? "draft" : "published")}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all text-sm"
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              background: form.status === "published" ? "rgba(16,185,129,0.12)" : "rgba(255,255,255,0.04)",
              borderColor: form.status === "published" ? "rgba(16,185,129,0.3)" : "rgba(255,255,255,0.1)",
              color: form.status === "published" ? "#10b981" : "rgba(255,255,255,0.45)",
            }}
          >
            {form.status === "published" ? <Eye size={14} /> : <EyeOff size={14} />}
            <span className="hidden sm:inline">{form.status === "published" ? "Published" : "Draft"}</span>
          </button>
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold transition-all hover:opacity-90 disabled:opacity-60"
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              background: "linear-gradient(135deg,#7c3aed,#8b5cf6)",
              boxShadow: "0 0 20px rgba(139,92,246,0.3)",
            }}
          >
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            <span className="hidden sm:inline">{saving ? "Saving..." : "Save"}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column: main fields */}
        <div className="lg:col-span-2 flex flex-col gap-5">

          {/* Basic info card */}
          <div className="rounded-2xl border border-white/6 p-6" style={{ background: "rgba(255,255,255,0.02)" }}>
            <h2 className="text-white text-sm font-semibold mb-5" style={{ fontFamily: "Sora, sans-serif" }}>Basic Info</h2>
            <div className="flex flex-col gap-4">
              {/* Title */}
              <div>
                <label className={labelCls} style={{ fontFamily: "JetBrains Mono, monospace" }}>Title *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={e => set("title", e.target.value)}
                  placeholder="Project name"
                  className={inputCls}
                  style={{ fontFamily: "Inter, sans-serif" }}
                  required
                />
              </div>

              {/* Slug */}
              <div>
                <label className={labelCls} style={{ fontFamily: "JetBrains Mono, monospace" }}>Slug *</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={form.slug}
                    onChange={e => { setSlugManual(true); set("slug", e.target.value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")); }}
                    placeholder="url-friendly-slug"
                    className={inputCls}
                    style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "12px" }}
                    required
                  />
                  {!isEdit && (
                    <button
                      type="button"
                      onClick={() => { setSlugManual(false); set("slug", generateSlug(form.title)); }}
                      className="px-3 py-2 rounded-xl border border-white/10 text-white/40 hover:text-white/70 text-xs hover:bg-white/5 transition-all flex-shrink-0"
                      title="Auto-generate from title"
                    >
                      <Check size={14} />
                    </button>
                  )}
                </div>
                <p className="text-white/25 text-xs mt-1.5" style={{ fontFamily: "Inter, sans-serif" }}>
                  Public URL: /portfolio/{form.slug || "your-slug"}
                </p>
              </div>

              {/* Short description */}
              <div>
                <label className={labelCls} style={{ fontFamily: "JetBrains Mono, monospace" }}>Short Description *</label>
                <textarea
                  value={form.short_description}
                  onChange={e => set("short_description", e.target.value)}
                  placeholder="One or two sentences describing the project..."
                  rows={2}
                  className={`${inputCls} resize-none`}
                  style={{ fontFamily: "Inter, sans-serif" }}
                  required
                />
              </div>

              {/* Full description */}
              <div>
                <label className={labelCls} style={{ fontFamily: "JetBrains Mono, monospace" }}>Full Description</label>
                <textarea
                  value={form.full_description ?? ""}
                  onChange={e => set("full_description", e.target.value)}
                  placeholder="Detailed project overview, challenges, solutions..."
                  rows={5}
                  className={`${inputCls} resize-none`}
                  style={{ fontFamily: "Inter, sans-serif" }}
                />
              </div>
            </div>
          </div>

          {/* Featured image */}
          <div className="rounded-2xl border border-white/6 p-6" style={{ background: "rgba(255,255,255,0.02)" }}>
            <h2 className="text-white text-sm font-semibold mb-5" style={{ fontFamily: "Sora, sans-serif" }}>Featured Image</h2>
            <input ref={featuredInputRef} type="file" accept="image/*" className="hidden" onChange={e => handleFeaturedUpload(e.target.files)} />
            {form.featured_image ? (
              <div className="relative group rounded-xl overflow-hidden aspect-video bg-white/4 border border-white/8">
                <img src={form.featured_image} alt="Featured" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => featuredInputRef.current?.click()}
                    className="px-4 py-2 rounded-xl bg-white/15 text-white text-xs hover:bg-white/25 transition-all"
                    style={{ fontFamily: "Space Grotesk, sans-serif" }}
                  >
                    Replace
                  </button>
                  <button
                    type="button"
                    onClick={() => set("featured_image", null)}
                    className="px-4 py-2 rounded-xl bg-red-500/20 text-red-300 text-xs hover:bg-red-500/35 transition-all"
                    style={{ fontFamily: "Space Grotesk, sans-serif" }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => featuredInputRef.current?.click()}
                disabled={uploadingFeatured}
                className="w-full aspect-video rounded-xl border-2 border-dashed border-white/10 hover:border-[#8b5cf6]/40 flex flex-col items-center justify-center gap-3 transition-all hover:bg-white/2 disabled:opacity-60"
              >
                {uploadingFeatured ? (
                  <Loader2 size={24} className="text-[#8b5cf6] animate-spin" />
                ) : (
                  <>
                    <div className="w-12 h-12 rounded-xl bg-[#8b5cf6]/10 flex items-center justify-center">
                      <ImageIcon size={22} className="text-[#8b5cf6]" />
                    </div>
                    <div className="text-center">
                      <p className="text-white/50 text-sm" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                        Click to upload featured image
                      </p>
                      <p className="text-white/25 text-xs mt-1" style={{ fontFamily: "Inter, sans-serif" }}>
                        PNG, JPG, WebP — max 10MB
                      </p>
                    </div>
                  </>
                )}
              </button>
            )}
          </div>

          {/* Gallery */}
          <div className="rounded-2xl border border-white/6 p-6" style={{ background: "rgba(255,255,255,0.02)" }}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-white text-sm font-semibold" style={{ fontFamily: "Sora, sans-serif" }}>
                Gallery <span className="text-white/30 font-normal">({form.gallery_images.length}/10)</span>
              </h2>
              {form.gallery_images.length < 10 && (
                <button
                  type="button"
                  onClick={() => galleryInputRef.current?.click()}
                  disabled={uploadingGallery}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[#8b5cf6] border border-[#8b5cf6]/25 hover:bg-[#8b5cf6]/10 text-xs transition-all disabled:opacity-50"
                  style={{ fontFamily: "Space Grotesk, sans-serif" }}
                >
                  {uploadingGallery ? <Loader2 size={12} className="animate-spin" /> : <Plus size={12} />}
                  Add Images
                </button>
              )}
            </div>
            <input ref={galleryInputRef} type="file" accept="image/*" multiple className="hidden" onChange={e => handleGalleryUpload(e.target.files)} />

            {form.gallery_images.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {form.gallery_images.map(url => (
                  <div key={url} className="relative group aspect-video rounded-lg overflow-hidden bg-white/4 border border-white/6">
                    <img src={url} alt="Gallery" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeGalleryImage(url)}
                      className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/70 text-white/70 hover:text-white opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
                {uploadingGallery && (
                  <div className="aspect-video rounded-lg border-2 border-dashed border-white/10 flex items-center justify-center">
                    <Loader2 size={20} className="text-[#8b5cf6] animate-spin" />
                  </div>
                )}
              </div>
            ) : (
              <div
                className="rounded-xl border-2 border-dashed border-white/8 p-8 text-center cursor-pointer hover:border-[#8b5cf6]/30 hover:bg-white/1 transition-all"
                onClick={() => galleryInputRef.current?.click()}
              >
                <Upload size={20} className="text-white/25 mx-auto mb-2" />
                <p className="text-white/35 text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
                  {uploadingGallery ? "Uploading..." : "Upload gallery images (up to 10)"}
                </p>
              </div>
            )}
          </div>

          {/* Technologies */}
          <div className="rounded-2xl border border-white/6 p-6" style={{ background: "rgba(255,255,255,0.02)" }}>
            <h2 className="text-white text-sm font-semibold mb-4" style={{ fontFamily: "Sora, sans-serif" }}>Technologies</h2>
            {/* Tag input */}
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={techInput}
                onChange={e => setTechInput(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addTech(techInput); } if (e.key === ",") { e.preventDefault(); addTech(techInput); } }}
                placeholder="Type and press Enter..."
                className={`${inputCls} flex-1`}
                style={{ fontFamily: "Inter, sans-serif" }}
              />
              <button
                type="button"
                onClick={() => addTech(techInput)}
                className="px-4 py-2 rounded-xl border border-white/10 text-white/50 hover:text-white/80 hover:bg-white/5 transition-all"
              >
                <Plus size={15} />
              </button>
            </div>
            {/* Suggestions */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {TECH_SUGGESTIONS.filter(t => !form.technologies.includes(t)).slice(0, 16).map(t => (
                <button
                  key={t}
                  type="button"
                  onClick={() => addTech(t)}
                  className="px-2.5 py-1 rounded-lg text-xs text-white/35 border border-white/8 hover:bg-[#8b5cf6]/10 hover:text-[#8b5cf6] hover:border-[#8b5cf6]/25 transition-all"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  + {t}
                </button>
              ))}
            </div>
            {/* Selected tags */}
            {form.technologies.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {form.technologies.map(t => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
                    style={{
                      background: "rgba(139,92,246,0.15)",
                      color: "#a78bfa",
                      border: "1px solid rgba(139,92,246,0.25)",
                      fontFamily: "Space Grotesk, sans-serif",
                    }}
                  >
                    {t}
                    <button type="button" onClick={() => removeTech(t)} className="hover:text-white/80 transition-colors">
                      <X size={11} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right column: metadata */}
        <div className="flex flex-col gap-5">

          {/* Project details */}
          <div className="rounded-2xl border border-white/6 p-6" style={{ background: "rgba(255,255,255,0.02)" }}>
            <h2 className="text-white text-sm font-semibold mb-5" style={{ fontFamily: "Sora, sans-serif" }}>Details</h2>
            <div className="flex flex-col gap-4">
              {/* Category */}
              <div>
                <label className={labelCls} style={{ fontFamily: "JetBrains Mono, monospace" }}>Category</label>
                <select
                  value={form.category}
                  onChange={e => set("category", e.target.value)}
                  className={`${inputCls} cursor-pointer`}
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {PROJECT_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              {/* Client */}
              <div>
                <label className={labelCls} style={{ fontFamily: "JetBrains Mono, monospace" }}>Client</label>
                <input
                  type="text"
                  value={form.client ?? ""}
                  onChange={e => set("client", e.target.value)}
                  placeholder="Client or organization name"
                  className={inputCls}
                  style={{ fontFamily: "Inter, sans-serif" }}
                />
              </div>

              {/* Completion date */}
              <div>
                <label className={labelCls} style={{ fontFamily: "JetBrains Mono, monospace" }}>Completion Date</label>
                <input
                  type="date"
                  value={form.completion_date ?? ""}
                  onChange={e => set("completion_date", e.target.value)}
                  className={`${inputCls} [color-scheme:dark]`}
                  style={{ fontFamily: "Inter, sans-serif" }}
                />
              </div>

              {/* Sort order */}
              <div>
                <label className={labelCls} style={{ fontFamily: "JetBrains Mono, monospace" }}>Sort Order</label>
                <input
                  type="number"
                  value={form.sort_order}
                  onChange={e => set("sort_order", parseInt(e.target.value) || 0)}
                  min={0}
                  className={inputCls}
                  style={{ fontFamily: "Inter, sans-serif" }}
                />
                <p className="text-white/25 text-xs mt-1.5" style={{ fontFamily: "Inter, sans-serif" }}>Lower = shown first</p>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="rounded-2xl border border-white/6 p-6" style={{ background: "rgba(255,255,255,0.02)" }}>
            <h2 className="text-white text-sm font-semibold mb-5" style={{ fontFamily: "Sora, sans-serif" }}>Links</h2>
            <div className="flex flex-col gap-4">
              <div>
                <label className={labelCls} style={{ fontFamily: "JetBrains Mono, monospace" }}>Live URL</label>
                <div className="relative">
                  <Globe size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
                  <input
                    type="url"
                    value={form.live_url ?? ""}
                    onChange={e => set("live_url", e.target.value)}
                    placeholder="https://example.com"
                    className={`${inputCls} pl-10`}
                    style={{ fontFamily: "Inter, sans-serif" }}
                  />
                </div>
              </div>
              <div>
                <label className={labelCls} style={{ fontFamily: "JetBrains Mono, monospace" }}>GitHub URL</label>
                <div className="relative">
                  <Github size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
                  <input
                    type="url"
                    value={form.github_url ?? ""}
                    onChange={e => set("github_url", e.target.value)}
                    placeholder="https://github.com/..."
                    className={`${inputCls} pl-10`}
                    style={{ fontFamily: "Inter, sans-serif" }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Publish settings */}
          <div className="rounded-2xl border border-white/6 p-6" style={{ background: "rgba(255,255,255,0.02)" }}>
            <h2 className="text-white text-sm font-semibold mb-5" style={{ fontFamily: "Sora, sans-serif" }}>Settings</h2>
            <div className="flex flex-col gap-4">
              {/* Featured toggle */}
              <div
                className="flex items-center justify-between p-3.5 rounded-xl border border-white/6 cursor-pointer hover:bg-white/2 transition-all"
                onClick={() => set("featured", !form.featured)}
              >
                <div className="flex items-center gap-2.5">
                  <Star size={15} className={form.featured ? "text-[#8b5cf6]" : "text-white/30"} fill={form.featured ? "currentColor" : "none"} />
                  <span className="text-white/65 text-sm" style={{ fontFamily: "Space Grotesk, sans-serif" }}>Featured Project</span>
                </div>
                <div
                  className="w-10 h-5 rounded-full relative transition-all duration-200"
                  style={{ background: form.featured ? "#7c3aed" : "rgba(255,255,255,0.1)" }}
                >
                  <div
                    className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all duration-200"
                    style={{ left: form.featured ? "22px" : "2px" }}
                  />
                </div>
              </div>

              {/* Status */}
              <div
                className="flex items-center justify-between p-3.5 rounded-xl border border-white/6 cursor-pointer hover:bg-white/2 transition-all"
                onClick={() => set("status", form.status === "published" ? "draft" : "published")}
              >
                <div className="flex items-center gap-2.5">
                  {form.status === "published"
                    ? <Eye size={15} className="text-emerald-400" />
                    : <EyeOff size={15} className="text-white/30" />
                  }
                  <span className="text-white/65 text-sm" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                    {form.status === "published" ? "Published" : "Draft"}
                  </span>
                </div>
                <div
                  className="w-10 h-5 rounded-full relative transition-all duration-200"
                  style={{ background: form.status === "published" ? "#10b981" : "rgba(255,255,255,0.1)" }}
                >
                  <div
                    className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all duration-200"
                    style={{ left: form.status === "published" ? "22px" : "2px" }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit button (mobile-friendly) */}
          <button
            type="submit"
            disabled={saving}
            className="w-full py-3.5 rounded-xl text-white font-semibold flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-60"
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              background: "linear-gradient(135deg,#7c3aed,#8b5cf6)",
              boxShadow: "0 0 24px rgba(139,92,246,0.3)",
            }}
          >
            {saving ? <><Loader2 size={16} className="animate-spin" /> Saving...</> : <><Save size={16} /> {isEdit ? "Save Changes" : "Create Project"}</>}
          </button>
        </div>
      </div>
    </form>
  );
}
