import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Main from "./components/Main";
import Character from "./components/Character";
import ListOfCharacters from "./components/ListOfCharacters";
import Login from "./components/Login";

const Stack = createStackNavigator();

export default function Navigate() {
  const mainOptions = {
    headerStyle: { backgroundColor: "#F60", height: 80 },
    headerTitleStyle: {
      fontWeight: "700",
      color: "#333",
      fontSize: 20,
    },
    title: "Disney",
    justifyContent: "space-around",
    headerTitleAlign: "left",
    headerLeft: ()=> null,
  };
  const characterOptions = {
    headerShown: false,
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} options={ {headerShown : false }}/>
        <Stack.Screen name="Main" component={Main} options={mainOptions} />
        <Stack.Screen name="Character" component={Character} options={characterOptions} />
        <Stack.Screen
          name="ListOfCharacters"
          component={ListOfCharacters}
          options={characterOptions}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
