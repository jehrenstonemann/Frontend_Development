import { StyleSheet, Text, View, TouchableHighlight } from "react-native";

function BadgerConversionScreen(props) {

    return <View style={styles.container}>
        <Text style={{fontSize: 24, marginTop: -100}}>Ready to signup?</Text>
        <Text>Join BadgerChat to be able to make posts!</Text>
        <Text/>
        <TouchableHighlight
            style={styles.signUpButton}
            onPress={() => {
                props.setIsRegistering(true);
                props.setIsLoggedIn(false);
                props.setIsGuest(false);
            }}
            underlayColor="darkred"
        >
            <Text style={styles.buttonText}>SIGNUP!</Text>
        </TouchableHighlight>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    signUpButton: {
        backgroundColor: 'darkred',
        padding: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    }
});

export default BadgerConversionScreen;