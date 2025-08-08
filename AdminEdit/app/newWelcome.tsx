import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";
import {
  PaperProvider,
  Appbar,
  Button,
  useTheme,
} from 'react-native-paper';
import EditWelcome from "@/components/EditWelcomeComponent";


const url = 'https://backend.aisling.clairegregg.com/welcome'; 


export default function NewWelcome() {
  const router = useRouter()
  const theme = useTheme()

  const [title, setTitle] = React.useState("");
  const [text, setText] = React.useState("");
  const [icons, setIcons] = React.useState<string[]>([]);
  
  return (
    <PaperProvider>
      <View style={{ flex: 1, backgroundColor: theme.colors.surface }}>
        <Appbar.Header elevated>
            <Appbar.BackAction onPress={() => {router.back()}}/>
            <Appbar.Content title="New Welcome Message" />
        </Appbar.Header>
      
        <EditWelcome title={title} setTitle={setTitle} text={text} setText={setText} icons={icons} setIcons={setIcons} />
        <Button onPress={async () => {
          await addWelcome(title, text, icons)
          router.back()
        }}>
          Add this welcome message
        </Button>
      </View>
    </PaperProvider>
  );
}

async function addWelcome(title: string, text: string, icons: string[]) {
  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: title,
      text: text,
      icons: icons,
    }),
  });
}
