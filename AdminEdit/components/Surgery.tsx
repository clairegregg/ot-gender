
import { useRouter } from 'expo-router';
import * as React from 'react';
import { Divider, List, useTheme } from 'react-native-paper';
import { EditButtons } from './EditButtons';
import { View } from 'react-native';

interface SurgeryProps {
    surgery: any,
    refresh: () => void
}

export function Surgery({surgery, refresh}: SurgeryProps) {
    const router = useRouter();
    const theme = useTheme();
    return (
        <React.Fragment>
            <List.Item title={surgery.name} titleStyle={{fontWeight: 'bold'}} right={(_) => <EditButtons database='surgery' item={surgery} refresh={refresh}/>}/>
            <Divider/>
        </React.Fragment>
        
    );
}

