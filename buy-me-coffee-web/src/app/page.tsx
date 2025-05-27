"use client";

import { Home, Settings, User, Compass, Sidebar } from "lucide-react";
import DonationsPage from "./components/HomePage";
import { SidebarLeft } from "./components/Sidebar";
import { useAuth } from "./_components/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function MyPageWithSidebar() {
const { user } = useAuth()
const router = useRouter()
useEffect(() => {
  if (user == null) return;
  if(user) {
    router.push("/")
  } else{
    router.push("/auth/signup")
  } 
  
  } 
,[user, router])

  return (
    <div className="flex h-screen mt-[44px]">
      <SidebarLeft/>
      <main className="flex-1 p-[24px]">
        <DonationsPage />
      </main>
    </div>
  );
}
