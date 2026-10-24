import { createBrowserRouter, Outlet } from "react-router";
import { RootLayout } from "./components/RootLayout";
import { Home } from "./components/Home";
import { About } from "./components/About";
import { Services } from "./components/Services";
import { Portfolio } from "./components/Portfolio";
import { Testimonials } from "./components/Testimonials";
import { Contact } from "./components/Contact";
import { ProjectDetail } from "./components/ProjectDetail";
import { Experience } from "./components/Experience";
import { Resume } from "./components/Resume";
import { AuthProvider } from "./components/admin/AuthContext";
import { ProtectedRoute } from "./components/admin/ProtectedRoute";
import { AdminLayout } from "./components/admin/AdminLayout";
import { AdminLogin } from "./components/admin/AdminLogin";
import { AdminDashboard } from "./components/admin/AdminDashboard";
import { ProjectList } from "./components/admin/ProjectList";
import { ProjectForm } from "./components/admin/ProjectForm";

function AdminShell() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}

function ProtectedAdminLayout() {
  return (
    <ProtectedRoute>
      <AdminLayout />
    </ProtectedRoute>
  );
}

export const router = createBrowserRouter([
  // ── Public portfolio routes ──────────────────────────────────────────────
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "experience", Component: Experience },
      { path: "services", Component: Services },
      { path: "portfolio", Component: Portfolio },
      { path: "portfolio/:slug", Component: ProjectDetail },
      { path: "projects", Component: Portfolio },
      { path: "projects/:slug", Component: ProjectDetail },
      { path: "resume", Component: Resume },
      { path: "testimonials", Component: Testimonials },
      { path: "contact", Component: Contact },
      { path: "*", Component: Home },
    ],
  },

  // ── Admin CMS routes (wrapped in AuthProvider via AdminShell) ────────────
  {
    path: "/admin",
    Component: AdminShell,
    children: [
      {
        path: "login",
        Component: AdminLogin,
      },
      {
        Component: ProtectedAdminLayout,
        children: [
          { index: true, Component: AdminDashboard },
          { path: "projects", Component: ProjectList },
          { path: "projects/new", Component: ProjectForm },
          { path: "projects/edit/:id", Component: ProjectForm },
        ],
      },
    ],
  },
]);
