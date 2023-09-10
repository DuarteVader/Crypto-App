import { ImageBackground, TextInput } from "react-native";
import React, { FC, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Box,
  VStack,
  HStack,
  Image,
  FormControl,
  Input,
  InputIcon,
  Icon,
  SearchIcon,
  Text,
  Button,
  ButtonText,
  LockIcon,
  EyeIcon,
} from "@gluestack-ui/themed";
import useLoadFonts from "../../hooks/useLoadFonts";
import { UnlockIcon, UserCircle2, Eye, EyeOff } from "lucide-react-native";

const Login: FC = () => {
  const { onLayoutRootView } = useLoadFonts();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <ImageBackground
      style={{ flex: 1, backgroundColor: "#000" }}
      source={require("../../../assets/Background.png")}
    >
      <Box p={24} onLayout={onLayoutRootView}>
        <SafeAreaView>
          <VStack reversed={false}>
            <HStack paddingBottom={129} alignItems="center" gap={12}>
              <Image
                style={{ width: 38, height: 49 }}
                source={require("../../../assets/icone.png")}
              />
              <Text fontFamily="Inter_700" size="4xl" color="#fff">
                Crypto®
              </Text>
            </HStack>
            <Box paddingBottom={32}>
              <Text fontFamily="Inter_700" size="4xl" color="white">
                The largest{" "}
                <Text fontFamily="Inter_700" size="4xl" color="#7F35FF">
                  {"          "}
                  NFT
                </Text>{" "}
                marketplace in the world
              </Text>
            </Box>
            <VStack>
              <FormControl paddingBottom={12}>
                <Input variant="rounded" pl="$5">
                  <InputIcon>
                    <UserCircle2 color="white" size={24} />
                  </InputIcon>
                  <TextInput
                    style={{
                      paddingLeft: 10,
                      flex: 1,
                      fontFamily: "Inter_400",
                      color: "#848486"
                    }}
                    placeholder="Login"
                    placeholderTextColor="#848486"
                  />
                </Input>
              </FormControl>
              <FormControl>
                <Input variant="rounded" pl="$5">
                  <InputIcon>
                    <UnlockIcon color="white" size={24} />
                  </InputIcon>
                  <TextInput
                    style={{
                      paddingLeft: 10,
                      flex: 1,
                      fontFamily: "Inter_400",
                      color: "#848486"
                    }}
                    secureTextEntry={!showPassword}
                    placeholder="**********"
                    placeholderTextColor="#848486"
                  />
                  <InputIcon pr="$5" onPress={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff color="#848486"/> : <Eye color="#848486"/>}
                  </InputIcon>
                </Input>
              </FormControl>
            </VStack>
            <Box paddingTop={16} alignItems="flex-end" paddingBottom={191}>
              <Text fontFamily="Inter_700" color="#7F35FF">
                Lost password?
              </Text>
            </Box>
            <Box>
              <VStack space="lg" pt="$4">
                <Button
                  style={{ width: 342, height: 44 }}
                  bgColor="#7F35FF"
                  borderRadius={22}
                  sx={{
                    ":active": {
                      bg: "#9A4DFF",
                    },
                  }}
                >
                  <ButtonText fontFamily="Inter_700">Login</ButtonText>
                </Button>
              </VStack>
            </Box>
          </VStack>
        </SafeAreaView>
      </Box>
    </ImageBackground>
  );
};

export default Login;
