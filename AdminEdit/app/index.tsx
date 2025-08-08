import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";
import {
  Appbar,
  Button,
  PaperProvider,
  useTheme,
  Text,
  MD3LightTheme
} from 'react-native-paper';

const url = 'https://backend.aisling.clairegregg.com/content'; 

export default function Index() {
  const router = useRouter()
  const theme = useTheme()
  return (
    <PaperProvider theme={MD3LightTheme}>
      <View style={{ flex: 1, backgroundColor: theme.colors.surface }}>
        <Appbar.Header mode="center-aligned" elevated>
          <Appbar.Content title="Modify Application Data" />
        </Appbar.Header>
        <Text>{`
          Welcome!

          Here you are able to modify any application data for [Service Name]'s app concerning gender affirming surgeries. 
          NOTE: there is not really any data protection here against accidential deletion, contact Claire if you want a backup made!

          Once you have made a modification, you can check out how it looks in the live app!

          There are two types of data you are able to edit:

          1. Welcome messages which appear when the user first loads the app

          2. Surgeries, which contain details about different gender affirming surgeries and recommendations based on them.

          Click into either of these types to learn more!
        `}</Text>
        <Button onPress={() => {router.navigate(`/welcomes`)}}>Edit App Welcome Messages</Button>
        <Button onPress={() => {router.navigate(`/surgeries`)}}>Edit Surgery Details</Button>
      </View>
    </PaperProvider>
  );
}
