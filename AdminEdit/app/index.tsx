import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";
import {
  Appbar,
  Button,
  PaperProvider,
  useTheme
} from 'react-native-paper';

const url = 'https://backend.aisling.clairegregg.com/content'; 

export default function Index() {
  const router = useRouter()
  const theme = useTheme()
  return (
    <PaperProvider>
      <View style={{ flex: 1, backgroundColor: theme.colors.surface }}>
        <Appbar.Header mode="center-aligned" elevated>
          {/* <Appbar.Action icon="information-outline" isLeading onPress={showDialog} /> */}
          <Appbar.Content title="Modify Data" />
          {/* <Appbar.Action
            icon="cancel"
            onPress={() => {
              if (Platform.OS === 'android') {
                BackHandler.exitApp();
              } else {
                Linking.openURL("https://www.google.com");
              }
            }}
          /> */}
        </Appbar.Header>
        <Button onPress={() => {router.navigate(`/welcomes`)}}>Edit App Welcome Messages</Button>
        <Button onPress={() => {router.navigate(`/surgeries`)}}>Edit Surgery Details</Button>
      </View>
    </PaperProvider>
  );
}
