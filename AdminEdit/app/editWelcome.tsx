import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Alert, View } from "react-native";
import {
  PaperProvider,
  Appbar,
  Button,
  useTheme,
  ActivityIndicator,
} from 'react-native-paper';
import EditSurgery, {consideration, emptyConsideration} from "@/components/EditSurgeryComponent";
import EditWelcome from "@/components/EditWelcomeComponent";


const url = 'https://backend.aisling.clairegregg.com/welcome'; 

type Welcome = {
    title: string,
    text: string,
    icons: string[],
    _id: string
}
 
function emptyWelcome() : Welcome{
    return {
        title: "",
        text: "",
        icons: [],
        _id: ""
    }
}

const fetchWelcome = async (id: string, 
    setLoading: React.Dispatch<React.SetStateAction<boolean>>, setWelcome: React.Dispatch<React.SetStateAction<any>>,
    setTitle: React.Dispatch<React.SetStateAction<string>>, setText: React.Dispatch<React.SetStateAction<string>>,
    setIcons: React.Dispatch<React.SetStateAction<string[]>>,
) => {
  setLoading(true);
  try {
    const response = await fetch(`${url}/${id}`);
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    console.log(data)
    setWelcome(data || []);
    setTitle(data.title)
    setText(data.text)
    setIcons(data.icons)
  } catch (error) {
    console.error('Failed to fetch content:', error);
    Alert.alert("Error", "Could not load application data.");
  } finally {
    setLoading(false)
  }
};


export default function EditSurgeryPage() {
  const router = useRouter()
  const theme = useTheme()
  const { id } = useLocalSearchParams<{id: string}>()
  const [welcome, setWelcome] = React.useState(emptyWelcome())
  const [loading, setLoading] = React.useState(false)

  const [title, setTitle] = React.useState("");
  const [text, setText] = React.useState("");
  const [icons, setIcons] = React.useState<string[]>([]);
  React.useEffect(() => {
        fetchWelcome(id, setLoading, setWelcome, setTitle, setText, setIcons)
    }, []);
  
  return (
    <PaperProvider>
      <View style={{ flex: 1, backgroundColor: theme.colors.surface }}>
        <Appbar.Header elevated>
            <Appbar.BackAction onPress={() => {router.back()}}/>
            <Appbar.Content title="Editing Welcome Message" />
        </Appbar.Header>
      
        {loading ? (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size="large" />
            </View>
          ) : (
            <React.Fragment>
                <EditWelcome title={title} setTitle={setTitle} text={text} setText={setText} icons={icons} setIcons={setIcons} />
                <Button onPress={async () => {
                await edit(welcome._id, title, text, icons)
                router.back()
                }}>
                Save modifications to this welcome
                </Button>
            </React.Fragment>
        )}
      </View>
    </PaperProvider>
  );
}

async function edit(id: string, title: string, text: string, icons: string[]) {
  await fetch(`${url}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: title,
      text: text,
      icons: icons,
    }),
  });
}
