import React from "react";
import { Linking, ScrollView, View } from "react-native";
import {
  TextInput,
  List,
  Button,
  IconButton,
  Icon,
  useTheme,
  Text
} from 'react-native-paper';
import { useSafeAreaInsets } from "react-native-safe-area-context";
// import {MarkdownTextInput, parseExpensiMark} from '@expensify/react-native-live-markdown';

interface EditWelcomeProps {
    title: string,
    setTitle: React.Dispatch<React.SetStateAction<string>>,
    text: string,
    setText: React.Dispatch<React.SetStateAction<string>>,
    icons: string[],
    setIcons: React.Dispatch<React.SetStateAction<string[]>>
}

export default function EditWelcome({title, setTitle, text, setText, icons, setIcons}: EditWelcomeProps) {
  const insets = useSafeAreaInsets();
  const theme = useTheme()

  let iconElements = icons?.map((icon, index) =>
    {
      return (
          <List.Section key={index}>
          <View style={{flexDirection: "row", alignItems: "center"}}>
            <IconButton icon="trash-can" size={32} iconColor={theme.colors.error} onPress={ () => {
                  const newIcons = icons.filter((_, indexInArray) => indexInArray !== index);
                  setIcons(newIcons);
            }} />
            <TextInput label={`Icon ${index+1}`} mode="outlined" value={icons[index]} onChangeText={newValue => {
                const newIcons = [...icons];
                newIcons[index] = newValue
                setIcons(newIcons);
            }}/>
            <View style={{marginLeft: 16}}>
              <Icon source={icon} size={40} color={theme.colors.secondary}/>
            </View>
          </View>
          </List.Section>
      )
    })

  return (
    <ScrollView style={{ marginBottom: insets.bottom , padding: 24}}>
        <TextInput label="Title" mode="outlined" value={title} onChangeText={title => setTitle(title)} style={{marginBottom: 20}}/>
        <Text variant="labelLarge">Contents of welcome</Text>
        <Text variant="labelMedium">This can be formatted using markdown (
          <Text onPress={() => Linking.openURL("https://www.markdownguide.org/basic-syntax/")}
            style={{color: theme.colors.primary}}>
            https://www.markdownguide.org/basic-syntax/
          </Text>
        )
          </Text>
        {/* <MarkdownTextInput value={text} onChangeText={setText} parser={parseExpensiMark} multiline={true}/> style={{marginBottom: 20}}*/}
        <Text variant="labelLarge">Icons</Text>
        <Text variant="labelMedium">You can optionally include icons in the welcome message. They will appear below the text. 
          <br/>
          Press the <Text style={{color: theme.colors.primary, fontWeight: 'bold'}}>Add Icon</Text> button to add a new icon.
          <br/>
          Names of icons can be found at <Text onPress={() => Linking.openURL("https://www.markdownguide.org/basic-syntax/")}
            style={{color: theme.colors.primary}}>https://pictogrammers.com/library/mdi/</Text>, and icons can be previewed by filling in their names.
            </Text>
        <Button onPress={() => {
        const newIcons = [...icons, ""];
        setIcons(newIcons);
        }} mode="contained-tonal" style={{marginVertical: 16}} >
        Add Icon
        </Button>
        {iconElements}
    </ScrollView>
  );
}


