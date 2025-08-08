import { Surgery } from "@/components/Surgery";
import { Welcome } from "@/components/Welcome";
import { useFocusEffect, useRouter } from "expo-router";
import React from "react";
import { Alert, ScrollView, View } from "react-native";
import {
  PaperProvider,
  Appbar,
  ActivityIndicator,
  useTheme,
  Text,
  MD3LightTheme
} from 'react-native-paper';
import { useSafeAreaInsets } from "react-native-safe-area-context";

const url = 'https://backend.aisling.clairegregg.com/welcome'; 

const fetchWelcomes = async (setLoading: React.Dispatch<React.SetStateAction<boolean>>, setWelcomes: React.Dispatch<React.SetStateAction<any[]>>) => {
  setLoading(true);
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    setWelcomes(data || []);
  } catch (error) {
    console.error('Failed to fetch content:', error);
    Alert.alert("Error", "Could not load application data.");
  } finally {
    setLoading(false);
  }
};

export default function Welcomes() {
  const insets = useSafeAreaInsets();
  const router = useRouter()
  const theme = MD3LightTheme
  const [welcomes, setWelcomes] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchWelcomes(setLoading, setWelcomes)
  }, []);
  const refreshWelcomes = () => {
    fetchWelcomes(setLoading, setWelcomes)
  }
  useFocusEffect(
    React.useCallback(() => {
      refreshWelcomes()
      return () => {};
    }, [])
  );

  const welcomeElements = welcomes.map((welcome) => (
    <Welcome welcome={welcome} key={welcome.title} refresh={refreshWelcomes}/>
  ))

  return (
    <PaperProvider theme={theme}>
      <View style={{ flex: 1, backgroundColor: theme.colors.surface }}>
        <Appbar.Header elevated>
            <Appbar.BackAction onPress={() => {router.back()}}/>
            <Appbar.Content title="Welcomes" />
            <Appbar.Action icon={"plus"} onPress={() => {router.navigate('/newWelcome')}}/>
        </Appbar.Header>
        {loading ? (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size="large" />
            </View>
          ) : (
            <ScrollView style={{ marginBottom: insets.bottom }}>
              <Text>{`
                  These are the welcome messages displayed when a user first launches the app, labelled here by their titles.

                  These are displayed to the user in the order shown here.
              `}
              </Text>
              {welcomeElements}
            </ScrollView>
          )}
      </View>
    </PaperProvider>
  );
}
