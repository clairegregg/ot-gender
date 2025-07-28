import * as React from 'react';
import { View, ScrollView } from 'react-native';
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
  Appbar
} from 'react-native-paper';
import SurgeryTypeSection from '@/components/SurgeryTypeSection';

const data = require('@/constants/ApplicationData.json')
const lightTheme = require('@/assets/themes/light.json')
const darkTheme = require('@/assets/themes/dark.json')

export default function Index() {
  let surgeryTypeSections = data.surgeries.map((surgeryType: any) =>
  {
      return (
          <SurgeryTypeSection title={surgeryType.title} list={surgeryType.list} key={surgeryType.title}/>
      )
  });
  return (
    <PaperProvider theme={theme}>
      <View style={{ backgroundColor: theme.colors.surface, flex: 1}}>
        <Appbar.Header mode='center-aligned' elevated>
          <Appbar.Action icon="menu" isLeading onPress={() => {}} />
          <Appbar.Content title="NGS" />
          <Appbar.Action icon="cancel" onPress={() => {}} />
        </Appbar.Header>
        <ScrollView>
          { surgeryTypeSections }
        </ScrollView>
      </View>
    </PaperProvider>
  );
}

const theme = {
  ...DefaultTheme,
  colors: lightTheme.colors
};
 
