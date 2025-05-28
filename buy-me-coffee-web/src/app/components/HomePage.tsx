"use client";
import { useEffect, useState } from "react";
import { api } from "@/axios";
import { toast } from "sonner";
import { ArrowUpRight } from "lucide-react";
import { Donation, useAuth } from "../_components/AuthProvider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function HomePage() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(false);
  const [timeFilter, setTimeFilter] = useState("30days");
  const [amountFilter, setAmountFilter] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    getDonations();
  }, [user]);

  const getDonations = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/donation/received/${user?.username}`);
      setDonations(response.data.donations || []);
      console.log(response.data.donations);
    } catch (error) {
      console.error("Donation-ийг авахад алдаа гарлаа", error);
      toast.error("Donation-ийг авахад алдаа гарлаа");
    } finally {
      setLoading(false);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Линк клипбоардад хууллаа");
  };

  const filteredDonations = donations
    .filter((d) => {
      if (timeFilter === "7days") {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        return new Date(d.createdAt) >= sevenDaysAgo;
      } else if (timeFilter === "30days") {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return new Date(d.createdAt) >= thirtyDaysAgo;
      }
      return true;
    })
    .filter((d) => {
      if (!amountFilter || amountFilter === "all") return true;
      return d.amount === parseInt(amountFilter);
    });

  const totalAmount = filteredDonations.reduce(
    (acc, curr) => acc + curr.amount,
    0
  );

  return (
    <div className="w-full mx-auto p-10 space-y-6">
      <Card className="p-6">
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
        <Separator  />
        <div className="flex flex-wrap gap-4 items-center">
          <CardTitle className="text-[600] text-[20px]">Орлого</CardTitle>

          <Select defaultValue="30days" onValueChange={setTimeFilter}>
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
        <p className="text-3xl font-bold mt-4">${totalAmount}</p>
      </Card>

      <div className="flex justify-between items-center">
        <div className="text-lg font-semibold">Recent Transactions</div>
        <Select defaultValue="" onValueChange={setAmountFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by amount" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">Бүгд</SelectItem>
              <SelectItem value="1">$1</SelectItem>
              <SelectItem value="2">$2</SelectItem>
              <SelectItem value="5">$5</SelectItem>
              <SelectItem value="10">$10</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <Card className="p-6">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Recent Transactions
          </CardTitle>
        </CardHeader>
        <CardContent className="w-full">
          <ScrollArea className="h-96 w-full p-2">
            <div className="space-y-6 w-full">
              {filteredDonations.length === 0 && (
                <p className="text-muted-foreground text-sm">
                  Донэйшн олдсонгүй.
                </p>
              )}
              {filteredDonations.map((tx, i) => (
                <div key={tx.id} className="space-y-2">
                  <div className="flex justify-between items-start w-full">
                    <div className="flex gap-3">
                      <Avatar>
                        <AvatarImage
                          src={tx.recipient.profile.avatarImage || ""}
                          className="w-[40px] h-[40px]"
                        />
                        <AvatarFallback className="w-[40px] h-[40px]">
                          {tx.recipient.profile.name?.charAt(0) || "R"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">
                          {tx.recipient.profile.name}
                        </p>
                        <a
                          href={`https://${tx.recipient.profile.socialMediaUrl}`}
                          className="text-sm text-blue-500 hover:underline"
                          target="_blank"
                          rel="noreferrer"
                        >
                          {tx.recipient.profile.socialMediaUrl}
                        </a>
                        {tx.specialMessage && (
                          <p className="text-sm mt-1 text-muted-foreground">
                            {tx.specialMessage.length > 100
                              ? `${tx.specialMessage.slice(0, 100)}...`
                              : tx.specialMessage}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">+ ${tx.amount}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(tx.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  {i < filteredDonations.length - 1 && <Separator />}
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
