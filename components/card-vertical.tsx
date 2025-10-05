import { router } from "expo-router";
import { Image, Pressable, Text } from "react-native";

const CardVertical = ({ item, colors }: { item: any, colors: any }) => {
    return (
        <Pressable style={{ overflow: 'hidden', flex: 1 }} onPress={() => router.push(`/coctails/${item.idDrink}`)} >
            <Image source={{ uri: item.strDrinkThumb }} style={{ borderRadius: 12, aspectRatio: 1 / 1, overflow: 'hidden', margin: 4 }} />
            <Text style={{ color: colors.text }}>{item.strDrink}</Text>
        </Pressable>
    )
}

export default CardVertical