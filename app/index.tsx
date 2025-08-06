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
  ActivityIndicator
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
