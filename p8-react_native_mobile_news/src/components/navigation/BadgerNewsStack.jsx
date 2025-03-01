import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BadgerNewsScreen from "../screens/BadgerNewsScreen";
import BadgerArticleScreen from "../screens/BadgerArticleScreen"

const Stack = createNativeStackNavigator();

function BadgerNewsStack(props){
    return(
        <Stack.Navigator>
            <Stack.Screen name="Articles" component={BadgerNewsScreen}/>
            <Stack.Screen name="Article" component={BadgerArticleScreen}/>
        </Stack.Navigator>
    )
}

export default BadgerNewsStack