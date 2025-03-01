import { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableHighlight } from "react-native";

function BadgerLoginScreen(props) {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const onChangeUserName = (input) => {
        setUserName(input);
    };

    const onChangePassword = (input) => {
        setPassword(input)
    };

    const handleGuestLogin = () => {
        props.setIsGuest(true);
    }

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 36 }}>BadgerChat Login</Text>
            
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
                <Text style={styles.errorText}>{props.message}</Text>
            </View>

            <TouchableHighlight
                style={styles.loginButton}
                onPress={() => {props.handleLogin(userName, password)}}
                underlayColor="darkred"
            >
                <Text style={styles.buttonText}>LOGIN</Text>
            </TouchableHighlight>
            
            <Text></Text>
            <Text>New Here?</Text>
            <Text></Text>
            <View style={styles.buttonContainer}>
                <TouchableHighlight
                    style={styles.signGuestButton}
                    onPress={() => props.setIsRegistering(true)}
                    underlayColor="darkgrey"
                >
                    <Text style={styles.buttonText}>SIGNUP</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.signGuestButton}
                    onPress={handleGuestLogin}
                    underlayColor="darkgrey"
                >
                    <Text style={styles.buttonText}>CONTINUE AS GUEST</Text>   
                </TouchableHighlight>
            </View>            
        </View>
    );
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
        paddingHorizontal: 70,
        marginTop: 10,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 5,
        marginBottom: 10,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
    signGuestButton: {
        backgroundColor: 'grey',
        padding: 10,
    },
    loginButton: {
        backgroundColor: 'darkred',
        padding: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default BadgerLoginScreen;