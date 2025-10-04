import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const [coctail, setCoctail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [drink, setDrink] = useState(null);
  const [loadingDrink, setLoadingDrink] = useState(true);
  const [errorDrink, setErrorDrink] = useState('');

  useEffect(() => {
    try {
      setLoading(true);
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail`)
        .then((response) => response.json())
        .then((data) => {
          setCoctail(data.drinks);
        });
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink`)
        .then((response) => response.json())
        .then((data) => {
          setDrink(data.drinks);
        });
    } catch (error) {
      setErrorDrink('Failed to fetch drink data.');
    } finally {
      setLoadingDrink(false);
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <ActivityIndicator />
    );
  }

  if (error || errorDrink) {
    return (
      <View>
        <Text>{error || errorDrink}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView>
      <FlatList
        data={coctail}
        keyExtractor={(item) => item.idDrink}
        ListHeaderComponent={
          <View style={{ height: 160 }}>
            <FlatList
              data={drink}
              keyExtractor={(item) => item.idDrink}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <View style={{ backgroundColor: "white", borderRadius: 10, padding: 20, alignItems: 'center' }}>
                  <Text>{item.strDrink}</Text>
                  <Image source={{ uri: item.strDrinkThumb }} style={{ width: 100, height: 100 }} />
                </View>
              )}
            />
          </View>
        }
        renderItem={({ item }) => (
          <View style={{ backgroundColor: "white", borderRadius: 10, padding: 20, alignItems: 'center' }}>
            <Text>{item.strDrink}</Text>
            <Image source={{ uri: item.strDrinkThumb }} style={{ width: 100, height: 100 }} />
          </View>
        )}
      />
    </SafeAreaView>
  );
}
