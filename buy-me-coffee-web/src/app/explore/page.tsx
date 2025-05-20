"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { SidebarLeft } from "../components/Sidebar";

const datas = [
  {
    name: "Space Ranger",
    about:
      "All day, every day, we're watching, listening to, reading and absorbing politics. It's exhausting. We then report on what we've seen in a way that's as chill as possible. None of the sensationalism and division you'll find elsewhere. It's about clarity, focus, approachability, and having a little wry smile almost all the time.",
    url: "https://buymeacoffee.com/baconpancakes1",
  },
  {
    name: "Space Ranger",
    about:
      "All day, every day, we're watching, listening to, reading and absorbing politics. It's exhausting. We then report on what we've seen in a way that's as chill as possible. None of the sensationalism and division you'll find elsewhere. It's about clarity, focus, approachability, and having a little wry smile almost all the time.",
    url: "https://buymeacoffee.com/baconpancakes1",
  },
  {
    name: "Space Ranger",
    about:
      "All day, every day, we're watching, listening to, reading and absorbing politics. It's exhausting. We then report on what we've seen in a way that's as chill as possible. None of the sensationalism and division you'll find elsewhere. It's about clarity, focus, approachability, and having a little wry smile almost all the time.",
    url: "https://buymeacoffee.com/baconpancakes1",
  },
  {
    name: "Space Ranger",
    about:
      "All day, every day, we're watching, listening to, reading and absorbing politics. It's exhausting. We then report on what we've seen in a way that's as chill as possible. None of the sensationalism and division you'll find elsewhere. It's about clarity, focus, approachability, and having a little wry smile almost all the time.",
    url: "https://buymeacoffee.com/baconpancakes1",
  },
];

export default function Home() {
  return (
    <div className="flex h-screen mt-[44px]">
      <SidebarLeft />

      <main className="flex-1  p-[24px]">
        <div className="flex justify-center flex-col gap-[24px] mb-[50px] pl-[10%]">
          <div className="text-black font-[600] text-[20px]">
            Explore creators
          </div>
          <div className="relative w-full max-w-md ">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Нэрээр хайх"
              className="pl-10 pr-4 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 "
            />
          </div>

          {datas.map((item, index) => {
            return (
              <Card key={index} className="w-[909px] h-[224px] p-[24px]">
                <CardHeader className="flex justify-between items-start">
                  <div className="flex justify-center items-center gap-[12px]">
                    <Avatar>
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>

                    <CardTitle>{item.name}</CardTitle>
                  </div>
                  <Button
                    variant="ghost"
                    onClick={() => window.open(item.url, "_blank")}
                    className="px-[16px] py-[12px] gap-[8px] bg-[#F4F4F5] "
                  >
                    View profile
                    <Link />
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="flex mt-[12px] gap-[20px]">
                    <div className="flex flex-col gap-[8px]">
                      <div className="text-[16px] font-[600]">
                        About {item.name}
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
            );
          })}
        </div>
      </main>
    </div>
  );
}
