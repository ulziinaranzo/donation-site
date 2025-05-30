"use client";

import { AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Donation } from "../_components/AuthProvider";
import { ScrollArea } from "@/components/ui/scroll-area";

type DonationListProps = {
  donations: Donation[];
};

export const DonationList = ({ donations }: DonationListProps) => {
  return (
    <Card className="p-6">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Recent Transactions
        </CardTitle>
      </CardHeader>
      <CardContent className="w-full">
        <ScrollArea className="h-96 w-full p-2">
          <div className="space-y-6 w-full">
            {donations.length === 0 && (
              <p className="text-muted-foreground text-sm">
                Донэйшн олдсонгүй.
              </p>
            )}
            {donations.map((item, i) => {
              const isAnonymous = !item.sender || item.sender.isAnonymous;
              const senderProfile = item.sender?.profile;
              const name = isAnonymous
                ? "Anonymous"
                : senderProfile?.name || "Unknown";
              const avatar = isAnonymous
                ? "/Images/user-icon.jpg"
                : senderProfile?.avatarImage || "/Images/user-icon.jpg";
              const socialUrl = isAnonymous
                ? "anonymous@guest.com"
                : senderProfile?.socialMediaUrl;

              return (
                <div key={item.id} className="space-y-2">
                  <div className="flex justify-between items-start w-full">
                    <div className="flex gap-3">
                      <Avatar>
                        <AvatarImage
                          src={avatar}
                          className="w-[40px] h-[40px] rounded-full object-cover"
                        />
                        <AvatarFallback className="w-[40px] h-[40px]">
                          {name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{name}</p>
                        {socialUrl && (
                          <a
                            href={
                              socialUrl.startsWith("http")
                                ? socialUrl
                                : `https://${socialUrl}`
                            }
                            className="text-sm text-blue-500 hover:underline"
                            target="_blank"
                            rel="noreferrer"
                          >
                            {socialUrl}
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
                  {i < donations.length - 1 && <Separator />}
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
