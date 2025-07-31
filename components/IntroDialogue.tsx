import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Dialog, Divider, Icon, IconButton, Portal, Text, useTheme } from 'react-native-paper';

interface DialogueProps {
    visible: boolean, 
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const data = require('@/constants/ApplicationData.json')

export function IntroDialogue({visible, setVisible}: DialogueProps) {
    const hideDialog = () => setVisible(false);

    const themes = useTheme()

    const [dialogueIndex, setIndex] = useState(0);
    const maxIndex = data.welcome_dialogues.length - 1
    const minIndex = 0
    const decrIndex = () => setIndex(Math.max(dialogueIndex-1, minIndex))
    const incrIndex = () => setIndex(Math.min(dialogueIndex+1, maxIndex))
    let dialogues: React.JSX.Element[] = []
    for (let dialogueData of data.welcome_dialogues){
        let icons: any = null
        if (dialogueData.icons.length > 0) {
            let listOfIcons: React.JSX.Element[] = []
            for (let icon of dialogueData.icons) {
                listOfIcons.push(
                    <View style={{margin:6}}>
                        <Icon source={icon} size={32} color={themes.colors.secondary}/>
                    </View>
                )
            }
            icons = (
                <View style={{flexDirection: 'row', justifyContent: 'space-around', marginBottom: 24}}>
                    {listOfIcons}
                </View>
            )
        }

        dialogues.push(
        <Dialog visible={visible} onDismiss={hideDialog}>
            <View style={{flexDirection: 'row', alignContent: 'center'}}>
                <Dialog.Title style={{fontSize: themes.fonts.titleLarge.fontSize, flexShrink: 2}}>{dialogueData.title}</Dialog.Title>
                <Dialog.Actions style={{paddingBottom: 0}}>
                    <IconButton icon="close" onPress={hideDialog} />
                </Dialog.Actions>
            </View>
            <Dialog.Content>
                <Text variant="bodyMedium">{dialogueData.text}</Text>
            </Dialog.Content>

            {icons}

            <Divider/>
            <View style={{flexDirection: 'row'}}>
                <Dialog.Actions style={styles['.CentreButton']}>
                    <IconButton icon="chevron-left" onPress={decrIndex}/>
                </Dialog.Actions>
                <Dialog.Actions style={styles['.CentreButton']}>
                    <IconButton icon="chevron-right" onPress={incrIndex}/>
                </Dialog.Actions>
            </View>
            
        </Dialog>)
    }


    return (
        <View>
            <Portal>
                {dialogues[dialogueIndex]}
            </Portal>
        </View>
    );
};

const styles = StyleSheet.create({
    '.CentreButton': {
        justifyContent: 'center',
        padding: 24
    }
})