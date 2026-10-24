export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
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
          status: "draft" | "published";
          featured: boolean;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          short_description: string;
          full_description?: string | null;
          category: string;
          client?: string | null;
          completion_date?: string | null;
          technologies?: string[];
          featured_image?: string | null;
          gallery_images?: string[];
          live_url?: string | null;
          github_url?: string | null;
          status?: "draft" | "published";
          featured?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          short_description?: string;
          full_description?: string | null;
          category?: string;
          client?: string | null;
          completion_date?: string | null;
          technologies?: string[];
          featured_image?: string | null;
          gallery_images?: string[];
          live_url?: string | null;
          github_url?: string | null;
          status?: "draft" | "published";
          featured?: boolean;
          sort_order?: number;
          updated_at?: string;
        };
      };
      admin_users: {
        Row: {
          id: string;
          user_id: string;
          email: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          email: string;
          created_at?: string;
        };
        Update: {
          email?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: {
      is_admin: {
        Args: Record<string, never>;
        Returns: boolean;
      };
    };
    Enums: Record<string, never>;
  };
}
