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
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/app/_components/AuthProvider"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { api } from "@/axios"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

const successMessageSchema = z.object({
successMessage: z.string().min(1, "6-с дээш тэмдэгт, үсэг байх ёстой")})

type successMessageFormData = z.infer<typeof successMessageSchema>


export const SuccessPage = () => {
  const { user } = useAuth()
  const [loading, setLoading] = useState<boolean>(false) 
  const { register, handleSubmit, formState: {errors, isValid}} = useForm<successMessageFormData>({
    resolver: zodResolver(successMessageSchema),
    mode: "onChange",
    defaultValues: {
      successMessage: user?.profile?.successMessage || ""
    }
  })

  const onSubmit = async (data: successMessageFormData) => {
    try {
      setLoading(true)
      await api.put(`/profile/${user?.id}`,
        {
          ...data
        }
      )
      toast.success("Амжилттай хадгалагдлаа")
    } catch (error) {
      toast.error("Success message нэмэхэд алдаа гарлаа")
      console.error("Success message нэмэхэд алдаа гарлаа", error)
    } finally {
      setLoading(false)
    }
  }

     return (
      <div className="flex mt-[32px]">
        <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="w-[650px]">
      <CardHeader>
        <CardTitle className="text-[16px] font-[700]">Амжилттай donate хийх үед гарах мессеж</CardTitle>
        <CardDescription>Confirmation message</CardDescription>
      </CardHeader>
      <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Input id="description" placeholder="Бичмээр, хэлмээр байгаа зүйлээ бичээрэй!" className="h-[131px]" {...register("successMessage")}/>
              {errors.successMessage && <p className="text-sm text-red-500">{errors.successMessage.message}</p>}
            </div>
          </div>

      </CardContent>
      <CardFooter>
  <Button className="w-full bg-black text-white" disabled={loading}>
    {loading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
    {loading ? "Түр хүлээнэ үү..." : "Хадгалах"}
  </Button>
</CardFooter>
    </Card>
            </form>
      </div>  
     )
}