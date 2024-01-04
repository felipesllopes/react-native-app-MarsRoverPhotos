import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { About } from "../pages/About";
import { Galery } from "../pages/Galery";
import { Home } from "../pages/Home";
import { ImageRover } from "../pages/ImageRover";
import { Rovers } from "../pages/Rovers";
import Ionicons from "@expo/vector-icons/Ionicons";

export const Botton: React.FunctionComponent = () => {
    const Botton = createBottomTabNavigator();

    return (
        <Botton.Navigator
            screenOptions={{
                headerTintColor: "#fff",
                headerStyle: { backgroundColor: "#000" },
                headerTitleAlign: "center",
                tabBarLabelStyle: { fontSize: 12 },
                // estilização feita
                tabBarActiveTintColor: "#000",
                tabBarInactiveTintColor: "#999",
            }}
        >
            <Botton.Screen
                name="ImageRover"
                component={ImageRover}
                options={{
                    title: "Rover",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="camera" color={color} size={30} />
                    ),
                }}
            />
            <Botton.Screen
                name="About"
                component={About}
                options={{
                    title: "Sobre",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name="information-circle"
                            color={color}
                            size={30}
                        />
                    ),
                }}
            />
        </Botton.Navigator>
    );
};

export const Routes: React.FunctionComponent = () => {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator
            screenOptions={{
                animation: "slide_from_right",
                headerTintColor: "#fff",
                headerStyle: { backgroundColor: "#000" },
            }}
        >
            <Stack.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false }}
            />

            <Stack.Screen name="Rovers" component={Rovers} />

            <Stack.Screen
                name="Galery"
                component={Galery}
                options={{ title: "Galeria" }}
            />

            <Stack.Screen
                name="Botton"
                component={Botton}
                options={{ title: "Voltar" }}
            />
        </Stack.Navigator>
    );
};
