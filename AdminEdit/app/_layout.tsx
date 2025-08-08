import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="surgeries" options={{ headerShown: false }} />
      <Stack.Screen name="welcomes" options={{ headerShown: false }} />
      <Stack.Screen name="newSurgery" options={{ headerShown: false }} />
      <Stack.Screen name="editSurgery" options={{ headerShown: false }} />
    </Stack>;
}
