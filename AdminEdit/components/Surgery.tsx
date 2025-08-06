
import { useRouter } from 'expo-router';
import * as React from 'react';
import { List, useTheme } from 'react-native-paper';
import { EditButtons } from './EditButtons';

interface SurgeryProps {
    surgery: any,
}

export function Surgery({surgery}: SurgeryProps) {
    const router = useRouter();
    const theme = useTheme();
    return (
        <List.Item title={surgery.name} right={(_) => <EditButtons database='surgery' item={surgery}/>}/>
    );
}

