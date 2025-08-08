
import { useRouter } from 'expo-router';
import * as React from 'react';
import { StyleSheet, TouchableHighlight, TouchableOpacity } from 'react-native';
import { Card, Text, TouchableRipple, useTheme } from 'react-native-paper';

interface SurgeryTypeProps {
    title: string,
    type: string,
    _id: string
}

export function SurgeryType({title, type, _id}: SurgeryTypeProps) {
    const router = useRouter();
    const theme = useTheme();
    return (
        <TouchableHighlight onPress={() => {router.navigate(`/otsupports?id=${_id}`)}} 
            style={{ flex:1, minWidth: 300}} underlayColor={theme.colors.surface}>
            <Card mode="contained" style={styles['.SurgeryTypeCard']} >
                <Card.Content>
                <Text variant="titleMedium">{title}</Text>
                <Text variant="bodyMedium">{type}</Text>
                </Card.Content>
            </Card>
        </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
  ".SurgeryTypeCard": {
    marginVertical: 5,
    marginHorizontal: 10
  }
});
