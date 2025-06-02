"use client"

import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { toast } from "sonner";
import { User } from "../_components/AuthProvider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const UserInfo = ({user}: {user: User}) => {
  const handleShare = () => {
    if (!user?.username) {
      toast.error("Хэрэглэгчийн нэр олдсонгүй");
      return;
    }

    const pageUrl = `${window.location.origin}/page/${user.username}`;
    navigator.clipboard.writeText(pageUrl);
    toast.success("Хуудасны линк клипбоардад хууллаа");
  };

    return (
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage
                src={user?.profile?.avatarImage || ""}
                className="w-[48px] h-[48px] rounded-full"
              />
              <AvatarFallback className="w-[50px] h-[50px]">
                {user?.profile?.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-[16px] font-[700]">{user?.profile?.name}</h2>
              <p className="text-[14px] font-[400] text-muted-foreground">
                {user?.profile?.socialMediaUrl}
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            className="gap-2 bg-black text-white font-[500] text-[14px] px-[16px] py-[12px] rounded-lg"
            onClick={handleShare}
          >
            Share page link <ArrowUpRight size={16} />
          </Button>
        </div>
    )
}