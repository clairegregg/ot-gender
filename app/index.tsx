import * as React from 'react';
import { View, ScrollView } from 'react-native';
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
  Appbar
} from 'react-native-paper';
import SurgeryTypeSection from '@/components/SurgeryTypeSection';
import { IntroDialogue } from '@/components/IntroDialogue';


const data = require('@/constants/ApplicationData.json')
const lightTheme = require('@/assets/themes/light.json')
const darkTheme = require('@/assets/themes/dark.json')

export default function Index() {
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

  const [dialogueVisible, setDialogueVisible] = React.useState(false);
  const showDialog = () => setDialogueVisible(true);

  return (
    <PaperProvider theme={theme}>
      <View style={{ backgroundColor: theme.colors.surface, flex: 1}}>
        <Appbar.Header mode='center-aligned' elevated>
          <Appbar.Action icon="information-outline" isLeading onPress={showDialog} />
          <Appbar.Content title="NGS" />
          <Appbar.Action icon="cancel" onPress={() => {}} />
        </Appbar.Header>
        <IntroDialogue visible={dialogueVisible} setVisible={setDialogueVisible}/>
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
 
