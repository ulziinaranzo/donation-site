"use client";
import { User } from "@/app/_components/AuthProvider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
type SearchPopoverProps = {
  setSearchQuery: Dispatch<SetStateAction<string>>;
  filteredUsers: User[];
  searchQuery: string;
};
export const SearchPopOver = ({
  setSearchQuery,
  filteredUsers,
  searchQuery,
}: SearchPopoverProps) => {
  const router = useRouter();
  return (
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
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] max-h-[300px] overflow-y-auto">
        {filteredUsers.length === 0 ? (
          <p className="text-sm text-gray-500">Илэрц олдсонгүй</p>
        ) : (
          <div className="flex flex-col gap-2 ">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                onClick={() => {
                  setSearchQuery("");
                  router.push(`/page/${user.username}`);
                }}
                className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded cursor-pointer"
              >
                <Avatar className="w-15 h-15">
                  <AvatarImage
                    src={user.profile?.avatarImage}
                    className="object-cover"
                    alt={user.profile?.name}
                  />
                  <AvatarFallback>
                    {user.profile?.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1">
                  <span className="text-[20px] font-semibold">
                    {user?.username}
                  </span>
                  <span className="text-[16px]">{user.profile?.name}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};
