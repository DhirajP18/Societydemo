"use client";

import { usePathname } from "next/navigation";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/ui/appsidebar";
import Header from "@/components/ui/sidebartoggle";

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <SidebarProvider>
      {/* ROOT */}
      <div className="flex h-screen w-full overflow-hidden">

        {/* SIDEBAR */}
        <AppSidebar />

        {/* RIGHT SIDE */}
        <div className="flex flex-col flex-1 overflow-hidden">

          {/* FIXED HEADER */}
          <div className="sticky top-0 z-50 bg-background border-b">
            <Header />
          </div>

          {/* SCROLLABLE CONTENT */}
          <main className="flex-1 overflow-y-auto p-6 bg-muted/40">
            {children}
          </main>

        </div>
      </div>
    </SidebarProvider>
  );
}
