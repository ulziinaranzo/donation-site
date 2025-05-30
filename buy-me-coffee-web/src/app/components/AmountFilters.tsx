" use client"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const AmountFilters = ({setAmountFilter}: {setAmountFilter: (value:string) => void}) => {
    return (
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
    )
}