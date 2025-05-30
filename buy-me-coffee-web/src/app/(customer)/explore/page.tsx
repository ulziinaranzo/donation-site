"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { api } from "@/axios";
import { useState, useEffect, useMemo } from "react";
import { toast } from "sonner";
import Link from "next/link";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  username: string;
  url: string;
  about: string;
  profile: {
    name: string;
    avatarImage: string;
  };
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const getUsers = async () => {
    setLoading(true);
    try {
      const response = await api.get("/user");
      setUsers(response.data.users);
    } catch (error) {
      console.error("Хэрэглэгчдийг харуулахад алдаа гарлаа", error);
      toast.error("Хэрэглэгчдийг харуулахад алдаа гарлаа");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      user.profile?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, users]);

  return (
    <div className="flex h-screen mt-[44px]">
      <main className="flex-1 p-[24px]">
        <div className="flex justify-center flex-col gap-[24px] mb-[50px] pl-[10%]">
          <div className="text-black font-[600] text-[20px]">
            Explore creators
          </div>

          <Popover open={!!searchQuery}>
            <PopoverTrigger asChild>
              <div className="relative w-full max-w-md">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Search className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  placeholder="Нэрээр хайх"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] max-h-[300px] overflow-y-auto">
              {filteredUsers.length === 0 ? (
                <p className="text-sm text-gray-500">Илэрц олдсонгүй</p>
              ) : (
                <div className="flex flex-col gap-2">
                  {filteredUsers.map((user) => (
                    <div
                      key={user.id}
                      onClick={() => {
                        setSearchQuery("");
                        router.push(`/page/${user.username}`);
                      }}
                      className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded cursor-pointer"
                    >
                      <Avatar className="w-6 h-6">
                        <AvatarImage
                          src={user.profile.avatarImage}
                          alt={user.profile.name}
                        />
                        <AvatarFallback>
                          {user.profile.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span>{user.profile.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </PopoverContent>
          </Popover>

          {users.map((item, index) => (
            <Card key={index} className="w-[909px] h-[224px] p-[24px]">
              <CardHeader className="flex justify-between items-start">
                <div className="flex justify-center items-center gap-[12px]">
                  <Avatar>
                    <AvatarImage
                      src={item?.profile?.avatarImage}
                      alt={item?.profile?.name || "avatar"}
                    />
                    <AvatarFallback>
                      {item?.profile?.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle>{item?.profile?.name}</CardTitle>
                </div>
                <Link href={`/page/${item.username}`}>
                  <Button
                    variant="ghost"
                    className="px-[16px] py-[12px] gap-[8px] bg-[#F4F4F5]"
                  >
                    View profile
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="flex mt-[12px] gap-[20px]">
                  <div className="flex flex-col gap-[8px]">
                    <div className="text-[16px] font-[600]">
                      About {item.profile?.name}
                    </div>
                    <div
                      className="w-[420px] text-[14px] font-[400] overflow-hidden text-ellipsis"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {item.about}
                    </div>
                  </div>
                  <div className="flex flex-col gap-[8px]">
                    <div className="text-[16px] font-[600]">
                      Social media URL
                    </div>
                    <a
                      href={item.url}
                      target="_blank"
                      className="text-[14px] font-[400] truncate"
                    >
                      {item.url}
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
