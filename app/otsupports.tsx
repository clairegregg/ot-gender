import * as React from 'react';
import { View } from 'react-native';
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
  Appbar
} from 'react-native-paper';
import { useLocalSearchParams, useRouter } from 'expo-router';

const data = require('@/constants/ApplicationData.json')
const lightTheme = require('@/assets/themes/light.json')
const darkTheme = require('@/assets/themes/dark.json')

export default function OtSupports() {
    const router = useRouter()
    // TODO: Remove surgeryType as a parameter here, if a surgery is masculinising or feminising should not matter. Should be fixed with proper data structure
    const { surgeryName, surgeryType } = useLocalSearchParams<{surgeryName: string, surgeryType: string}>()

    return (
      <PaperProvider theme={theme}>
        <View style={{ backgroundColor: theme.colors.surface, flex: 1}}>
          <Appbar.Header elevated>
            <Appbar.BackAction onPress={() => {router.back()}}/>
            <Appbar.Content title={surgeryName} />
            <Appbar.Action icon="cancel" onPress={() => {}} />
          </Appbar.Header>
        </View>
      </PaperProvider>
    );
}

const theme = {
  ...DefaultTheme,
  colors: lightTheme.colors
};
 
