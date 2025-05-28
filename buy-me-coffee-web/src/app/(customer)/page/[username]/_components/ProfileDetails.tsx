"use client";

import { Profile, useAuth, User } from "@/app/_components/AuthProvider";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { EditPageDialog } from "./EditPageDialog";

type ProfileDetailsProps = {
  user?: User;
};

export const ProfileDetails = ({ user }: ProfileDetailsProps) => {
  const name = user?.profile?.name || "Unnamed";
  const avatar = user?.profile?.avatarImage || "";
  const about = user?.profile?.about || "No description provided.";


  if (!user) {
    return <div>Хэрэглэгчийн мэдээлэл ачааллаж байна...</div>;
  }


  return (
    <Card className="shadow-sm">
      <div className="flex justify-between items-center px-6 pt-4">
        <div className="flex gap-3 items-center">
          <Avatar className="w-12 h-12 flex justify-center ">
            <AvatarImage src={user?.profile?.avatarImage} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="font-bold text-lg">{name}</div>
        </div>
        <EditPageDialog />
      </div>
      <CardHeader>About {name}</CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{about}</p>
      </CardContent>
    </Card>
  );
};
