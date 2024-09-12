import { Post } from '@/api/client';
import { useEffect, useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function HomeScreen() {

  const [posts, setPosts] = useState<{}[]>()
  const [pokemon, setPokemon] = useState({})
  const [detail, setDetail] = useState(false)
  const [id, setId] = useState(0)

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    const response = await Post.getPosts()
    setPosts(response)
  }

  async function getAPost(name: String) {
    const response = await Post.getAPost(name)
    setPokemon(response)
    setDetail(true)
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.textInput}
            placeholder='Post Id'
            onChangeText={(text) => setId(Number(text))}
            maxLength={2}
            keyboardType='numeric'
          />
          <Button title='Buscar' onPress={() => getAPost('')} />
        </View>
        <ScrollView>
          {posts?.results.map((post) => {
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
            )
          })}
          <View style={styles.postContainer}>
            <Text style={styles.title}>{pokemon?.order}</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  searchContainer: {
    margin: 8,
    flexDirection: 'row'
  },
  textInput: {
    flex: 3
  },
  button: {
    flex: 1
  },
  postContainer: {
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 8,
    padding: 10,
    margin: 10
  },
  title: {
    textAlign: 'left',
    fontSize: 18,
    fontWeight: 'bold'
  },
  userId: {
    textAlign: 'right',
    color: '#babaca'
  }
});
