import { Image } from 'expo-image';
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Button, Text, View } from "react-native";

export default function CoctailScreen() {
    const { id } = useLocalSearchParams();
    const [coctail, setCoctail] = useState<Coctail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    type Coctail = {
        idDrink: string;
        strDrink: string;
        strImageSource: string;
        // add other fields as needed
    };

    useEffect(() => {
        try {
            setLoading(true);
            fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
                .then((response) => response.json())
                .then((data) => {
                    setCoctail(data.drinks[0]);
                });
        } catch (error) {
            setError('Failed to fetch cocktail data.');
        } finally {
            setLoading(false);
        }
    }, []);

    if (loading) {
        return (
            <ActivityIndicator />
        );
    }

    if (error) {
        return (
            <View>
                <Text>{error}</Text>
            </View>
        );
    }

    return (
        <View>
            <View style={{ position: 'relative' }}>
                <Image source={{ uri: coctail?.strImageSource }} style={{ width: '100%', height: 200, backgroundColor: 'gray' }} />
                <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', position: 'absolute', bottom: 10, left: 0, right: 0 }}>{coctail?.strDrink}</Text>
            </View>
            <Button title="Go back" onPress={() => router.back()} />
        </View >
    );
}
