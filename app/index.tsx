import * as React from 'react';
import { View } from 'react-native';
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider
} from 'react-native-paper';
import SurgeryTypeSection from '@/components/SurgeryTypeSection';

const data = require('@/constants/ApplicationData.json')

export default function Index() {
  return (
    <PaperProvider theme={theme}>
      <View
        style={{
          alignItems: "stretch",
        }}
      >
        <SurgeryTypeSection title={data.surgeries[0].title} list={data.surgeries[0].list}/>
      </View>
    </PaperProvider>
  );
}

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#EBAC20',
    secondary: '#006471',
  },
};
