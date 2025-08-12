import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Alert, View } from "react-native";
import {
  PaperProvider,
  Appbar,
  Button,
  useTheme,
  ActivityIndicator,
  MD3LightTheme,
} from 'react-native-paper';
import EditSurgery, {consideration} from "@/components/EditSurgeryComponent";


const url = 'https://backend.aisling.clairegregg.com/surgery'; 

type OTConsideration = {
    title: string,
    short_title: string,
    contents: string
}
type Surgery = {
    name: string,
    primary_association: string,
    type: string,
    summary: string,
    ot_considerations: OTConsideration[],
    _id: string
}
 
function emptySurgery() : Surgery{
    return {
        name: "",
        primary_association: "",
        type: "",
        summary: "",
        _id: "",
        ot_considerations: []
    }
}

const fetchSurgery = async (id: string, 
    setLoading: React.Dispatch<React.SetStateAction<boolean>>, setSurgery: React.Dispatch<React.SetStateAction<any>>,
    setName: React.Dispatch<React.SetStateAction<string>>, setAssociation: React.Dispatch<React.SetStateAction<string>>,
    setType: React.Dispatch<React.SetStateAction<string>>, setSummary: React.Dispatch<React.SetStateAction<string>>,
    setConsiderations: React.Dispatch<React.SetStateAction<consideration[]>>,
) => {
  setLoading(true);
  try {
    const response = await fetch(`${url}/${id}`);
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    setSurgery(data || []);
    console.log(data)
    setName(data.name)
    setAssociation(data.primary_association)
    setType(data.type)
    setSummary(data.summary)
    setConsiderations(data.ot_considerations)
  } catch (error) {
    console.error('Failed to fetch content:', error);
    Alert.alert("Error", "Could not load application data.");
  } finally {
    setLoading(false)
  }
};


export default function EditSurgeryPage() {
  const router = useRouter()
  const theme = MD3LightTheme
  const { id } = useLocalSearchParams<{id: string}>()
  const [surgery, setSurgery] = React.useState(emptySurgery)
  const [loading, setLoading] = React.useState(false)

  const [name, setName] = React.useState("");
  const [association, setAssociation] = React.useState("");
  const [type, setType] = React.useState("");
  const [summary, setSummary] = React.useState("");
  const [considerations, setConsiderations] = React.useState<consideration[]>([]);
  React.useEffect(() => {
        fetchSurgery(id, setLoading, setSurgery, setName, setAssociation, setType, setSummary, setConsiderations)
    }, []);
  
  return (
    <PaperProvider theme={theme}>
      <View style={{ flex: 1, backgroundColor: theme.colors.surface }}>
        <Appbar.Header elevated>
            <Appbar.BackAction onPress={() => {router.back()}}/>
            <Appbar.Content title="Surgeries" />
        </Appbar.Header>
      
        {loading ? (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size="large" />
            </View>
          ) : (
            <React.Fragment>
                <EditSurgery name={name} setName={setName} association={association} setAssociation={setAssociation} 
                type={type} setType={setType} summary={summary} setSummary={setSummary} considerations={considerations} setConsiderations={setConsiderations}/>
                <Button style={{margin: 24}} labelStyle={{fontSize: theme.fonts.titleMedium.fontSize, padding: 12}} mode="contained" onPress={async () => {
                await edit(surgery._id, name, association, type, summary, considerations)
                router.back()
                }}>
                Save Modifications
                </Button>
            </React.Fragment>
        )}
      </View>
    </PaperProvider>
  );
}

async function edit(id: string, name: string, primary_association: string, type: string, summary: string, considerations: consideration[]) {
  let jsonConsiderations: any[] = []
  for (let consideration of considerations){
    jsonConsiderations.push(
      {
        title: consideration.title,
        short_title: consideration.short_title,
        contents: consideration.contents
      }
    )
  }
  await fetch(`${url}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: name,
      primary_association: primary_association,
      type: type,
      summary: summary,
      ot_considerations: jsonConsiderations
    }),
  });
}
