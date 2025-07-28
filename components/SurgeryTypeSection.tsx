import { StyleSheet, View } from 'react-native';
import { Text, IconButton, Icon } from 'react-native-paper';
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
            <View style={styles['.SurgeryTypeSectionTitleView']}>
                <Text variant="titleLarge" style={styles['.SurgeryTypeSectionTitle']}>{title}</Text>
                <IconButton icon="triangle-small-down" onPress={() => console.log('Pressed')}/>
            </View>
            { surgeryTypes }
        </View>
    );
}

const styles = StyleSheet.create({
  ".SurgeryTypeSection": {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch",
    padding: 15,
  },
  ".SurgeryTypeSectionTitleView": {
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center"
  },
  ".SurgeryTypeSectionTitle": {
    fontWeight: "bold",
  },
});
