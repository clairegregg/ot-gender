import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, View } from "react-native";
import {
  PaperProvider,
  Appbar,
  TextInput,
  List,
  Button,
  IconButton,
  useTheme,
} from 'react-native-paper';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {MarkdownTextInput, parseExpensiMark} from '@expensify/react-native-live-markdown';


type consideration = {
  title: string,
  short_title: string,
  contents: string
}

const url = 'https://backend.aisling.clairegregg.com/surgery'; 

function emptyConsideration(): consideration {
  return {
    title: "",
    short_title: "",
    contents: ""
  }
}

export default function Surgeries() {
  const insets = useSafeAreaInsets();
  const router = useRouter()
  const theme = useTheme()

  const [name, setName] = React.useState("");
  const [association, setAssociation] = React.useState("");
  const [type, setType] = React.useState("");
  const [summary, setSummary] = React.useState("");
  const [considerations, setConsiderations] = React.useState<consideration[]>([]);
  let considerationElements = considerations.map((_, index) =>
  {
    return <List.Section>
      <View style={{flexDirection: "row"}}>
      <List.Subheader>Consideration {index+1}</List.Subheader>
      <IconButton icon="trash-can" onPress={ () => {
        const newConsiderations = considerations.filter((_, indexInArray) => indexInArray !== index);
        setConsiderations(newConsiderations);
      }}/>
      </View>
      <TextInput label="Title" mode="outlined" value={considerations[index].title} onChangeText={title => {
        const newConsiderations = [...considerations];
        newConsiderations[index] = {
          ...newConsiderations[index],
          title: title,
        };  
        setConsiderations(newConsiderations);
      }}/>
      <TextInput label="Short Title" mode="outlined" value={considerations[index].short_title} onChangeText={short_title => {
        const newConsiderations = [...considerations];
        newConsiderations[index] = {
          ...newConsiderations[index],
          short_title: short_title,
        };  
        setConsiderations(newConsiderations);
      }}/>
      <MarkdownTextInput value={considerations[index].contents} parser={parseExpensiMark} multiline={true} onChangeText={ contents => {
        const newConsiderations = [...considerations];
        newConsiderations[index] = {
          ...newConsiderations[index],
          contents: contents,
        };  
        setConsiderations(newConsiderations);
      }} />
    </List.Section>
  })


  return (
    <PaperProvider>
      <View style={{ flex: 1, backgroundColor: theme.colors.surface }}>
        <Appbar.Header elevated>
            <Appbar.BackAction onPress={() => {router.back()}}/>
            <Appbar.Content title="Surgeries" />
        </Appbar.Header>
      
        <ScrollView style={{ marginBottom: insets.bottom }}>
          <TextInput label="Name" mode="outlined" value={name} onChangeText={name => setName(name)}/>
          <TextInput label="Primary Association" mode="outlined" value={association} onChangeText={association => setAssociation(association)}/>
          <TextInput label="Type" mode="outlined" value={type} onChangeText={type => setType(type)}/>
          <MarkdownTextInput value={summary} onChangeText={setSummary} parser={parseExpensiMark} multiline={true}/>
          <Button onPress={() => {
            const newConsiderations = [...considerations, emptyConsideration()];
            setConsiderations(newConsiderations);
          }}>
            Add OT Consideration
          </Button>
          {considerationElements}
          <Button onPress={async () => {
            await addSurgery(name, association, type, summary, considerations)
            router.back()
          }}>
            Add this surgery
          </Button>
        </ScrollView>
      </View>
    </PaperProvider>
  );
}

async function addSurgery(name: string, primary_association: string, type: string, summary: string, considerations: consideration[]) {
  let jsonConsiderations: any[] = []
  for (let consideration of considerations){
    jsonConsiderations.push(
      {
        title: consideration.title,
        short_title: consideration.short_title,
        contents: consideration.contents
      }
    )
  }
  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: name,
      primary_association: primary_association,
      type: type,
      summary: summary,
      considerations: jsonConsiderations
    }),
  });
}
