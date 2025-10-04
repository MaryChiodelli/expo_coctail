import { useState } from "react";
import { Text, TextInput, View } from "react-native";

export default function SearchScreen() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

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
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Search</Text>
      <TextInput
        value={searchTerm}
        onChangeText={handleSearch}
        placeholder="Search..."
        style={{
          borderWidth: 1,
          borderColor: "gray",
          borderRadius: 5,
          padding: 10,
          width: "80%",
          marginTop: 10,
        }}
      />
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        results.map((item) => (
          <View key={item.idDrink} style={{ marginTop: 10 }}>
            <Text>{item.strDrink}</Text>
          </View>
        ))
      )}
    </View>
  );
}
