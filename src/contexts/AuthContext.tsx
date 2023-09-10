import { createContext, ReactNode, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { User } from "../types/User";
import { api } from "../services/api";
import { PropsStack } from "../types/Navigation";
import {
  FieldErrorsImpl,
  set,
  useForm,
  UseFormHandleSubmit,
  UseFormSetValue,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../validations/loginSchema";
import { Loading } from "../components/loading";

type LoginData = {
  email: string;
  password: string;
  rememberMe?: boolean;
};

type AuthContextData = {
  signed: boolean;
  isLoading: boolean;
  user: User | null;
  loginDataValues: LoginData;
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
  const [isLoading, setIsLoading] = useState<boolean>(true);

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

  useEffect(() => {
    const loadStorageData = async () => {
      try {
        const storageUser = await AsyncStorage.getItem("@Auth:user");
        const storageToken = await AsyncStorage.getItem("@Auth:token");

        const storagedEmail = await AsyncStorage.getItem("@Auth:email");
        const storagedPassword = await AsyncStorage.getItem("@Auth:password");
        const storageRememberMe = await AsyncStorage.getItem(
          "@Auth:rememberMe"
        );

        if (storagedEmail && storagedPassword && storageRememberMe) {
          setValue("email", storagedEmail);
          setValue("password", storagedPassword);
          setValue("rememberMe", Boolean(storageRememberMe));
        }

        if (storageUser && storageToken) {

          api.defaults.headers.common = {
            Authorization: `Bearer ${storageToken}`,
          };

          setUser(JSON.parse(storageUser));
        }

        setIsLoading(false);
      } catch (error) {
        Toast.show({
          type: "error",
          position: "top",
          text1: "Erro ao carregar dados do usuário",
          text2: "Tente novamente",
          visibilityTime: 4000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });
        setIsLoading(false);
      }
    };

    loadStorageData();
  }, []);

  const loginDataValues = watch();

  const handleLogin = async (rememberMe: boolean): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await api.post("http://", {
        email: loginDataValues.email,
        password: loginDataValues.password,
      });

      if (response.status === 200) {
        setIsLoading(false);
        setUser(response.data.user);

        if (rememberMe) {
          setValue("email", loginDataValues.email);
          setValue("password", loginDataValues.password);
          setValue("rememberMe", rememberMe);

          await AsyncStorage.setItem("@Auth:email", loginDataValues.email);
          await AsyncStorage.setItem("@Auth:token", response.data.token);
          await AsyncStorage.setItem("@Auth:rememberMe", String(rememberMe));
        } else {
          setValue("email", "");
          setValue("password", "");
          setValue("rememberMe", false);

          AsyncStorage.setItem("@Auth:email", "");
          AsyncStorage.setItem("@Auth:password", "");
          AsyncStorage.setItem("@Auth:rememberMe", "");
        }

        api.defaults.headers.common = {
          Authorization: `Bearer ${response.data.token}`,
        };

        await AsyncStorage.setItem(
          "@Auth:user",
          JSON.stringify(response.data.user)
        );
        await AsyncStorage.setItem("@Auth:token", response.data.token);

        navigate("Home");
      }

    } catch (error) {
      Toast.show({
        type: "error",
        position: "top",
        text1: "Erro ao fazer login",
        text2: "Tente novamente",
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
    }
  };


  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();

      setUser(null);
      navigate("Login");
    } catch (error) {
      Toast.show({
        type: "error",
        position: "top",
        text1: "Erro ao fazer logout",
        text2: "Tente novamente",
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
    }
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <AuthContext.Provider
      value={{
        signed: Boolean(user),
        isLoading,
        user,
        loginDataValues,
        errors,
        handleSubmit,
        setValue,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
