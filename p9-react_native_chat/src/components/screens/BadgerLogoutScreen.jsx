import { StyleSheet, Text, View, TouchableHighlight } from "react-native";

function BadgerLogoutScreen(props) {

    return <View style={styles.container}>
        <Text style={{fontSize: 24, marginTop: -100}}>Are you sure you're done?</Text>
        <Text>Come back soon!</Text>
        <Text/>
        <TouchableHighlight
            style={styles.logoutButton}
            onPress={props.handleLogout}
            underlayColor="darkred"
        >
            <Text style={styles.buttonText}>LOGOUT</Text>
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
    input: {
        height: 40,
        width: "50%",
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    logoutButton: {
        backgroundColor: 'darkred',
        padding: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default BadgerLogoutScreen;