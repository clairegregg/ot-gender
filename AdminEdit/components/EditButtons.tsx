
import { useRouter } from 'expo-router';
import * as React from 'react';
import { Alert, View } from 'react-native';
import { Card, IconButton, List, Text, TouchableRipple, useTheme } from 'react-native-paper';

interface EditProps {
    database: string,
    item: any
}

function DeleteItem(database: string, item: any){
    Alert.alert("Are you sure?", `Are you sure you want to delete \"${database==="welcome"? item.title : item.name}\"?`, 
        [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {text: "I'm Sure", onPress: async () => {
        const response = await fetch(`https://backend.aisling.clairegregg.com/${database}/${item._id}`, {
            method: "DELETE"
        });
        if (!response.ok) throw new Error("Network response was not ok");
      }},
    ]
    )
}

export function EditButtons({database, item}: EditProps) {
    return (
        <View style={{flexDirection: 'row'}}>
            <IconButton icon="pencil"/>
            <IconButton icon="trash-can" onPress={() => DeleteItem(database, item)}/>
        </View>
    );
}

