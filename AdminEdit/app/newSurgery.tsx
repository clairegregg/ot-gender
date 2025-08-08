import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";
import {
  PaperProvider,
  Appbar,
  Button,
  useTheme,
  MD3LightTheme,
} from 'react-native-paper';
import EditSurgery, {consideration, emptyConsideration} from "@/components/EditSurgeryComponent";


const url = 'https://backend.aisling.clairegregg.com/surgery'; 


export default function NewSurgery() {
  const router = useRouter()
  const theme = MD3LightTheme

  const [name, setName] = React.useState("");
  const [association, setAssociation] = React.useState("");
  const [type, setType] = React.useState("");
  const [summary, setSummary] = React.useState("");
  const [considerations, setConsiderations] = React.useState<consideration[]>([emptyConsideration()]);
  
  return (
    <PaperProvider theme={theme}>
      <View style={{ flex: 1, backgroundColor: theme.colors.surface }}>
        <Appbar.Header elevated>
            <Appbar.BackAction onPress={() => {router.back()}}/>
            <Appbar.Content title="Surgeries" />
        </Appbar.Header>
      
        <EditSurgery name={name} setName={setName} association={association} setAssociation={setAssociation} 
          type={type} setType={setType} summary={summary} setSummary={setSummary} considerations={considerations} setConsiderations={setConsiderations}/>
        <Button onPress={async () => {
          await addSurgery(name, association, type, summary, considerations)
          router.back()
        }}>
          Add this surgery
        </Button>
      </View>
    </PaperProvider>
  );
}

async function addSurgery(name: string, primary_association: string, type: string, summary: string, considerations: consideration[]) {
  let jsonConsiderations: any[] = []
  console.log(`considerations pre json are ${JSON.stringify(considerations)}`)
  for (let consideration of considerations){
    jsonConsiderations.push(
      {
        title: consideration.title,
        short_title: consideration.short_title,
        contents: consideration.contents
      }
    )
  }
  console.log(`considerations post json are ${JSON.stringify(considerations)}`)
  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: name,
      primary_association: primary_association,
      type: type,
      summary: summary,
      ot_considerations: jsonConsiderations
    }),
  });
}
