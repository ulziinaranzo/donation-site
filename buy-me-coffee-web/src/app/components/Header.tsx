"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuth } from "../_components/AuthProvider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Header = () => {
  const { user, signOut } = useAuth();

  return (
    <div className="w-full h-[56px] flex bg-transparent px-4 md:px-20 py-4">
      <div className="flex justify-between w-full items-center">
        <div className="flex gap-2 items-center">
          <Image
            src="/Images/coffe.png"
            width={24}
            height={34}
            alt="Coffee Logo"
          />
          <span className="text-lg md:text-xl font-bold text-black">
            Buy Me Coffee
          </span>
        </div>

        <div className="flex gap-2 items-center">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-2 cursor-pointer">
                  <Avatar>
                    <AvatarImage
                      src={user?.profile?.avatarImage}
                      className="w-[40px] h-[40px] rounded-full object-cover"
                    />
                    <AvatarFallback>
                      {user?.username?.charAt(0) || "N"}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-black text-sm font-medium">
                    {user?.username}
                  </span>
                </div>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => signOut()}
                  className="cursor-pointer"
                >
                  Гарах
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link href="/auth/signin">
                <button className="bg-black text-white rounded-full px-4 py-2 text-sm h-10 cursor-pointer">
                  Нэвтрэх
                </button>
              </Link>
              <Link href="/auth/signup">
                <button className="bg-black text-white rounded-full px-4 py-2 text-sm h-10 cursor-pointer">
                  Бүртгүүлэх
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
