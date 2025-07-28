import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { SurgeryType } from '@/components/SurgeryType'

export interface SurgeryTypeSectionProps {
    title: string,
    list: any[],
}

export default function SurgeryTypeSection({title, list}: SurgeryTypeSectionProps) {

    let surgeryTypes = list.map((surgeryText) =>
    {
        return (
            <SurgeryType title={surgeryText.title} type={surgeryText.type} key={surgeryText.title}/>
        )
    });

    return (
        <View style={styles['.SurgeryTypeSection']}>
            <Text variant="titleLarge">{title}</Text>
            { surgeryTypes }
        </View>
    );
}

const styles = StyleSheet.create({
  ".SurgeryTypeSection": {
    display: "flex", 
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch"
  },
});
