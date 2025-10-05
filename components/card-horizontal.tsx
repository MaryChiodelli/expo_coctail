import { router } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";

const CardHorizontal = ({ item, colors }: { item: any, colors: any }) => {
    return (
        <Pressable
            style={{
                height: 200,
                aspectRatio: 3 / 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 8
            }}
            onPress={() => router.push(`/coctails/${item.idDrink}`)}
        >
            <View style={{ flex: 1, overflow: 'hidden', borderRadius: 12 }}>
                <Image source={{ uri: item.strDrinkThumb }} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </View>
            <Text style={{ color: colors.text, padding: 8 }}>{item.strDrink} dasa</Text>
        </Pressable>
    )
}

export default CardHorizontal