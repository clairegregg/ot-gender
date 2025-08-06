
import { useRouter } from 'expo-router';
import * as React from 'react';
import { View } from 'react-native';
import { Card, IconButton, List, Text, TouchableRipple, useTheme } from 'react-native-paper';

interface EditProps {
    database: string,
    item: any
}

export function EditButtons({database, item}: EditProps) {
    return (
        <View style={{flexDirection: 'row'}}>
            <IconButton icon="pencil"/>
            <IconButton icon="trash-can"/>
        </View>
    );
}

