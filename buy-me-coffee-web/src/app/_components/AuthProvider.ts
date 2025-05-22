"use client"

import { api } from "@/axios"
import { useRouter } from "next/navigation"
import { useEffect, useState, createContext, useContext } from "react"
import { toast } from "sonner"



type PropsWithChildren = {
    children: React.ReactNode
}

export type Profile = {
    name: string,
    about: string,
    avatarImage: string,
    socialMediaUrl: string,
    successMessage: string,
}

export type BankCard = {
    country: string,
    firstName: string,
    lastName: string,
    cardNumber: string,
    expiryDate: Date,
}

export type Donation = {
    amount: number,
    specialMessage: string,
}

export type User = {
    name: string,
    email: string,
    password: string,
    profile: Profile,
    bankCard: BankCard,
    donations: Donation([])
}

type AuthContextType = {
    user?: User,
    signIn: (email: string, password: string) => Promise<void>
    signUp: (email: string, password: string) => Promise<void>
    signOut: () => Promise<void>
    setUser: React.Dispatch<React.SetStateAction<User | undefined>>
}

const AuthContext = createContext({} as AuthContextType)

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const router = useRouter()
    const [user, setUser] = useState<User | undefined>(),
    const [loading, setLoading] = useState<boolean>(true)

    const signIn = async (email: string, password: string) => {
        try {
            const { data } = await api.post("/auth/signin", {
                email, 
                password
            })
            toast.success("Амжилттай нэвтэрлээ")
        } catch (error) {
            console.error(error)
            toast.error("Нэвтрэхэд алдаа гарлаа")
        }
    }

  const signUp = async (email: string, password: string) => {
    try {
      const { data } = await api.post("/auth/signup", {
        email,
        password,
      });
    } catch (error) {
      console.error(error);
      toast.error("Бүртгүүлэхэд алдаа гарлаа");
    }
  };

  const signOut = async () => {
    localStorage.removeItem("token")
    router.push("/login")
  }

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("token")
    if (!tokenFromStorage) {
        setLoading(false)
        return
    }
    const getUser = async () => {
        try {
            const { data } = await api.get(`auth/me`)
            setUser(data)
        } catch (error) {
            console.error("Нэвтрэхэд алдаа гарлаа", error)
            localStorage.removeItem("token")
            setUser(undefined)
        } finally {
            setLoading(false)
        }
    }
    getUser()
  }, [])

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, setUser}}>
    {!loading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)