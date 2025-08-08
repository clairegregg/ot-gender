
import { Router, useRouter } from 'expo-router';
import * as React from 'react';
import { Alert, Platform, View } from 'react-native';
import { Card, IconButton, List, Text, TouchableRipple, useTheme } from 'react-native-paper';

interface EditProps {
    database: string,
    item: any,
    refresh: () => void
}

async function DeleteItem(database: string, item: any, refresh: () => void){
    console.log("Trying to delete");

    const itemName = database === "welcome" ? item.title : item.name;
    const confirmMessage = `Are you sure you want to delete "${itemName}"?`;

    let confirmed = false;

    if (Platform.OS === 'web') {
        confirmed = window.confirm(confirmMessage);
    } else {
        await new Promise<void>((resolve) => {
        Alert.alert(
            "Are you sure?",
            confirmMessage,
            [
            { text: "Cancel", style: "cancel", onPress: () => resolve() },
            {
                text: "I'm Sure",
                onPress: () => {
                confirmed = true;
                resolve();
                },
            },
            ],
            { cancelable: true }
        );
    });
  }

  if (confirmed) {
    try {
      const response = await fetch(
        `https://backend.aisling.clairegregg.com/${database}/${item._id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      console.log("Item deleted successfully.");
      refresh()
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  }
}

function EditItem(router: Router, database: string, item: any) {
    if (database === "welcome") {
        router.navigate(`/editWelcome?id=${item._id}`)
    } else {
        router.navigate(`/editSurgery?id=${item._id}`)
    }
}

export function EditButtons({database, item, refresh}: EditProps) {
    const router = useRouter()
    return (
        <View style={{flexDirection: 'row'}}>
            <IconButton icon="pencil" onPress={() => {
                EditItem(router, database, item)
            }}/>
            <IconButton icon="trash-can" onPress={() => {
                DeleteItem(database, item, refresh)
            }}/>
        </View>
    );
}

