"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { User } from "@/app/_components/AuthProvider";

type Props = {
  user: User;
};

export const UsersCard = ({ user }: Props) => {
  return (
    <Card className="w-[909px] h-[224px] p-[24px]">
      <CardHeader className="flex justify-between items-start">
        <div className="flex justify-center items-center gap-[12px]">
          <Avatar>
            <AvatarImage
              src={user?.profile?.avatarImage}
              alt={user?.profile?.name || "avatar"}
            />
            <AvatarFallback>{user?.profile?.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <CardTitle>{user?.profile?.name}</CardTitle>
        </div>
        <Link href={`/page/${user.username}`}>
          <Button
            variant="ghost"
            className="px-[16px] py-[12px] gap-[8px] bg-[#F4F4F5] cursor-pointer"
          >
            View profile <ExternalLink />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="flex mt-[12px] gap-[20px]">
          <div className="flex flex-col gap-[8px]">
            <div className="text-[16px] font-[600]">
              About {user.profile?.name}
            </div>
            <div
              className="w-[420px] text-[14px] font-[400] overflow-hidden text-ellipsis"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
              }}
            >
              {user.profile?.about}
            </div>
          </div>
          <div className="flex flex-col gap-[8px] w-[200px]">
            <div className="text-[16px] font-[600]">Social media URL</div>
            <a
              href={user.profile?.socialMediaUrl}
              target="_blank"
              className="text-[14px] font-[400] truncate"
            >
              {user.profile?.socialMediaUrl}
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
