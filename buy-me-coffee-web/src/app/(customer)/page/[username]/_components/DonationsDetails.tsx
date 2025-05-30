"use client";

import { User, Donation } from "@/app/_components/AuthProvider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type DonationsDetailsProps = {
  data: Donation[];
  profileUser: User;
};

export const DonationsDetails = ({
  data,
  profileUser,
}: DonationsDetailsProps) => {

  return (
    <>
      <Card className="shadow-sm">
        <CardHeader>Social Media</CardHeader>
        <CardContent>
          <a
            href={profileUser?.profile?.socialMediaUrl || "#"}
            className="text-sm break-all hover:underline text-blue-600"
            target="_blank"
          >
            {profileUser?.profile?.socialMediaUrl || "No link provided."}
          </a>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader>Recent Supporters</CardHeader>
        <CardContent className="space-y-4 max-h-[400px] overflow-y-auto pr-5">
          {data.length === 0 ? (
            <div className="text-center py-4">
              <img src="/Images/177043.png" className="mx-auto w-16 h-16" />
              <p className="text-sm text-muted-foreground mt-2">
                Be the first one to support {profileUser?.profile?.name || "this user"}.
              </p>
            </div>
          ) : (
            data.map((item, i) => {
              const senderProfile = item.sender?.profile;

              return (
                <div key={item.id}>
                  <div className="flex justify-between items-start">
                    <div className="flex gap-3">
                      <Avatar>
                        <AvatarImage src={senderProfile?.avatarImage} />
                        <AvatarFallback>
                          {senderProfile?.name?.charAt(0) || "A"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">
                          {senderProfile?.name || "Anonymous"}
                        </p>
                        {senderProfile?.socialMediaUrl && (
                          <a
                            href={`https://${senderProfile.socialMediaUrl}`}
                            className="text-sm text-blue-500 hover:underline"
                            target="_blank"
                          >
                            {senderProfile.socialMediaUrl}
                          </a>
                        )}
                        {item.specialMessage && (
                          <p className="text-sm mt-1 text-muted-foreground">
                            {item.specialMessage.length > 100
                              ? `${item.specialMessage.slice(0, 100)}...`
                              : item.specialMessage}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">+ ${item.amount}</p>
                    </div>
                  </div>
                  {i < data.length - 1 && <Separator />}
                </div>
              );
            })
          )}
        </CardContent>
      </Card>
    </>
  );
};
