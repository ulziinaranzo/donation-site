"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@radix-ui/react-separator";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Anchor } from "lucide-react";

const formSchema = z.object({
  username: z.string().min(1, "Username is required"),
  message: z.string().optional(),
  amount: z.number().min(1, "Amount must be at least $1"),
});

type CoffeeFormData = z.infer<typeof formSchema>;

export default function CoffeePage() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CoffeeFormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: CoffeeFormData) => {
    console.log("Submitted:", data);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <Card>
        <CardHeader className="text-2xl font-bold text-center">
          Buy Jake a Coffee
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-medium">About Jake</h3>
            <p className="text-sm text-muted-foreground">
              I'm a typical person who enjoys exploring different things. I also make music art as a hobby. Follow me along.
            </p>
          </div>

          <Separator />

          <div className="space-y-2">
            <Label>Social media URL:</Label>
            <a
              href="https://buymasacoffee.com/space/rcl4r4"
              className="text-sm text-blue-600 hover:underline"
              target="_blank"
            >
              https://buymasacoffee.com/space/rcl4r4
            </a>
          </div>

          <Separator />

          <div className="space-y-2">
            <h3 className="font-medium">Recent Supporters</h3>
            <p className="text-sm text-muted-foreground">
              Be the first one to support Jake
            </p>
          </div>

          <Separator />

          <div className="space-y-2">
            <Label>Select amount:</Label>
            <div className="flex gap-2 flex-wrap">
              {[1, 2, 3].map((amount) => (
                <Button
                  key={amount}
                  variant="outline"
                  className="flex-1 min-w-[80px]"
                >
                  ${amount}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Enter buymasacoffee.com/ or social account URL:</Label>
            <div className="flex items-center gap-1">
              <span className="text-sm text-muted-foreground">buymasacoffee.com/</span>
              <Input placeholder="your-username" />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Special message:</Label>
            <Textarea placeholder="Please write your message here." />
          </div>
        </CardContent>
      </Card>
      <Card className="shadow-sm">
        <CardHeader className="text-lg font-semibold pb-2">
          About Jake
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            I'm a typical person who enjoys exploring different things. I also make music art as a hobby. Follow me along.
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader className="text-lg font-semibold pb-2">
          Social Media
        </CardHeader>
        <CardContent>
          <Anchor
            href="https://buymeacoffee.com/spacerutz44"
            className="text-sm break-all hover:underline text-primary"
            target="_blank"
          >
            https://buymeacoffee.com/spacerutz44
          </Anchor>
        </CardContent>
      </Card>

      {/* Supporters Card */}
      <Card className="shadow-sm">
        <CardHeader className="text-lg font-semibold pb-2">
          Recent Supporters
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-2">
            Be the first one to support Jake
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
