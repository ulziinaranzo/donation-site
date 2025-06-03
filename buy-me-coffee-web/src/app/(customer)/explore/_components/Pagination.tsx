"use client";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type PaginationUserProps = {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalUsers: number;
  usersPerPage: number;
};

export const PaginationUsers = ({
  currentPage,
  totalUsers,
  usersPerPage,
  setCurrentPage,
}: PaginationUserProps) => {
  const totalPages = Math.ceil(totalUsers / usersPerPage);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => goToPage(currentPage - 1)}
            href="#"
          />
        </PaginationItem>
        {[...Array(totalPages)].map((_, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              href="#"
              isActive={currentPage === index + 1}
              onClick={() => goToPage(index + 1)}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext onClick={() => goToPage(currentPage + 1)} href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
