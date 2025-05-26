"use client";

import { api, setAuthToken } from "@/axios";
import { useRouter } from "next/navigation";
import { useEffect, useState, createContext, useContext } from "react";
import { toast } from "sonner";

type PropsWithChildren = {
  children: React.ReactNode;
};

export type Profile = {
  name: string;
  about: string;
  avatarImage: string;
  socialMediaUrl: string;
  successMessage: string;
  backgroundImage: string;
};

export type BankCard = {
  country: string;
  firstName: string;
  lastName: string;
  cardNumber: string;
  expiryDate: Date;
};

export interface Donation {
  id: number;
  amount: number;
  specialMessage: string;
  createdAt: string;
  recipient: {
    id: number;
    email: string;
    profile: {
      name: string;
      avatarImage: string;
      socialMediaUrl: string;
      successMessage: string;
      backgroundImage: string;
      about: string;
    };
  };
}

export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  profile: Profile;
  bankCard: BankCard;
  donations: Donation[];
};

type AuthContextType = {
  user?: User;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, username: string) => Promise<void>;
  signOut: () => Promise<void>;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
};

const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const [user, setUser] = useState<User | undefined>();
  const [loading, setLoading] = useState<boolean>(true);

  const signIn = async (email: string, password: string) => {
    try {
      const { data } = await api.post("/auth/signin", { email, password });
      console.log("dataaaa", data);

      toast.success("Амжилттай нэвтэрлээ");
      localStorage.setItem("token", data.token);
      setUser(data.user);
      router.push("/");
    } catch (error) {
      console.error(error);
      toast.error("Нэвтрэхэд алдаа гарлаа");
    }
  };

  const signUp = async (email: string, password: string, username: string) => {
    try {
      const { data } = await api.post("/auth/signup", {
        email,
        password,
        username,
      });
      toast.success("Амжилттай бүртгүүллээ");
      localStorage.setItem("token", data.token);
      setUser(data.user);
      router.push("/complete-profile");
    } catch (error) {
      console.error(error);
      toast.error("Бүртгүүлэхэд алдаа гарлаа");
    }
  };

  const signOut = async () => {
    localStorage.removeItem("token");
    setUser(undefined);
    router.push("/login");
  };

  const getUser = async () => {
    try {
      const { data } = await api.get("/auth/me");
      setUser(data);
    } catch (error) {
      console.error("Нэвтрэхэд алдаа гарлаа", error);
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
  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut, setUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
