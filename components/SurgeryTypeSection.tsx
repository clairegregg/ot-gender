import { View } from 'react-native';
import StyleSheet from 'react-native-media-query';
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
        <View style={styles.surgeryTypeSection} dataSet={{ media: ids.surgeryTypeSection }}>
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
                        <View style={styles.cardList} dataSet={{ media: ids.cardList }}>
                            {surgeryTypes}
                        </View>
                </List.Accordion>
        </View>
    );
}



const {ids, styles} = StyleSheet.create({
  surgeryTypeSection: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch",
  },
  cardList: {
    paddingHorizontal: 10,
    "@media (min-width: 600px)": {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-evenly"
    }
  }
});
