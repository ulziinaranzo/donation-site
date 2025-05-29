"use client";

import { Home, Settings, User, Compass, Sidebar, Loader2 } from "lucide-react";
import DonationsPage from "./components/HomePage";
import { SidebarLeft } from "./components/Sidebar";
import { useAuth } from "./_components/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MyPageWithSidebar() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

useEffect(() => {

  if (!user) {
    router.push("/auth/signup");
  } else {
    setLoading(false)
  }
}, [user, loading]);

  if (loading || user === undefined) {
    return <div className="flex items-center justify-center h-screen"><Loader2 className="w-15 h-15 animate-spin text-gray-600"/></div>;
  }

  return (
    <div className="flex h-screen mt-[44px]">
      <SidebarLeft />
      <main className="flex-1 p-[24px]">
        <DonationsPage />
      </main>
    </div>
  );
}
