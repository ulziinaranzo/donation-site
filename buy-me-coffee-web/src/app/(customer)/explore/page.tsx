"use client";
import { api } from "@/axios";
import { useState, useEffect, useMemo } from "react";
import { toast } from "sonner";
import { User } from "@/app/_components/AuthProvider";
import { UsersCard } from "./_components/UsersCard";
import { SearchPopOver } from "./_components/SearchPopover";
import { PaginationUsers } from "./_components/Pagination";

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1)
  const usersPerPage = 10
  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage;

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

  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div className="flex h-screen mt-[44px]">
      <main className="flex-1 p-[24px]">
        <div className="flex justify-center flex-col gap-[24px] mb-[50px] pl-[10%]">
          <div className="text-black font-[600] text-[25px]">
            Explore creators
          </div>

          <SearchPopOver
            searchQuery={searchQuery}
            filteredUsers={filteredUsers}
            setSearchQuery={setSearchQuery}
          />

          {currentUsers.map((user) => (
            <UsersCard user={user} key={user.id} />
          ))}
          <div className="flex w-full justify-end">
              <PaginationUsers
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalUsers={filteredUsers.length}
                usersPerPage={usersPerPage}
              />
          </div>
        </div>
      </main>
    </div>
  );
}
