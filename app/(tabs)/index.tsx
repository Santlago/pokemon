import { Post } from "@/api/client";
import { useEffect, useState } from "react";
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const [posts, setPosts] = useState<{}[]>();
  const [pokemon, setPokemon] = useState({});
  const [detail, setDetail] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const response = await Post.getPosts();
    setPosts(response);
  }

  async function getAPost(name: String) {
    const response = await Post.getAPost(name);
    setPokemon(response);
    setDetail(true);
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Post Id"
            onChangeText={(text) => setName(String(text))}
            maxLength={25}
            keyboardType="numeric"
          />
          <Button title="Buscar" onPress={() => getAPost(name)} />
        </View>
        <ScrollView>
          {detail ? (
            <>
              <View style={styles.postContainer}>
                <Text style={styles.title}>Nome: {pokemon?.name}</Text>
                <Text style={styles.title}>Altura: {pokemon?.height}</Text>
                <Text style={styles.title}>Largura: {pokemon?.weight}</Text>
                <Image
                  source={{ uri: pokemon?.sprites?.front_default }}
                  style={{ width: 100, height: 100 }}
                />
              </View>
              <Button
                title="Voltar"
                onPress={() => {
                  setDetail(false);
                }}
              />
            </>
          ) : (
            posts?.results.map((post) => {
              return (
                <TouchableHighlight
                  key={post.name}
                  onPress={() => getAPost(post.name)}
                >
                  <>
                    <View style={styles.postContainer}>
                      <Text style={styles.title}>{post.name}</Text>
                      <Text>{post.url}</Text>
                    </View>
                  </>
                </TouchableHighlight>
              );
            })
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    margin: 8,
    flexDirection: "row",
  },
  textInput: {
    flex: 3,
  },
  button: {
    flex: 1,
  },
  postContainer: {
    borderColor: "#000",
    borderWidth: 2,
    borderRadius: 8,
    padding: 10,
    margin: 10,
  },
  title: {
    textAlign: "left",
    fontSize: 18,
    fontWeight: "bold",
  },
  userId: {
    textAlign: "right",
    color: "#babaca",
  },
});
