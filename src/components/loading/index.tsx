import { Spinner, View } from "@gluestack-ui/themed";


export const Loading = () => { 
    return (
        <View flex={1} alignItems={"center"} justifyContent={"center"}>
            <Spinner color="#0ff" size="small" />
        </View>
    );
}