import * as React from 'react';
import { BackHandler, Linking, Platform, ScrollView, View } from 'react-native';
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
    const { surgeryName } = useLocalSearchParams<{surgeryName: string}>()
    
    let surgery: any;
    for (let specificSurgery of data.surgeries){
      if (specificSurgery.name === surgeryName){  
        surgery = specificSurgery
      } 
    };

    let tabs = surgery.ot_considerations.map(({title, short_title, contents}: otConsideration) =>
      {
          return (
              <TabScreen label={short_title} key={short_title}>
                <OtReccomendationsScreen recommendationType={title} recommendations={contents}/>
              </TabScreen> 
          )
      });
    // Add summary before
    tabs.unshift(
      <TabScreen label="Summary" key="Summary">
        <OtReccomendationsScreen recommendationType={"Summary"} recommendations={surgery.summary}/>
      </TabScreen> 
    )
    
    return (
      <PaperProvider theme={theme}>
        <View style={{ backgroundColor: theme.colors.surface, flex: 1}}>
          <Appbar.Header elevated>
            <Appbar.BackAction onPress={() => {router.back()}}/>
            <Appbar.Content title={surgeryName} />
            <Appbar.Action icon="cancel" onPress={() => {
              if (Platform.OS === 'android') {
                BackHandler.exitApp()
              } else {
                Linking.openURL("https://www.google.com")
              }    
            }} />
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
 
