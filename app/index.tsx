import * as React from 'react';
import { View, ScrollView, BackHandler, Platform, Linking } from 'react-native';
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
  Appbar
} from 'react-native-paper';
import SurgeryTypeSection from '@/components/SurgeryTypeSection';
import { IntroDialogue } from '@/components/IntroDialogue';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


const data = require('@/constants/ApplicationData.json')
const lightTheme = require('@/assets/themes/light.json')
const darkTheme = require('@/assets/themes/dark.json')

export default function Index() {
  const insets = useSafeAreaInsets();
  let sections: Map<string, any[]> = new Map();
  for (let surgery of data.surgeries) {
    if (sections.has(surgery.primary_association)){
      sections.get(surgery.primary_association)?.push(surgery)
    } else {
      sections.set(surgery.primary_association, [surgery])
    }
  }

  let surgeryTypeSections: React.JSX.Element[] = []
  sections.forEach((surgery: any[], type: string) =>
  {
      surgeryTypeSections.push(
          <SurgeryTypeSection title={type} list={surgery} key={type}/>
      )
  });

  const [dialogueVisible, setDialogueVisible] = React.useState(true);
  const showDialog = () => setDialogueVisible(true);

  return (
    <PaperProvider theme={theme}>
      <React.Fragment>
        {Platform.OS === 'web' ? (
        <style type="text/css">{`
          @font-face {
            font-family: 'MaterialDesignIcons';
            src: url(${require('@react-native-vector-icons/material-design-icons/fonts/MaterialDesignIcons.ttf')}) format('truetype');
          }
        `}</style>
    ) : null}
      </React.Fragment>
      <View style={{ backgroundColor: theme.colors.surface, flex: 1}}>
        <Appbar.Header mode='center-aligned' elevated>
          <Appbar.Action icon="information-outline" isLeading onPress={showDialog} />
          <Appbar.Content title="[Service Name]" />
          <Appbar.Action icon="cancel" onPress={() => {
            if (Platform.OS === 'android') {
              BackHandler.exitApp()
            } else {
              Linking.openURL("https://www.google.com")
            }    
          }} />
        </Appbar.Header>
        <IntroDialogue visible={dialogueVisible} setVisible={setDialogueVisible}/>
        <ScrollView style={{marginBottom: insets.bottom}}>
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
 
