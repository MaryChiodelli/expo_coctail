import { ThemeContext } from '@/context/ThemeContext';
import { Drink } from '@/types';
import { Image } from 'expo-image';
import { router, useLocalSearchParams } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { ActivityIndicator, Button, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CoctailScreen() {
    const { id } = useLocalSearchParams();
    const { colors, theme, toggleTheme } = useContext(ThemeContext)

    const [coctail, setCoctail] = useState<Drink | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const getIngredient = (i: number) => (coctail as any)[`strIngredient${i}`] as string | null;
    const getMeasure = (i: number) => (coctail as any)[`strMeasure${i}`] as string | null;

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

    if (!coctail) {
        return <Text style={{ color: colors.text }}>No cocktail found.</Text>;
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background, padding: 20 }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ alignItems: 'center', backgroundColor: colors.card, borderRadius: 16, padding: 20, shadowColor: colors.border, shadowOpacity: 0.2, shadowRadius: 8, marginBottom: 24 }}>
                    <Image
                        source={coctail.strImageSource ? { uri: coctail.strImageSource } : (coctail.strDrinkThumb ? { uri: coctail.strDrinkThumb } : undefined)}
                        style={{ width: 180, height: 180, borderRadius: 16, marginBottom: 16, backgroundColor: colors.border }}
                    />
                    <Text style={{ fontSize: 28, fontWeight: 'bold', color: colors.text, textAlign: 'center', marginBottom: 8 }}>{coctail.strDrink}</Text>
                    <Text style={{ fontSize: 16, color: colors.secondary, textAlign: 'center', marginBottom: 8 }}>{coctail.strCategory} {coctail.strAlcoholic ? `• ${coctail.strAlcoholic}` : ''}</Text>
                    <Text style={{ fontSize: 16, color: colors.text, textAlign: 'center', marginBottom: 8 }}>{coctail.strGlass}</Text>
                </View>
                <View style={{ backgroundColor: colors.card, borderRadius: 12, padding: 16, marginBottom: 24 }}>
                    <Text style={{ fontSize: 20, fontWeight: '600', color: colors.primary, marginBottom: 8 }}>Ingredients</Text>
                    {Array.from({ length: 15 }).map((_, i) => {
                        const ingredient = getIngredient(i + 1);
                        const measure = getMeasure(i + 1);
                        if (!ingredient) return null;
                        return (
                            <Text key={i} style={{ fontSize: 16, color: colors.text, marginBottom: 4 }}>
                                {measure ? `${measure} ` : ''}{ingredient}
                            </Text>
                        );
                    })}
                </View>
                <View style={{ backgroundColor: colors.card, borderRadius: 12, padding: 16, marginBottom: 24 }}>
                    <Text style={{ fontSize: 20, fontWeight: '600', color: colors.primary, marginBottom: 8 }}>Instructions</Text>
                    <Text style={{ fontSize: 16, color: colors.text, lineHeight: 22 }}>{coctail.strInstructions}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Button title="Go back" color={colors.primary} onPress={() => router.back()} />
                    <Button title={theme === 'light' ? 'Dark Mode' : 'Light Mode'} color={colors.secondary} onPress={toggleTheme} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
