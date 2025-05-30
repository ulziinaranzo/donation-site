"use client"
import { CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type TimeFiltersPropsType = {
    timeFilter: string,
    setTimeFilter: (value: string) => void
}

export const TimeFilters = ({timeFilter, setTimeFilter}: TimeFiltersPropsType) => {
    return (
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
    )
}