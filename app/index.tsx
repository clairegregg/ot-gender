import { Text, View } from "react-native";
import * as React from 'react';
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
  Button
} from 'react-native-paper';
// import '@fontsource/roboto/300.css';
// import '@fontsource/roboto/400.css';
// import '@fontsource/roboto/500.css';
// import '@fontsource/roboto/700.css';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#EBAC20',
    secondary: '#006471',
  },
};

export default function Index() {
  return (
    <PaperProvider theme={theme}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button mode="contained">Hello world</Button>
      </View>
    </PaperProvider>
  );
}
