import { Tabs } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colorScheme === "dark" ? "#121212" : "#FFFFFF",
        },
        tabBarActiveTintColor: colorScheme === "dark" ? "#FFFFFF" : "#000000",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "ホーム",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="setting"
        options={{
          title: "設定",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Feather name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
