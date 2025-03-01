import { useEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Alert } from "react-native";

import CS571 from '@cs571/mobile-client'
import * as SecureStore from 'expo-secure-store';
import BadgerChatroomScreen from './screens/BadgerChatroomScreen';
import BadgerRegisterScreen from './screens/BadgerRegisterScreen';
import BadgerLoginScreen from './screens/BadgerLoginScreen';
import BadgerLandingScreen from './screens/BadgerLandingScreen';
import BadgerLogoutScreen from './screens/BadgerLogoutScreen'
import BadgerConversionScreen from './screens/BadgerConversionScreen';

const ChatDrawer = createDrawerNavigator();

export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isRegistering, setIsRegistering] = useState(false);
  const [chatrooms, setChatrooms] = useState([]);

  // You may also find it helpful to store the username later.
  const [userName, setUserName] = useState('')

  const [loginErrorMessage, setLoginErrorMessage] = useState("");
  const [signupErrorMessage, setSignupErrorMessage] = useState("");

  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    // hmm... maybe I should load the chatroom names here
    fetch("https://cs571.org/api/s24/hw9/chatrooms", {
      headers: {
        "X-CS571-ID": "bid_cb96aea08052bb15a19b727edcd9831e8d4fe403dfa95dae25e85b17c2a13b1a"
      }
    })
    .then(res => res.json())
    .then(data => {
      setChatrooms(data)
    })
    // setChatrooms(["Hello", "World"]) // for example purposes only!
  }, []);

  function handleLogin(username, password) {
    setLoginErrorMessage("")
    // hmm... maybe this is helpful!
    fetch("https://cs571.org/api/s24/hw9/login", {
      method:"POST",
      headers: {
        "X-CS571-ID": "bid_cb96aea08052bb15a19b727edcd9831e8d4fe403dfa95dae25e85b17c2a13b1a",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
    .then(res => {
      if(res.status===401){
        setLoginErrorMessage("Incorrect login, please try again.")
        return
      }
      if(res.status===200){
        return res.json()
      }
    })
    .then(data => {
      if(data && data.token){
        SecureStore.setItemAsync('jwtToken', data.token)
        setIsLoggedIn(true); // I should really do a fetch to login first!
        setIsGuest(false)
        setUserName(username); // You may also find it helpful to store the username later.
      }
    })
  }

  function handleSignup(username, password, passwordAgain) {
    // hmm... maybe this is helpful!
    if(password === ""){
      setSignupErrorMessage("Please enter a password.")
      return
    }
    if(password !== passwordAgain){
      setSignupErrorMessage("Passwords do not match.")
      return
    }
    fetch("https://cs571.org/api/s24/hw9/register", {
      method: "POST",
      headers: {
        "X-CS571-ID": "bid_cb96aea08052bb15a19b727edcd9831e8d4fe403dfa95dae25e85b17c2a13b1a",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
    .then(res => {
      if(res.status===409){
        Alert.alert("Signup Failed", "That account already exists.");
        return
      }
      if(res.status===200){
        Alert.alert("Signup Successful", "Success!")
        return res.json()
      }
    })
    .then(data => {
      if(data && data.token){
        SecureStore.setItemAsync('jwtToken', data.token)
        setIsLoggedIn(true); // I should really do a fetch to register first!
        setIsGuest(false);
        setUserName(username); // You may also find it helpful to store the username later.
      }
    })
  }

  function handleLogout(){
    Alert.alert("Logged Out","Successfully logged out!")
    SecureStore.deleteItemAsync('jwtToken');
    setIsLoggedIn(false);
    setIsRegistering(false);
    setUserName('');
  }
  
  if (isLoggedIn || isGuest) {
    return (
      <NavigationContainer>
        <ChatDrawer.Navigator>
          <ChatDrawer.Screen name="Landing" component={BadgerLandingScreen} />
          {
            chatrooms.map(chatroom => {
              return <ChatDrawer.Screen key={chatroom} name={chatroom}>
                {(props) => <BadgerChatroomScreen isGuest={isGuest} name={chatroom} userName={userName}/>}
              </ChatDrawer.Screen>
            })
          }
          {isGuest ? (
            <ChatDrawer.Screen name="Signup">
              {(props) => <BadgerConversionScreen {...props} setIsRegistering={setIsRegistering} setIsLoggedIn={setIsLoggedIn} setIsGuest={setIsGuest}/>}
            </ChatDrawer.Screen>
          ) : (
            <ChatDrawer.Screen name="Logout">
              {(props) => <BadgerLogoutScreen {...props} handleLogout={handleLogout}/>}
            </ChatDrawer.Screen>
          )}
        </ChatDrawer.Navigator>
      </NavigationContainer>
    );
  } else if (isRegistering) {
    return <BadgerRegisterScreen handleSignup={handleSignup} message={signupErrorMessage} setIsRegistering={setIsRegistering} />
  } else {
    return <BadgerLoginScreen isGuest={isGuest} setIsGuest={setIsGuest} handleLogin={handleLogin} message={loginErrorMessage} setIsRegistering={setIsRegistering}/>
  }
}