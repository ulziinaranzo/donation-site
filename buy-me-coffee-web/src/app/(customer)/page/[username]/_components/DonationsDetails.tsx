"use client";

import { useAuth, User } from "@/app/_components/AuthProvider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Donation } from "@/app/_components/AuthProvider";

type DonationDetailsTypes = {
  data: Donation[];
  anonymousUser: any;
  profileUser: User | null
};

export const DonationsDetails = ({ data, anonymousUser, profileUser }: DonationDetailsTypes) => {
  const { user } = useAuth();

  return (
    <>
      <Card className="shadow-sm">
        <CardHeader>Social Media</CardHeader>
        <CardContent>
          <a
            href={user?.profile?.socialMediaUrl || "#"}
            className="text-sm break-all hover:underline text-blue-600"
            target="_blank"
          >
            {user?.profile?.socialMediaUrl || "No link provided."}
          </a>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader>Recent Supporters</CardHeader>
        <CardContent className="space-y-4">
          {data.length === 0 ? (
            <div className="text-center py-4">
              <img src="/Images/177043.png" className="mx-auto w-16 h-16" />
              <p className="text-sm text-muted-foreground mt-2">
                Be the first one to support{" "}
                {user?.profile?.name || "this user"}.
              </p>
            </div>
          ) : (
            data.map((item, i) => {
              const senderProfile =
                item.sender?.profile || anonymousUser?.profile;

              return (
                <div key={item.id}>
                  <div className="flex justify-between items-start">
                    <div className="flex gap-3">
                      <Avatar>
                        <AvatarImage src={senderProfile?.avatarImage || "/Images/user-icon.png"} />
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
                      <p className="text-sm text-muted-foreground">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </p>
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
