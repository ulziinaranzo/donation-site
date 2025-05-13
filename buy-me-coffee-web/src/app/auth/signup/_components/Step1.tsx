"use client";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller} from "react-hook-form"

const formSchema = z.object({
    email.z.string().min(6, {message: "6-с дээш тэмдэгттэй байх ёстой."}).email({message: "Имэйлээ зөв оруулна уу."}),
    password: z.string().min(6, {message: "6-с дээш тэмдэгттэй байх ёстой."}),
    confirmPassword: z.string().min(1, {message: "Нууц үг таарахгүй байна"}).refine((data) => data.password === data.confirmPassword, {
        message: "Нууц үг таарахгүй байна",
        path:["confirmPassword"]
    })
})
    type FormData = {
        email: string;
        password: string;
        confirmPassword: string;
    }
    type  Step1Props = {
        handlePrev: () => void;
        handleNext: () => void;
        data: FormData;
        saveFormDataChange: (newData: Partial<FormData>) => void
    }


export const Step1 = ({handleNext, handlePrev, data, saveFormDataChange}: Step1Props) => {
    const [showPassword, setShowPassword] = useState(false)
    const { control, handleSubmit, formState: {errors}} = useForm<FormData>({resolver: zodResolver(formSchema),
        defaultValues: {
            email: data.email;
            password: data.password
            confirmPassword: ""
        }
    })

        const onSubmit = (savingData: FormData) => {
        saveFormDataChange(savingData)
        handleNext()
    }
  return <></>;
};
