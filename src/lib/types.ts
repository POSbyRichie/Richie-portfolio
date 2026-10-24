export type ProjectStatus = "draft" | "published";

export interface Project {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  full_description: string | null;
  category: string;
  client: string | null;
  completion_date: string | null;
  technologies: string[];
  featured_image: string | null;
  gallery_images: string[];
  live_url: string | null;
  github_url: string | null;
  status: ProjectStatus;
  featured: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export type ProjectInsert = Omit<Project, "id" | "created_at" | "updated_at">;
export type ProjectUpdate = Partial<ProjectInsert>;

export const PROJECT_CATEGORIES = [
  "Web Development",
  "Full Stack Development",
  "E-Commerce",
  "Business Website",
  "NGO Website",
  "Education",
  "Real Estate",
  "Mobile App",
  "Tools / SaaS",
  "Consulting",
  "Other",
] as const;

export const TECH_SUGGESTIONS = [
  "React", "Next.js", "JavaScript", "TypeScript", "HTML", "CSS",
  "Tailwind CSS", "WordPress", "WooCommerce", "PHP", "Node.js",
  "Supabase", "PostgreSQL", "MySQL", "MongoDB", "Firebase",
  "Vercel", "Netlify", "AWS", "Figma", "Framer", "Webflow",
  "React Router", "Vite", "Express", "Python", "Django",
];
