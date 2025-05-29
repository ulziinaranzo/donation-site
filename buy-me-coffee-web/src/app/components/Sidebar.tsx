" use client";

import { Compass, Home, Settings, User } from "lucide-react";
import { useAuth } from "../_components/AuthProvider";
import Link from "next/link";

export const SidebarLeft = () => {
  const { user } = useAuth();
  return (
    <aside className="w-[331px] bg-white p-4 pl-[80px]">
      <nav className="flex flex-col space-y-2">
        <Link
          href="/"
          className="flex w-[250px] h-[40px] items-center space-x-2 text-sm font-medium text-gray-700 hover:text-black hover:bg-gray-200 rounded-lg pl-[10px]"
        >
          <Compass className="w-4 h-4" />
          <span>Нүүр хуудас</span>
        </Link>
        <Link
           href={`/page/${user?.username}`}
          className="flex w-[250px] h-[40px] items-center space-x-2 text-sm font-medium text-gray-700 hover:text-black hover:bg-gray-200 rounded-lg pl-[10px]"
        >
          <User className="w-4 h-4" />
          <span>Профайл</span>
        </Link>
        <Link
          href="/explore"
          className="flex w-[250px] h-[40px] items-center space-x-2 text-sm font-medium text-gray-700 hover:text-black hover:bg-gray-200 rounded-lg pl-[10px]"
        >
          <Compass className="w-4 h-4" />
          <span>Explore</span>
        </Link>
        <Link
          href="/settings"
          className="flex w-[250px] h-[40px] items-center space-x-2 text-sm font-medium text-gray-700 hover:text-black hover:bg-gray-200 rounded-lg pl-[10px]"
        >
          <Settings className="w-4 h-4" />
          <span>Профайл засах</span>
        </Link>
      </nav>
    </aside>
  );
};
