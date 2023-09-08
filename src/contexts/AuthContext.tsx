import { createContext, ReactNode, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { User } from "../types/User";
import { PropsStack } from "../types/Navigation";
import {
    FieldErrorsImpl,
    useForm,
    UseFormHandleSubmit,
    UseFormSetValue,
  } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../validations/loginSchema";

type LoginData = {
  email: string;
  password: string;
  rememberMe?: boolean;
};

type AuthContextData = {
  signed: boolean;
  user: User | null;
  loginDataValues: LoginData;
  loading: boolean;
  errors: FieldErrorsImpl<{ email: string; password: string }>;
  handleSubmit: UseFormHandleSubmit<LoginData>;
  setValue: UseFormSetValue<LoginData>;
  handleLogin(rememberMe: boolean): Promise<void>;
  handleLogout(): void;
};

export const AuthContext = createContext({} as AuthContextData);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { navigate } = useNavigation<PropsStack>();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const defaultValues: LoginData = {
    email: "",
    password: "",
    rememberMe: false,
  };

  const {
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginData>({
    mode: "onTouched",
    resolver: yupResolver(loginSchema),
    defaultValues,
  });


}


