import { useState } from "react";
import { StyleSheet, View, Text, Switch} from "react-native";

export default function BadgerNewsTagCard(props) {
    const [isEnabled, setIsEnabled] = useState(!props.enabled);

    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState);
        props.onToggle(props.tag, isEnabled);
    };

    return (
        <View style={[styles.card, props.style]}>
            <View style={{alignItems:'center'}}>
                <Text>Currently {isEnabled ? 'showing' : 'NOT showing'} <Text style={{fontWeight:'bold'}}>{props.tag}</Text> articles.</Text>
            </View>
            <View style={{alignItems: 'center', marginVertical: 20}}>
                <Switch
                    trackColor={{false:'grey', true:'red'}}
                    value={isEnabled}
                    onValueChange={toggleSwitch}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        padding: 16,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        shadowOffset: {
          width: 4,
          height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1,
        marginBottom: 20
    }
});