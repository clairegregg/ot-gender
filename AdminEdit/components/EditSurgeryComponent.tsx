import React from "react";
import { Linking, ScrollView, View } from "react-native";
import {
  TextInput,
  List,
  Button,
  IconButton,
  Portal,
  Snackbar,
  Text,
  useTheme
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
  const theme = useTheme()
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
        <View style={{flexDirection: "row", alignItems: "center"}}>
        <Text variant="titleMedium">Consideration {index+1}</Text>
        <IconButton icon="trash-can" iconColor={theme.colors.error} onPress={ () => {
            if (considerations.length == 1) {
                setVisible(true)
            } else {
                const newConsiderations = considerations.filter((_, indexInArray) => indexInArray !== index);
                setConsiderations(newConsiderations);
            }
        }}/>
        </View>
        <TextInput label="Title" mode="outlined" value={considerations[index].title} style={{marginBottom: 20}} onChangeText={title => {
            const newConsiderations = [...considerations];
            newConsiderations[index] = {
            ...newConsiderations[index],
            title: title,
            };  
            setConsiderations(newConsiderations);
        }}/>
        
        <TextInput label="Short Title" mode="outlined" value={considerations[index].short_title} style={{marginBottom: 20}} onChangeText={short_title => {
            const newConsiderations = [...considerations];
            newConsiderations[index] = {
            ...newConsiderations[index],
            short_title: short_title,
            };  
            setConsiderations(newConsiderations);
        }}/>
        <Text variant="labelLarge">Contents</Text>
        <Text variant="labelMedium">Formatted using markdown.</Text>
        <MarkdownTextInput style={{padding: 16, marginTop: 10, borderColor: theme.colors.outline, borderRadius: 5, color: theme.colors.onSurface}}
          value={considerations[index].contents} parser={parseExpensiMark} multiline={true} onChangeText={ contents => {
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
    <ScrollView style={{ marginBottom: insets.bottom, padding: 24 }}>
        <TextInput label="Surgery Name" mode="outlined" value={name} onChangeText={name => setName(name)} style={{marginBottom: 20}}/>
        
        <Text variant="labelLarge">Primary Association</Text>
        <Text variant="labelMedium">Decides how surgeries are grouped on the home page - e.g. "Masculinising Surgeries".</Text>
        <TextInput label="Primary Association" mode="outlined" value={association} onChangeText={association => setAssociation(association)} style={{marginBottom: 20, marginTop: 8}}/>
        
        <Text variant="labelLarge">Type of Surgery</Text>
        <Text variant="labelMedium">Displayed next to surgery name on home screen - e.g. "Bottom Surgery".</Text>
        <TextInput label="Type" mode="outlined" value={type} onChangeText={type => setType(type)} style={{marginBottom: 20, marginTop: 8}}/>
        
        <Text variant="labelLarge">Summary of Surgery</Text>
        <Text variant="labelMedium">This can be formatted using markdown (
          <Text onPress={() => Linking.openURL("https://www.markdownguide.org/basic-syntax/")}
            style={{color: theme.colors.primary}}>
            https://www.markdownguide.org/basic-syntax/
          </Text>
        )
        </Text>
        <View style={{marginBottom: 20}}>
          <MarkdownTextInput value={summary} onChangeText={setSummary} parser={parseExpensiMark} multiline={true} style={{padding: 16, marginTop: 10, borderColor: theme.colors.outline, borderRadius: 5, color: theme.colors.onSurface}}/>
        </View>
        <Text variant="labelLarge">OT Considerations</Text>
        <Text variant="labelMedium">Each surgery has one or more sections for OT considerations - e.g. pre-surgical, journey to/from surgery, etc. 
          <br/>
          Press the <Text style={{color: theme.colors.primary, fontWeight: 'bold'}}>Add OT Consideration</Text> button to add a new consideration.
          <br/>
          Each consideration consists of a <Text style={{color: theme.colors.primary, fontWeight: 'bold'}}>Title</Text>, <Text style={{color: theme.colors.primary, fontWeight: 'bold'}}>Short Title</Text> (displayed when navigating between sections), and <Text style={{color: theme.colors.primary, fontWeight: 'bold'}}>Contents</Text>. 
        </Text>
        <Button onPress={() => {
        const newConsiderations = [...considerations, emptyConsideration()];
        setConsiderations(newConsiderations);
        }} mode="contained-tonal" style={{marginVertical: 16}} >
        Add OT Consideration
        </Button>
        {considerationElements}
    </ScrollView>
  );
}


