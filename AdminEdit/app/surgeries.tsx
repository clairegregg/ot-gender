import { useRouter } from "expo-router";
import React from "react";
import { View, Platform } from "react-native";
import {
  PaperProvider,
  Appbar,
  Button,
  useTheme,
  List
} from 'react-native-paper';

export default function Surgeries() {
  const theme = useTheme()
  const router = useRouter()
  return (
    <PaperProvider>
      <View style={{ flex: 1 }}>
        <Appbar.Header elevated>
            <Appbar.BackAction onPress={() => {router.back()}}/>
            <Appbar.Content title="Surgeries" />
        </Appbar.Header>
      </View>
    </PaperProvider>
  );
}
