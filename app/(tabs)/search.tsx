import CardVertical from "@/components/card-vertical";
import { ThemeContext } from "@/context/ThemeContext";
import { Drink } from "@/types";
import { useContext, useState } from "react";
import { FlatList, Text, TextInput, View } from "react-native";

export default function SearchScreen() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<Drink[]>([]);
  const [loading, setLoading] = useState(false);

  const { colors } = useContext(ThemeContext);
  const handleSearch = (term: string) => {

    const trimmedTerm = term.trim();
    setSearchTerm(trimmedTerm);

    if (trimmedTerm.length > 0) {
      setLoading(true);
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${trimmedTerm}`)
        .then((response) => response.json())
        .then((data) => {
          setResults(data.drinks || []);
        })
        .catch(() => {
          setResults([]);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setResults([]);
    }
  };

  return (
    <FlatList style={{ backgroundColor: colors.background }}
      data={results}
      keyExtractor={(item) => item.idDrink}
      numColumns={2}
      columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 8, marginBottom: 20 }}
      contentContainerStyle={{ paddingTop: 24, paddingBottom: 32, paddingHorizontal: 4 }}
      ListHeaderComponent={
        <View>
          <Text style={{ fontSize: 28, fontWeight: 'bold', color: colors.text, marginBottom: 20, paddingHorizontal: 8 }}>Search</Text>

          <TextInput
            value={searchTerm}
            onChangeText={handleSearch}
            placeholder="Search..."
            style={{
              marginHorizontal: 15,
              borderWidth: 1,
              borderColor: "gray",
              borderRadius: 5,
              padding: 10,
              marginTop: 10,
            }}
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
