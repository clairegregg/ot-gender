import { Surgery } from "@/components/Surgery";
import { useRouter } from "expo-router";
import React from "react";
import { Alert, ScrollView, View } from "react-native";
import {
  PaperProvider,
  Appbar,
  ActivityIndicator,
  TextInput,
  List,
} from 'react-native-paper';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {MarkdownTextInput, parseExpensiMark} from '@expensify/react-native-live-markdown';


type consideration = {
  title: string,
  short_title: string,
  contents: string
}

const url = 'https://backend.aisling.clairegregg.com/surgery'; 

export default function Surgeries() {
  const insets = useSafeAreaInsets();
  const router = useRouter()

  const [name, setName] = React.useState("");
  const [association, setAssociation] = React.useState("");
  const [type, setType] = React.useState("");
  const [summary, setSummary] = React.useState("");
  const [considerations, setConsiderations] = React.useState<consideration[]>([]);
  let considerationElements = considerations.map((_, index) =>
  {
    return <List.Section>
      <List.Subheader>Consideration ${index+1}</List.Subheader>
      <TextInput label="Title" mode="outlined" value={considerations[index].title} onChangeText={title => {
        considerations[index].title = title
        setConsiderations(considerations)
      }}/>
      <TextInput label="Short Title" mode="outlined" value={considerations[index].short_title} onChangeText={short_title => {
        considerations[index].short_title = short_title
        setConsiderations(considerations)
      }}/>
      <MarkdownTextInput value={considerations[index].contents} parser={parseExpensiMark} onChangeText={ contents => {
        considerations[index].contents = contents
        setConsiderations(considerations)
      }} />
    </List.Section>
  })


  return (
    <PaperProvider>
      <View style={{ flex: 1 }}>
        <Appbar.Header elevated>
            <Appbar.BackAction onPress={() => {router.back()}}/>
            <Appbar.Content title="Surgeries" />
            <Appbar.Action icon={"plus"}/>
        </Appbar.Header>
      </View>
      <ScrollView style={{ marginBottom: insets.bottom }}>
        <TextInput label="Name" mode="outlined" value={name} onChangeText={name => setName(name)}/>
        <TextInput label="Primary Association" mode="outlined" value={association} onChangeText={association => setAssociation(association)}/>
        <TextInput label="Type" mode="outlined" value={type} onChangeText={type => setType(type)}/>
        <MarkdownTextInput value={summary} onChangeText={setSummary} parser={parseExpensiMark}/>
        {considerationElements}
      </ScrollView>
    </PaperProvider>
  );
}
