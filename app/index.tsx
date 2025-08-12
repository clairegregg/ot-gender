import * as React from 'react';
import {
  View,
  ScrollView,
  BackHandler,
  Platform,
  Linking,
  Alert
} from 'react-native';
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
  Appbar,
  ActivityIndicator,
  Text
} from 'react-native-paper';
import SurgeryTypeSection from '@/components/SurgeryTypeSection';
import { IntroDialogue } from '@/components/IntroDialogue';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const lightTheme = require('@/assets/themes/light.json')
const url = 'https://backend.aisling.clairegregg.com/content'; 

export default function Index() {
  const insets = useSafeAreaInsets();
  const [dialogueVisible, setDialogueVisible] = React.useState(true);
  const [surgeries, setSurgeries] = React.useState<any[]>([]);
  const [welcomes, setWelcomes] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  const showDialog = () => setDialogueVisible(true);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setSurgeries(data.surgeries || []);
        setWelcomes(data.welcomes || []);
      } catch (error) {
        console.error('Failed to fetch content:', error);
        Alert.alert("Error", "Could not load application data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const sections = React.useMemo(() => {
    const map = new Map<string, any[]>();
    surgeries.forEach(surgery => {
      const group = surgery.primary_association;
      if (map.has(group)) {
        map.get(group)?.push(surgery);
      } else {
        map.set(group, [surgery]);
      }
    });
    return map;
  }, [surgeries]);

  const surgeryTypeSections = Array.from(sections.entries()).map(([type, list]) => (
    <SurgeryTypeSection title={type} list={list} key={type} />
  ));

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
      <View style={{ backgroundColor: theme.colors.surface, flex: 1 }}>
        <Appbar.Header mode="center-aligned" elevated>
          <Appbar.Action icon="information-outline" isLeading onPress={showDialog} />
          <Appbar.Content title="[Service Name]" />
          <Appbar.Action
            icon="cancel"
            onPress={() => {
              if (Platform.OS === 'android') {
                BackHandler.exitApp();
              } else {
                Linking.openURL("https://www.google.com");
              }
            }}
          />
        </Appbar.Header>

        {loading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <React.Fragment>
          <IntroDialogue visible={dialogueVisible} setVisible={setDialogueVisible} welcomes={welcomes} />
          <ScrollView style={{ marginBottom: insets.bottom }}>
            <View style={{padding: 24}}>
            <Text variant="bodyLarge">
              Going through the surgical process will involve changes/disruptions to your personal routines and you are likely to have to manage changes and uncertainties throughout the process. 

              <br/>
              <br/>
              This app contains things to consider about the surgical process and how your day-to-day life/functioning will change. It also presents some strategies and suggestions to support you to manage these tasks/activities/occupations as independently as possible. However, it is still important to have a support person throughout this process, so consider sharing this resource with your support person. You can also use it to facilitate conversations with your support person about things to consider both pre- and post- surgery. Caregiver support is encouraged, depending on your desired level of independence.

              <br/>
              <br/>
              Many gender-affirming surgeries are not available in Ireland, so require travel to another country. This can present different challenges for different people, but many challenges can be overcome with sufficient planning and support from those around you, including the team at the NGS. This app contains information and strategies to support planning, organisation, time management, managing change, and more. If you feel you need more personalised support with any of the areas addressed in this app, please contact the service and referral to occupational therapy or another suitable profession can be discussed.

              <br/>
              <br/>
              With all of the content in this app, please consider guidelines from your surgical team first and foremost. Many of the strategies in this app can be adapted to various situations – if you require any support with this, please contact the service and referral to occupational therapy or another suitable profession can be discussed.
            </Text>
            </View>
            {surgeryTypeSections}
          </ScrollView>
          </React.Fragment>
        )}
      </View>
    </PaperProvider>
  );
}

const theme = {
  ...DefaultTheme,
  colors: lightTheme.colors,
};
