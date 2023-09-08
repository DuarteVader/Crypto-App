import { Spinner, View } from "native-base";


export const Loading = () => { 
    return (
        <View flex={1} alignItems={"center"} justifyContent={"center"}>
            <Spinner color="#008069" size={"lg"} />
        </View>
    );
}