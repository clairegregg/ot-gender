import * as React from 'react';
import { BackHandler, Linking, Platform, ScrollView, View, ActivityIndicator, Alert } from 'react-native';
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
} from 'react-native-paper-tabs';
import { OtReccomendationsScreen } from '@/components/OtReccomendationSection';

const lightTheme = require('@/assets/themes/light.json');

type OtConsideration = {
  title: string;
  short_title: string;
  contents: string;
};

export default function OtSupports() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const [surgery, setSurgery] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchSurgery = async () => {
      try {
        const response = await fetch(`https://backend.aisling.clairegregg.com/surgery/${id}`);
        if (!response.ok) throw new Error('Failed to fetch surgery');
        const data = await response.json();
        setSurgery(data);
      } catch (err) {
        console.error(err);
        Alert.alert('Error', 'Could not load surgery details.');
      } finally {
        setLoading(false);
      }
    };
    fetchSurgery();
  }, [id]);

  if (loading) {
    return (
      <PaperProvider theme={theme}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      </PaperProvider>
    );
  }

  if (!surgery) {
    return (
      <PaperProvider theme={theme}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Appbar.Header elevated>
            <Appbar.BackAction onPress={() => router.back()} />
            <Appbar.Content title="Not Found" />
          </Appbar.Header>
          <View style={{ padding: 20 }}>
            <Appbar.Content title="Surgery not found" />
          </View>
        </View>
      </PaperProvider>
    );
  }

  let tabs = surgery.ot_considerations.map(({ title, short_title, contents }: OtConsideration) => (
    <TabScreen label={short_title} key={short_title}>
      <OtReccomendationsScreen recommendationType={title} recommendations={contents} />
    </TabScreen>
  ));

  tabs.unshift(
    <TabScreen label="Summary" key="Summary">
      <OtReccomendationsScreen recommendationType="Summary" recommendations={surgery.summary} />
    </TabScreen>
  );

  return (
    <PaperProvider theme={theme}>
      <View style={{ backgroundColor: theme.colors.surface, flex: 1 }}>
        <Appbar.Header elevated>
          <Appbar.BackAction onPress={() => router.back()} />
          <Appbar.Content title={surgery.name} />
          <Appbar.Action
            icon="cancel"
            onPress={() => {
              if (Platform.OS === 'android') {
                BackHandler.exitApp();
              } else {
                Linking.openURL('https://www.google.com');
              }
            }}
          />
        </Appbar.Header>
        <TabsProvider>
          <Tabs mode="scrollable" showLeadingSpace={false}>
            {tabs}
          </Tabs>
        </TabsProvider>
      </View>
    </PaperProvider>
  );
}

const theme = {
  ...DefaultTheme,
  colors: lightTheme.colors,
};
