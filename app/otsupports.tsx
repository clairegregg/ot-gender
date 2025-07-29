import * as React from 'react';
import { ScrollView, View } from 'react-native';
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
  Appbar
} from 'react-native-paper';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  TabsProvider,
  Tabs,
  TabScreen,
  useTabIndex,
  useTabNavigation,
} from 'react-native-paper-tabs';
import { OtReccomendationsScreen } from '@/components/OtReccomendationSection';

const data = require('@/constants/ApplicationData.json')
const lightTheme = require('@/assets/themes/light.json')
const darkTheme = require('@/assets/themes/dark.json')

type otConsideration = {
  title: string,
  short_title: string,
  contents: string
}

export default function OtSupports() {
    const router = useRouter()
    // TODO: Remove surgeryType as a parameter here, if a surgery is masculinising or feminising should not matter. Should be fixed with proper data structure
    const { surgeryName, surgeryType } = useLocalSearchParams<{surgeryName: string, surgeryType: string}>()
    const otReccomendation = data.surgeries[0].list[0].ot_considerations[0]

    let surgery: any;

    // TODO: remove with improved data structure
    for (let typeSection of data.surgeries){
      if (typeSection.title === surgeryType){
        for (let specificSurgery of typeSection.list) {
          if (specificSurgery.title === surgeryName) {
            surgery = specificSurgery
          }
        }
      } 
    };

    // // TODO: add summary somewhere
    let tabs = surgery.ot_considerations.map(({title, short_title, contents}: otConsideration) =>
      {
          return (
              <TabScreen label={short_title} key={short_title}>
                <OtReccomendationsScreen recommendationType={title} recommendations={contents}/>
              </TabScreen> 
          )
      });
    
    return (
      <PaperProvider theme={theme}>
        <View style={{ backgroundColor: theme.colors.surface, flex: 1}}>
          <Appbar.Header elevated>
            <Appbar.BackAction onPress={() => {router.back()}}/>
            <Appbar.Content title={surgeryName} />
            <Appbar.Action icon="cancel" onPress={() => {}} />
          </Appbar.Header>
          <TabsProvider>
            <Tabs mode='scrollable' showLeadingSpace={false}>
              { tabs }
            </Tabs>
          </TabsProvider>
        </View>
      </PaperProvider>
    );
}

const theme = {
  ...DefaultTheme,
  colors: lightTheme.colors
};
 
