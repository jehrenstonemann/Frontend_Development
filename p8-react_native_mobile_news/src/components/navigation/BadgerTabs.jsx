import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, Octicons } from "@expo/vector-icons";
import BadgerPreferencesScreen from "../screens/BadgerPreferencesScreen";
import BadgerNewsStack from "./BadgerNewsStack";

const Tab = createBottomTabNavigator();

function BadgerTabs(props) {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;

                    if (route.name === 'News') {
                        iconName = 'newspaper-outline';
                    } else if (route.name === 'Preferences') {
                        iconName = 'gear';
                    }

                    return route.name === 'News' ? <Ionicons name={iconName} size={size} color={color} /> : <Octicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'red',
                tabBarInactiveTintColor: 'grey',
                tabBarLabelStyle: ({ focused }) => ({ color: focused ? 'red' : 'grey' }), // Set text color based on focused state
            })}
        >
            <Tab.Screen name="News" component={BadgerNewsStack} options={{ headerShown: false }} />
            <Tab.Screen name="Preferences" component={BadgerPreferencesScreen} />
        </Tab.Navigator>
    );
}

export default BadgerTabs;