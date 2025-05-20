"use client";

import { Home, Settings, User, Compass, Sidebar } from "lucide-react";
import DonationsPage from "./components/HomePage";
import { SidebarLeft } from "./components/Sidebar";

export default function MyPageWithSidebar() {
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
  };
  return (
    <div className="flex h-screen mt-[44px]">
      <SidebarLeft />

      <main className="flex-1 p-[24px]">
        <DonationsPage />
      </main>
    </div>
  );
}
