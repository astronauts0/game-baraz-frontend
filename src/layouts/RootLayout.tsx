import { Outlet, useLocation, ScrollRestoration } from "react-router-dom";
import Navbar from "../components/global/Navbar";
import DashboardNavbar from "../components/global/DashboardNavbar";
import Footer from "../components/global/Footer";
// import FloatingNotification from "../components/FloatingNotification";
import { AppSidebar } from "@/components/global/AppSidebar";

const RootLayout = () => {
  const location = useLocation();

  const isDashboard = location.pathname.startsWith("/dashboard");

  // Determine if Navbar/Footer should be hidden based on path
  const hideNavbarPaths = [
    "/signup",
    "/login",
    "/create-escrow",
    "/forgot-password",
    "/reset-password",
  ];
  const hideFooterPaths = [
    "/listing",
    "/escrow",
    "/signup",
    "/login",
    "/forgot-password",
    "/reset-password",
    "/create-escrow",
    "/details",
  ];

  const showNavbar = !hideNavbarPaths.includes(location.pathname);
  // Custom logic for footer: don't show on details/escrow pages which have dynamic IDs
  const showFooter = !hideFooterPaths.some((path) =>
    location.pathname.startsWith(path),
  );

  return (
    <div className="relative flex min-h-screen w-full bg-page-bg">
      <main className="flex-1 min-h-screen text-slate-900 flex flex-col">
        {showNavbar && (isDashboard ? <DashboardNavbar /> : <Navbar />)}
        <div className="flex-1">
          <Outlet />
        </div>
        {showFooter && <Footer />}
      </main>
      <AppSidebar />
      {/* <FloatingNotification /> */}
      <ScrollRestoration />
    </div>
  );
};

export default RootLayout;
