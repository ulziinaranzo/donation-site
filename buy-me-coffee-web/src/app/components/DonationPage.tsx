"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ArrowUpRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const transactions = [
  {
    name: "Guest",
    avatar: "CN",
    profile: "instagram.com/weedlesy",
    message:
      "Thank you for being so awesome everyday! You always manage to brighten up my day when I'm feeling down. Although $1 isn't that much money it's all I can contribute at the moment",
    amount: 1,
    time: "10 hours ago",
  },
  {
    name: "John Doe",
    avatar: "JD",
    profile: "buymeacoffee.com/bdsads",
    message: "Thank you for being so awesome everyday!",
    amount: 10,
    time: "10 hours ago",
  },
  {
    name: "Radicals",
    avatar: "CN",
    profile: "buymeacoffee.com/ajkgrow",
    message: "",
    amount: 2,
    time: "10 hours ago",
  },
  {
    name: "Guest",
    avatar: "CN",
    profile: "facebook.com/pierakepeb",
    message: "",
    amount: 5,
    time: "10 hours ago",
  },
  {
    name: "Fan1",
    avatar: "F1",
    profile: "buymeacoffee.com/supporterone",
    message:
      "Thank you for being so awesome everyday! You always manage to brighten up my day when I'm feeling down. Although $1 isn't that much money it's all I can contribute at the moment. When I become successful I will be sure to buy you...",
    amount: 10,
    time: "10 hours ago",
  },
];

export default function DonationsPage() {
  return (
    <div className="w-full mx-auto p-10 space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src="https://via.placeholder.com/40" />
              <AvatarFallback>J</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-[16px] font-[700]">Jake</h2>
              <p className="text-[14px] font-[400] text-muted-foreground">
                buymeacoffee.com/baconpancakes1
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            className="gap-2 bg-black text-white font-[500] text-[14px] px-[16px] py-[12px] rounded-lg"
          >
            Share page link <ArrowUpRight size={16} />
          </Button>
        </div>
        <Separator className="my-4" />

        <div className="flex items-center gap-[20px]">
          <CardTitle className="text-[600] text-[20px]">Орлого</CardTitle>
          <Select defaultValue="30days">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a range" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="30days">Сүүлийн 30 хоног</SelectItem>
                <SelectItem value="7days">Сүүлийн 7 хоног</SelectItem>
                <SelectItem value="all">All time</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <p className="text-3xl font-bold mt-4">$450</p>
      </Card>

      <Card className="p-6">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Recent Transactions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-96 pr-4">
            <div className="space-y-6">
              {transactions.map((tx, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-3">
                      <Avatar>
                        <AvatarFallback>{tx.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{tx.name}</p>
                        <a
                          href={`https://${tx.profile}`}
                          className="text-sm text-blue-500 hover:underline"
                          target="_blank"
                          rel="noreferrer"
                        >
                          {tx.profile}
                        </a>
                        {tx.message && (
                          <p className="text-sm mt-1 text-muted-foreground">
                            {tx.message.length > 100
                              ? `${tx.message.slice(0, 100)}...`
                              : tx.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">+ ${tx.amount}</p>
                      <p className="text-sm text-muted-foreground">{tx.time}</p>
                    </div>
                  </div>
                  {i < transactions.length - 1 && <Separator />}
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
