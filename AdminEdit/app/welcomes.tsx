import { Surgery } from "@/components/Surgery";
import { Welcome } from "@/components/Welcome";
import { useRouter } from "expo-router";
import React from "react";
import { Alert, ScrollView, View } from "react-native";
import {
  PaperProvider,
  Appbar,
  ActivityIndicator,
} from 'react-native-paper';
import { useSafeAreaInsets } from "react-native-safe-area-context";

const url = 'https://backend.aisling.clairegregg.com/welcome'; 

export default function Welcomes() {
  const insets = useSafeAreaInsets();
  const router = useRouter()
  const [welcomes, setWelcomes] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
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
    fetchData();
  }, []);

  const welcomeElements = welcomes.map((welcome) => (
    <Welcome welcome={welcome} key={welcome.title}/>
  ))

  return (
    <PaperProvider>
      <View style={{ flex: 1 }}>
        <Appbar.Header elevated>
            <Appbar.BackAction onPress={() => {router.back()}}/>
            <Appbar.Content title="Welcomes" />
            <Appbar.Action icon={"plus"}/>
        </Appbar.Header>
      </View>
      {loading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <ScrollView style={{ marginBottom: insets.bottom }}>
            {welcomeElements}
          </ScrollView>
        )}
    </PaperProvider>
  );
}
