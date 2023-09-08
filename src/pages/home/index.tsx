import { Text, View } from "react-native";
import React, { FC } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Home: FC = () => {
  return (
    <SafeAreaView>
      <View>
        <Text>Home</Text>
      </View>
    </SafeAreaView>
  );
};

export default Home;
