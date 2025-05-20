"use client";

import { Home, Settings, User, Compass } from "lucide-react";

export default function DashboardLayout({
    children,
} : {
    children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen mt-[44px]">
      <aside className="w-[331px] bg-white p-4 pl-[80px]">
        <nav className="flex flex-col space-y-2">
          <a
            href="/dashboard"
            className="flex w-[250px] h-[40px] items-center space-x-2 text-sm font-medium text-gray-700 hover:text-black hover:bg-gray-200 rounded-lg pl-[10px]"
          >
            <Home className="w-4 h-4" />
            <span>Нүүр хуудас</span>
          </a>
          <a
            href="/dashboard/explore"
            className="flex w-[250px] h-[40px] items-center space-x-2 text-sm font-medium text-gray-700 hover:text-black hover:bg-gray-200 rounded-lg pl-[10px]"
          >
            <Compass className="w-4 h-4" />
            <span>Explore</span>
          </a>
          <a
            // href={`/dashboard/user/${user._id}`} 
            className="flex w-[250px] h-[40px] items-center space-x-2 text-sm font-medium text-gray-700 hover:text-black hover:bg-gray-200 rounded-lg pl-[10px]"
          >
            <User className="w-4 h-4" />
            <span>Хуудас</span>
          </a>
          <a
            href="/dashboard/settings"
            className="flex w-[250px] h-[40px] items-center space-x-2 text-sm font-medium text-gray-700 hover:text-black hover:bg-gray-200 rounded-lg pl-[10px]"
          >
            <Settings className="w-4 h-4" />
            <span>Профайл засах</span>
          </a>
        </nav>
      </aside>

      <main className="flex-1 p-[24px]">
        {children}
      </main>
    </div>
  );
}
