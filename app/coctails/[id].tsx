import { router, useLocalSearchParams } from "expo-router";
import { Button, Text, View } from "react-native";

export default function CoctailScreen() {
    const { id } = useLocalSearchParams();
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Text>Coctail {id}</Text>
            <Button title="Go back" onPress={() => router.back()} />
        </View>
    );
}
