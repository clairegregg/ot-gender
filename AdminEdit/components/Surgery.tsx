
import { useRouter } from 'expo-router';
import * as React from 'react';
import { List, useTheme } from 'react-native-paper';
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
        <View style={{flexDirection: "row"}}>
            <List.Item title={surgery.name} />
            <EditButtons database='surgery' item={surgery} refresh={refresh}/>
        </View>
        
    );
}

