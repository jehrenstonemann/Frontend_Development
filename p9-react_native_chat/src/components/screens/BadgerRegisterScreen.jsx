import { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableHighlight } from "react-native";

function BadgerRegisterScreen(props) {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordAgain, setPasswordAgain] = useState('');

    const onChangeUserName = (input) => {
        setUserName(input);
    };

    const onChangePassword = (input) => {
        setPassword(input);
    };

    const onChangePasswordAgain = (input) => {
        setPasswordAgain(input);
    }

    return <View style={styles.container}>
        <Text style={{ fontSize: 36 }}>Join BadgerChat!</Text>
        <View style={styles.inputContainer}>
            <Text>UserName</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeUserName}
                value={userName}
                autoCapitalize="none"
            />
            <Text>Password</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangePassword}
                value={password}
                secureTextEntry={true}
                autoCapitalize="none"
            />
            <Text>Confirm Password</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangePasswordAgain}
                value={passwordAgain}
                secureTextEntry={true}
                autoCapitalize="none"
            />
            <Text style={styles.errorText}>{props.message}</Text>
        </View>
        <View style={styles.buttonContainer}>
            <TouchableHighlight
                style={styles.signUPButton}
                onPress={() => props.handleSignup(userName, password, passwordAgain)}
                underlayColor="darkgrey"
            >
                <Text style={styles.buttonText}>SIGNUP</Text>
            </TouchableHighlight>
            <TouchableHighlight
                style={styles.nevermindButton}
                onPress={() => props.setIsRegistering(false)}
                underlayColor="darkgrey"
            >
                <Text style={styles.buttonText}>NEVERMIND!</Text>
            </TouchableHighlight>
        </View>
    </View>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 100,
        marginTop: 10,
    },
    nevermindButton: {
        backgroundColor: 'grey',
        padding: 10,
    },
    signUPButton: {
        backgroundColor: 'darkred',
        padding: 10,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    }
});

export default BadgerRegisterScreen;