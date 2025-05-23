"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuth } from "../_components/AuthProvider";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { AvatarFallback } from "@/components/ui/avatar";

export const Header = () => {
  const { signIn, user } = useAuth();

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
            <>
              <Avatar>
                <AvatarImage
                  src={
                    user?.profile?.avatarImage ||
                    "https://github.com/shadcn.png"
                  }
                  className="w-[40px] h-[40px] rounded-full"
                />
                <AvatarFallback>KK</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium text-black">
                {user?.name}
              </span>
            </>
          ) : (
            <>
              <Link href="/auth/signin">
                <button className="bg-black text-white rounded-full px-4 py-2 text-sm h-10">
                  Нэвтрэх
                </button>
              </Link>
              <Link href="/auth/signup">
                <button className="bg-black text-white rounded-full px-4 py-2 text-sm h-10">
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
