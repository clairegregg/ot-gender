
import { useRouter } from 'expo-router';
import * as React from 'react';
import { Divider, List, useTheme } from 'react-native-paper';
import { EditButtons } from './EditButtons';

interface WelcomeProps {
    welcome: any,
    refresh: () => void,
}

export function Welcome({welcome, refresh}: WelcomeProps) {
    const router = useRouter();
    const theme = useTheme();
    return (
        <React.Fragment>
            <List.Item title={welcome.title} titleStyle={{fontWeight: 'bold'}} right={(_) => <EditButtons database='welcome' item={welcome} refresh={refresh}/>}/>
            <Divider/>
        </React.Fragment>
    );
}

