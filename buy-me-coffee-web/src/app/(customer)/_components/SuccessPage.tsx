"use client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export const SuccessPage = () => {
     return (
      <div className="flex mt-[32px]">
        <Card className="w-[650px]">
      <CardHeader>
        <CardTitle className="text-[16px] font-[700]">Амжилттай donate хийлээ</CardTitle>
        <CardDescription>Confirmation message</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Input id="description" placeholder="Бичмээр, хэлмээр байгаа зүйлээ бичээрэй!" className="h-[131px]"/>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter >
        <Button className="w-full">Хадгалах</Button>
      </CardFooter>
    </Card>
      </div>  
     )
}