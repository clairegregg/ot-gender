
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';

interface SurgeryTypeProps {
    title: string,
    type: string 
}

export function SurgeryType({title, type}: SurgeryTypeProps) {
    return (
        <Card mode="outlined" style={styles['.SurgeryTypeCard']}>
            <Card.Content>
            <Text variant="titleLarge">{title}</Text>
            <Text variant="bodyMedium">{type}</Text>
            </Card.Content>
        </Card>
    );
}

const styles = StyleSheet.create({
  ".SurgeryTypeCard": {
    marginVertical: 5
  }
});
