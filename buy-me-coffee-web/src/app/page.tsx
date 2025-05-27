"use client";

import { Home, Settings, User, Compass, Sidebar } from "lucide-react";
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
    if (loading) return;
    if (!user) {
      router.push("/auth/signup");
    } else {
      router.push("/");
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Loading...</div>;
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
