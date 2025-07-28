
import * as React from 'react';
import { Card, Text } from 'react-native-paper';

interface SurgeryTypeProps {
    title: string,
    type: string 
}

export function SurgeryType({title, type}: SurgeryTypeProps) {
    return (
        <Card mode="outlined">
            <Card.Content>
            <Text variant="titleLarge">{title}</Text>
            <Text variant="bodyMedium">{type}</Text>
            </Card.Content>
        </Card>
    );
}