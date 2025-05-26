// app/layout.tsx эсвэл app/dashboard/layout.tsx
"use client";

import { Compass, Home, Settings, User } from "lucide-react";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen mt-[44px]">
      <aside className="w-[331px] bg-white p-4 pl-[80px]">
        <nav className="flex flex-col space-y-2">
          <a
            href="/"
            className="flex w-[250px] h-[40px] items-center space-x-2 text-sm font-medium text-gray-700 hover:text-black hover:bg-gray-200 rounded-lg pl-[10px]"
          >
            <Home className="w-4 h-4" />
            <span>Нүүр хуудас</span>
          </a>
          <a
            href="/explore"
            className="flex w-[250px] h-[40px] items-center space-x-2 text-sm font-medium text-gray-700 hover:text-black hover:bg-gray-200 rounded-lg pl-[10px]"
          >
            <Compass className="w-4 h-4" />
            <span>Explore</span>
          </a>
          <a
            href="/page"
            className="flex w-[250px] h-[40px] items-center space-x-2 text-sm font-medium text-gray-700 hover:text-black hover:bg-gray-200 rounded-lg pl-[10px]"
          >
            <User className="w-4 h-4" />
            <span>Профайл</span>
          </a>
          <a
            href="/settings"
            className="flex w-[250px] h-[40px] items-center space-x-2 text-sm font-medium text-gray-700 hover:text-black hover:bg-gray-200 rounded-lg pl-[10px]"
          >
            <Settings className="w-4 h-4" />
            <span>Профайл засах</span>
          </a>
        </nav>
      </aside>

      <main className="flex-1 bg-white">{children}</main>
    </div>
  );
}
