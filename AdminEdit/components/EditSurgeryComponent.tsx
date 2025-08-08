import React from "react";
import { ScrollView, View } from "react-native";
import {
  TextInput,
  List,
  Button,
  IconButton,
} from 'react-native-paper';
import { useSafeAreaInsets } from "react-native-safe-area-context";
// import {MarkdownTextInput, parseExpensiMark} from '@expensify/react-native-live-markdown';


export type consideration = {
  title: string,
  short_title: string,
  contents: string
}

function emptyConsideration(): consideration {
  return {
    title: "",
    short_title: "",
    contents: ""
  }
}

interface EditSurgeryProps {
    name: string,
    setName: React.Dispatch<React.SetStateAction<string>>,
    association: string,
    setAssociation: React.Dispatch<React.SetStateAction<string>>,
    type: string,
    setType: React.Dispatch<React.SetStateAction<string>>,
    summary: string,
    setSummary: React.Dispatch<React.SetStateAction<string>>,
    considerations: consideration[],
    setConsiderations: React.Dispatch<React.SetStateAction<consideration[]>>
}

export default function EditSurgery({name, setName, association, setAssociation, type, setType, summary, setSummary, considerations, setConsiderations}: EditSurgeryProps) {
  const insets = useSafeAreaInsets();

  let considerationElements = considerations.map((_, index) =>
  {
    return <List.Section key={index}>
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
        console.log(`Title updated, so ${JSON.stringify(considerations)}`)
      }}/>
      <TextInput label="Short Title" mode="outlined" value={considerations[index].short_title} onChangeText={short_title => {
        const newConsiderations = [...considerations];
        newConsiderations[index] = {
          ...newConsiderations[index],
          short_title: short_title,
        };  
        setConsiderations(newConsiderations);
        console.log(`Short title updated, so ${JSON.stringify(considerations)}`)
      }}/>
      {/* <MarkdownTextInput value={considerations[index].contents} parser={parseExpensiMark} multiline={true} onChangeText={ contents => {
        const newConsiderations = [...considerations];
        newConsiderations[index] = {
          ...newConsiderations[index],
          contents: contents,
        };  
        setConsiderations(newConsiderations);
      }} /> */}
    </List.Section>
  })


  return (
    <ScrollView style={{ marginBottom: insets.bottom }}>
        <TextInput label="Name" mode="outlined" value={name} onChangeText={name => setName(name)}/>
        <TextInput label="Primary Association" mode="outlined" value={association} onChangeText={association => setAssociation(association)}/>
        <TextInput label="Type" mode="outlined" value={type} onChangeText={type => setType(type)}/>
        {/* <MarkdownTextInput value={summary} onChangeText={setSummary} parser={parseExpensiMark} multiline={true}/> */}
        <Button onPress={() => {
        const newConsiderations = [...considerations, emptyConsideration()];
        setConsiderations(newConsiderations);
        console.log(`New consideration added, so ${JSON.stringify(considerations)}`)
        }}>
        Add OT Consideration
        </Button>
        {considerationElements}
    </ScrollView>
  );
}


