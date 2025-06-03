"use client";
import { useEffect, useState } from "react";
import { api } from "@/axios";
import { toast } from "sonner";
import { Donation, useAuth } from "../_components/AuthProvider";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { UserInfo } from "./UserInfo";
import { TimeFilters } from "./TimeFilters";
import { AmountFilters } from "./AmountFilters";
import { DonationList } from "./DonationList";

export default function HomePage() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [timeFilter, setTimeFilter] = useState("all");
  const [amountFilter, setAmountFilter] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const getDonations = async () => {
      try {
        const response = await api.get(`/donation/received/${user.username}`);
        setDonations(response.data.donations || []);
      } catch (error) {
        console.error("Donation-ийг авахад алдаа гарлаа", error);
        toast.error("Donation-ийг авахад алдаа гарлаа");
      }
    };

    getDonations();
  }, [user]);

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
        {user && <UserInfo user={user} />}
        <Separator />
        <TimeFilters setTimeFilter={setTimeFilter} timeFilter={timeFilter} />
        <p className="text-3xl font-bold mt-4">${totalAmount}</p>
      </Card>
      <AmountFilters setAmountFilter={setAmountFilter} />
      <DonationList donations={filteredDonations} />
    </div>
  );
}
