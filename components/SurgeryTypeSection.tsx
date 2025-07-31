import { StyleSheet, View } from 'react-native';
import { Text, IconButton, List, useTheme } from 'react-native-paper';
import { SurgeryType } from '@/components/SurgeryType';

export interface SurgeryTypeSectionProps {
    title: string,
    list: any[],
}

export default function SurgeryTypeSection({title, list}: SurgeryTypeSectionProps) {
    let surgeryTypes = list.map((surgeryText) =>
    {
        return (
            <SurgeryType title={surgeryText.name} type={surgeryText.type} key={surgeryText.name}/>
        )
    });

    const theme = useTheme() 

    return (
        <View style={styles['.SurgeryTypeSection']}>
                <List.Accordion
                    title={title} 
                    titleStyle={{
                        fontSize: theme.fonts["titleLarge"].fontSize,
                        fontFamily: theme.fonts["titleLarge"].fontFamily,
                        fontStyle: theme.fonts["titleLarge"].fontStyle,
                        fontWeight: 500
                    }}
                    containerStyle={{
                        paddingHorizontal:10
                    }}>
                        <View style={styles['.CardList']}>
                            {surgeryTypes}
                        </View>
                </List.Accordion>
        </View>
    );
}



const styles = StyleSheet.create({
  ".SurgeryTypeSection": {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch",
    // padding: 15,
  },
  ".CardList": {
    paddingHorizontal: 10
  }
});
