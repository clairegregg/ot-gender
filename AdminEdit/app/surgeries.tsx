import { Surgery } from "@/components/Surgery";
import { useRouter } from "expo-router";
import React from "react";
import { Alert, ScrollView, View } from "react-native";
import {
  PaperProvider,
  Appbar,
  ActivityIndicator,
} from 'react-native-paper';
import { useSafeAreaInsets } from "react-native-safe-area-context";

const url = 'https://backend.aisling.clairegregg.com/surgery'; 

export default function Surgeries() {
  const insets = useSafeAreaInsets();
  const router = useRouter()
  const [surgeries, setSurgeries] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setSurgeries(data || []);
      } catch (error) {
        console.error('Failed to fetch content:', error);
        Alert.alert("Error", "Could not load application data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const surgeryElements = surgeries.map((surgery) => (
    <Surgery surgery={surgery} key={surgery.name}></Surgery>
  ))

  return (
    <PaperProvider>
      <View style={{ flex: 1 }}>
        <Appbar.Header elevated>
            <Appbar.BackAction onPress={() => {router.back()}}/>
            <Appbar.Content title="Surgeries" />
            <Appbar.Action icon={"plus"}/>
        </Appbar.Header>
      </View>
      {loading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <ScrollView style={{ marginBottom: insets.bottom }}>
            {surgeryElements}
          </ScrollView>
        )}
    </PaperProvider>
  );
}
