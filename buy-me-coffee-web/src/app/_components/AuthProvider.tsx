"use client";

import { api, setAuthToken } from "@/axios";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState, createContext, useContext } from "react";
import { toast } from "sonner";

type PropsWithChildren = {
  children: React.ReactNode;
};

export type Profile = {
  id: number;
  name: string;
  about: string;
  avatarImage: string;
  socialMediaUrl: string;
  successMessage: string;
  backgroundImage: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
};

export type BankCard = {
  id: number;
  country: string;
  firstName: string;
  lastName: string;
  cardNumber: string;
  expiryDate: Date;
  cvc: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
};

export interface Donation {
  id: number;
  amount: number;
  specialMessage: string;
  socialMediaUrl?: string;
  recipientId: number;
  senderId?: number;
  isPaid: boolean;
  createdAt: string;
  updatedAt: string;
  recipient: {
    id: number;
    email: string;
    username: string;
    name?: string;
    profile?: Profile;
  };
  sender?: {
    id: number;
    email: string;
    username: string;
    name?: string;
    isAnonymous: boolean;
    profile?: Profile;
  };
}

export type User = {
  id: number;
  username: string;
  email: string;
  name?: string;
  isAnonymous: boolean;
  profile?: Profile;
  bankCard?: BankCard;
  donations: Donation[];
  received: Donation[];
  createdAt: string;
  updatedAt: string;
};

type AuthContextType = {
  user?: User;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, username: string) => Promise<void>;
  signOut: () => Promise<void>;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  getUser: () => Promise<void>;
};

const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const [user, setUser] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  const signIn = async (email: string, password: string) => {
    try {
      const { data } = await api.post("/auth/signin", { email, password });

      console.log("SignIn response data:", data);
      console.log("User profile:", data.user?.profile);

      toast.success("Амжилттай нэвтэрлээ");
      localStorage.setItem("token", data.token);
      setAuthToken(data.token);

      // Profile мэдээлэл шалгах
      if (data.user) {
        setUser(data.user);
        console.log("User set successfully:", data.user);
      } else {
        console.warn("No user data received, fetching from /auth/me");
        await getUser();
      }

      router.push("/");
    } catch (error) {
      console.error("SignIn error:", error);
      toast.error("Нэвтрэхэд алдаа гарлаа, нууц үг эсвэл email буруу байна");
    }
  };

  const signUp = async (
    email: string,
    password: string,
    username: string
  ): Promise<void> => {
    try {
      const { data } = await api.post("/auth/signup", {
        email,
        password,
        username,
      });

      console.log("SignUp response data:", data);
      console.log("User profile after signup:", data.user?.profile);

      toast.success("Амжилттай бүртгүүллээ");
      localStorage.setItem("token", data.token);
      setAuthToken(data.token);

      if (data.user) {
        setUser(data.user);
      } else {
        console.warn("No user data received during signup");
        await getUser();
      }

      router.push("/complete-profile");
    } catch (error: unknown) {
      console.error("SignUp error:", error);
      if (axios.isAxiosError(error)) {
        const msg =
          error.response?.data?.message || "Бүртгүүлэхэд алдаа гарлаа";
        toast.error(msg);
      } else {
        toast.error("Алдаа гарлаа. Дахин оролдоно уу.");
      }
    }
  };

  const signOut = async () => {
    localStorage.removeItem("token");
    setUser(undefined);
    router.push("/auth/signin");
  };

  const getUser = async () => {
    try {
      const { data } = await api.get("/auth/me");
      console.log("GetUser response:", data);
      console.log("Profile from getUser:", data.profile);
      setUser(data);
    } catch (error) {
      console.error("GetUser error:", error);
      localStorage.removeItem("token");
      setUser(undefined);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }
    setAuthToken(token);
    getUser();
  }, []);
  useEffect(() => {
    console.log("User state changed:", user);
    console.log("Profile data:", user?.profile);
  }, [user]);

  return (
    <AuthContext.Provider
      value={{ user, signIn, signUp, signOut, setUser, getUser }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
