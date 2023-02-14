import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {auth, app, db, getFirestore, doc, setDoc, getDoc} from "../firebase/config.js";

let userLists = [
  {
    characters: [],
    key: ["Group 1"],
  },
  {
    characters: [],
    key: ["Group 2"],
  },
];

export default function Main({ navigation }) {
  const SEARCH_URL = "https://api.disneyapi.dev/character?name=";
  const ALL_CHARACTERS_URL = "https://api.disneyapi.dev/characters?page=1";

  const [characters, setCharacters] = useState([]);

  const searchCharacters = (url) => {
    if (url === SEARCH_URL) {
      url = ALL_CHARACTERS_URL;
    }
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        setAtributes(json.data);
      });
  };

  const setAtributes = (data) => {
    data.forEach((character) => {
      const {
        films,
        shortFilms,
        _id,
        tvShows,
        videoGames,
        parkAttractions,
        allies,
        enemies,
        name,
        imageUrl,
        url
      } = character;

      setCharacters((list) => {
        return [
          ...list,
          {
            image: imageUrl,
            name: name,
            films: films,
            shortFilms: shortFilms,
            tvShows: tvShows,
            videoGames: videoGames,
            key: _id,
            comment: "",
          },
        ];
      });
    });
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@storage_Key");
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(e);
    }
  };

  const getCloudData = async () => {
    try {
      const docRef = doc(db, "users", auth.currentUser.email);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data().data;
      } else {
        console.log("No such document!");
      }
    } catch (e) {
      console.log(e);
    }
  }

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@storage_Key", jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  const storeCloudData = async (value) => {
    try {
      const docRef = await setDoc(doc(db, "users", auth.currentUser.email), {
        data: value
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      storeCloudData(userLists);
      userLists = userLists?.filter((obj) => obj.key[0] !== "");
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    getCloudData().then((value) => (userLists = value));
    setCharacters([]);
    searchCharacters(SEARCH_URL);
    navigation.setOptions({
      headerRight: () => (
        <View paddingRight={30} width="75%">
          <TextInput
            style={styles.searchInput}
            placeholder={"Search..."}
            onSubmitEditing={(event) => {
              setCharacters([]);
              searchCharacters(SEARCH_URL + event.nativeEvent.text);
            }}
          />
        </View>
      ),
    });
  }, []);

  return (
    <View style={styles.table}>
      <FlatList
        data={characters}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.tableItem}
            onPress={() => {
              navigation.navigate("Character", [item, userLists]);
            }}
          >
            <Image
              style={styles.image}
              source={
                item.image
                  ? { uri: item.image }
                  : require("../assets/no-image.png")
              }
              />
          </TouchableOpacity>
        )}
        numColumns={3}
      />
      <TouchableOpacity
        style={styles.listButton}
        onPress={() => {
          userLists = userLists.filter((obj) => obj.key[0] !== "");
          navigation.navigate("ListOfCharacters", userLists);
        }}
      >
        <Entypo name="list" size={36} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  tableItem: {
    width: "33%",
    marginTop: 5,
  },
  table: {
    backgroundColor: "#333333",
    flex: 1,
    paddingBottom: 5,
  },
  image: {
    width: "95%",
    height: Dimensions.get("screen").width / 2,
    alignSelf: "center",
    borderColor: "#111111",
    borderWidth: 1,
  },
  searchInput: {
    borderWidth: 2,
    borderColor: "#333333",
    borderRadius: 5,
    paddingHorizontal: 10,
    width: "100%",
  },
  listButton: {
    position: "absolute",
    bottom: 30,
    right: 10,
    borderRadius: 50,
    backgroundColor: "#F60",
    width: 50,
    height: 50,
    paddingLeft: 7,
    paddingTop: 7,
  },
});
