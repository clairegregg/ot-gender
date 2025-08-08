import React from "react";
import { ScrollView, View } from "react-native";
import {
  TextInput,
  List,
  Button,
  IconButton,
  Portal,
  Snackbar,
  Text
} from 'react-native-paper';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {MarkdownTextInput, parseExpensiMark} from '@expensify/react-native-live-markdown';


export type consideration = {
  title: string,
  short_title: string,
  contents: string
}

export function emptyConsideration(): consideration {
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
  const [visible, setVisible] = React.useState(false);

  let considerationElements = considerations.map((_, index) =>
  {
    return (
    <React.Fragment>
        <Portal>
            <Snackbar visible={visible} onDismiss={() => setVisible(false)} action={{
                label: "OK",
                onPress: () => {
                    setVisible(false)
                }
            }}>
                Minimum one consideration is required!
            </Snackbar>
        </Portal>
        <List.Section key={index}>
        <View style={{flexDirection: "row"}}>
        <List.Subheader>Consideration {index+1}</List.Subheader>
        <IconButton icon="trash-can" onPress={ () => {
            if (considerations.length == 1) {
                setVisible(true)
            } else {
                const newConsiderations = considerations.filter((_, indexInArray) => indexInArray !== index);
                setConsiderations(newConsiderations);
            }
        }}/>
        </View>
        <Text variant="labelLarge">Title of consideration.</Text>
        <TextInput label="Title" mode="outlined" value={considerations[index].title} onChangeText={title => {
            const newConsiderations = [...considerations];
            newConsiderations[index] = {
            ...newConsiderations[index],
            title: title,
            };  
            setConsiderations(newConsiderations);
        }}/>
        <Text variant="labelLarge">Short version of title - this will be shown in the navigation bar.</Text>
        <TextInput label="Short Title" mode="outlined" value={considerations[index].short_title} onChangeText={short_title => {
            const newConsiderations = [...considerations];
            newConsiderations[index] = {
            ...newConsiderations[index],
            short_title: short_title,
            };  
            setConsiderations(newConsiderations);
        }}/>
        <Text variant="labelLarge">Contents of the OT consideration - formatted using markdown.</Text>
        <MarkdownTextInput value={considerations[index].contents} parser={parseExpensiMark} multiline={true} onChangeText={ contents => {
            const newConsiderations = [...considerations];
            newConsiderations[index] = {
            ...newConsiderations[index],
            contents: contents,
            };  
            setConsiderations(newConsiderations);
        }} />
        </List.Section>
    </React.Fragment>
    )
  })


  return (
    <ScrollView style={{ marginBottom: insets.bottom }}>
        <Text variant="labelLarge">Name of surgery</Text>
        <TextInput label="Name" mode="outlined" value={name} onChangeText={name => setName(name)}/>
        <Text variant="labelLarge">Primary association - eg "Masculinising Surgeries". This decides how surgeries are grouped on the home page.</Text>
        <TextInput label="Primary Association" mode="outlined" value={association} onChangeText={association => setAssociation(association)}/>
        <Text variant="labelLarge">Type of surgery - eg "Bottom Surgery". Displayed next to surgery name on home screen.</Text>
        <TextInput label="Type" mode="outlined" value={type} onChangeText={type => setType(type)}/>
        <Text variant="labelLarge">Summary of surgery. This can be formatted using markdown (https://www.markdownguide.org/basic-syntax/).</Text>
        <MarkdownTextInput value={summary} onChangeText={setSummary} parser={parseExpensiMark} multiline={true}/>
        <Text variant="labelLarge">Considerations for surgery from an OT perspective (minimum 1).</Text>
        <Button onPress={() => {
        const newConsiderations = [...considerations, emptyConsideration()];
        setConsiderations(newConsiderations);
        }}>
        Add OT Consideration
        </Button>
        {considerationElements}
    </ScrollView>
  );
}


