import React from "react";
import { ScrollView, View } from "react-native";
import {
  TextInput,
  List,
  Button,
  IconButton,
  Icon,
  useTheme,
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
        <TextInput label="Title" mode="outlined" value={title} onChangeText={title => setTitle(title)}/>
        {/* <MarkdownTextInput value={text} onChangeText={setText} parser={parseExpensiMark} multiline={true}/> */}
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


