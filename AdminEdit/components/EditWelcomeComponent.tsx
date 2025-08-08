import React from "react";
import { ScrollView, View } from "react-native";
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
          <View style={{flexDirection: "row"}}>
          <List.Subheader>Icon {index+1}</List.Subheader>
          <IconButton icon="trash-can" onPress={ () => {
                const newIcons = icons.filter((_, indexInArray) => indexInArray !== index);
                setIcons(newIcons);
          }}/>
          </View>
          <View style={{flexDirection: "row"}}>
            <TextInput label="Icon name" mode="outlined" value={icons[index]} onChangeText={newValue => {
                const newIcons = [...icons];
                newIcons[index] = newValue
                setIcons(newIcons);
            }}/>
            <Icon source={icon} size={32} color={theme.colors.secondary}/>
          </View>
          </List.Section>
      )
    })

  return (
    <ScrollView style={{ marginBottom: insets.bottom }}>
        <Text variant="labelLarge">Title of welcome.</Text>
        <TextInput label="Title" mode="outlined" value={title} onChangeText={title => setTitle(title)}/>
        <Text variant="labelLarge">Contents of welcome. This can be formatted using markdown (https://www.markdownguide.org/basic-syntax/).</Text>
        {/* <MarkdownTextInput value={text} onChangeText={setText} parser={parseExpensiMark} multiline={true}/> */}
        <Text variant="labelLarge">Icons - you can optionally include icons in the welcome message, which will appear below the text. Put the name of the icon here to see a preview. Icons can be found at https://pictogrammers.com/library/mdi/</Text>
        <Button onPress={() => {
        const newIcons = [...icons, ""];
        setIcons(newIcons);
        }}>
        Add Icon
        </Button>
        {iconElements}
    </ScrollView>
  );
}


