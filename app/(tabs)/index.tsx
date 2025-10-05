import CardHorizontal from "@/components/card-horizontal";
import CardVertical from "@/components/card-vertical";
import { ThemeContext } from "@/context/ThemeContext";
import { Drink } from "@/types";
import { useContext, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const [coctail, setCoctail] = useState<Drink[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [drink, setDrink] = useState<Drink[] | null>(null);
  const [loadingDrink, setLoadingDrink] = useState(true);
  const [errorDrink, setErrorDrink] = useState('');

  const { colors } = useContext(ThemeContext);

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
    <FlatList style={{ backgroundColor: colors.background }}
      data={coctail}
      keyExtractor={(item) => item.idDrink}
      numColumns={2}
      columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 8, marginBottom: 20 }}
      contentContainerStyle={{ paddingTop: 24, paddingBottom: 32, paddingHorizontal: 4 }}
      ListHeaderComponent={
        <View>
          <Text style={{ fontSize: 28, fontWeight: 'bold', color: colors.text, marginBottom: 20, paddingHorizontal: 8 }}>Popular Drinks</Text>

          <FlatList
            data={drink}
            keyExtractor={(item) => item.idDrink}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 8, paddingBottom: 12 }}
            renderItem={({ item }) => (
              <View style={{ marginRight: 16 }}>
                <CardHorizontal item={item} colors={colors} />
              </View>
            )}
          />

          <Text style={{ fontSize: 28, fontWeight: 'bold', color: colors.text, marginBottom: 20, marginTop: 32, paddingHorizontal: 8 }}>All Cocktails</Text>
        </View>
      }
      renderItem={({ item }) => (
        <View style={{ flex: 1, margin: 4 }}>
          <CardVertical item={item} colors={colors} />
        </View>
      )}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 0,
    paddingTop: 0,
    justifyContent: 'flex-start',
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});


// <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
//   <FlatList
//     data={coctail}
//     keyExtractor={(item) => item.idDrink}
//     numColumns={2} // Grid with 2 columns
//     columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 16, marginBottom: 16 }}
//     contentContainerStyle={{ paddingTop: 16, paddingBottom: 32 }}

//     // 👇 This is the horizontal list inside the vertical FlatList's header
//     ListHeaderComponent={
//       <View>
//         <Text style={{ paddingLeft: 16, paddingRight: 16, color: colors.text, fontSize: 24, fontWeight: '700', marginBottom: 10 }}>
//           Featured Cocktails
//         </Text>

//         <FlatList
//           data={drink} // 👈 horizontal data
//           keyExtractor={(item) => item.idDrink}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={{ paddingLeft: 16, paddingBottom: 20 }}
//           renderItem={({ item }) => (
//             <Card item={item} colors={colors} />
//           )}
//         />

//         <Text style={{ paddingLeft: 16, paddingRight: 16, color: colors.text, fontSize: 24, fontWeight: '700', marginBottom: 10 }}>
//           All Cocktails
//         </Text>
//       </View>
//     }

//     renderItem={({ item }) => (
//       <View style={{
//         backgroundColor: "white",
//         borderRadius: 10,
//         padding: 20,
//         alignItems: 'center',
//         width: '48%',
//       }}>
//         <Text>{item.strDrink}</Text>
//         <Image
//           source={{ uri: item.strDrinkThumb }}
//           style={{ width: 100, height: 100, borderRadius: 10, marginTop: 10 }}
//         />
//       </View>
//     )}
//   />
// </SafeAreaView>
