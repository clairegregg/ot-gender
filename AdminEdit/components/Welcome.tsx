
import { useRouter } from 'expo-router';
import * as React from 'react';
import { List, useTheme } from 'react-native-paper';
import { EditButtons } from './EditButtons';

interface WelcomeProps {
    welcome: any,
}

export function Welcome({welcome}: WelcomeProps) {
    const router = useRouter();
    const theme = useTheme();
    return (
        <List.Item title={welcome.title} right={(_) => <EditButtons database='welcomes' item={welcome}/>}/>
    );
}

