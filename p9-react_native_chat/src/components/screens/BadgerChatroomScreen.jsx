import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, StyleSheet, View, Pressable, Modal, Text, TextInput, Alert } from "react-native";
import * as SecureStore from 'expo-secure-store';
import BadgerChatMessage from "../helper/BadgerChatMessage";

function BadgerChatroomScreen(props) {
    const [messages, setMessages] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = () => {
        fetch(`https://cs571.org/api/s24/hw9/messages?chatroom=${props.name}`, {
            headers: {
                "X-CS571-ID": "bid_cb96aea08052bb15a19b727edcd9831e8d4fe403dfa95dae25e85b17c2a13b1a"
            }
        })
        .then(res => res.json())
        .then(json => {
            setMessages(json.messages);
        })
        .finally(() => setRefreshing(false));
    };

    const onRefresh = () => {
        setRefreshing(true);
        fetchMessages();
    };

    const createPost = () => {
        setTitle('')
        setBody('')
        SecureStore.getItemAsync('jwtToken').then(result => {
            fetch(`https://cs571.org/api/s24/hw9/messages?chatroom=${props.name}`, {
                method:"POST",
                headers:{
                    "X-CS571-ID": "bid_cb96aea08052bb15a19b727edcd9831e8d4fe403dfa95dae25e85b17c2a13b1a",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${result}`
                },
                body: JSON.stringify({
                    title: title,
                    content: body
                })
            })
            .then(res => {
                if(res.status===200){
                    Alert.alert("Successfully posted!", "Successfully posted!");
                    fetchMessages();
                }
            })
        })
        setModalVisible(false)
    }

    const handleDelete = (postID) => {
        SecureStore.getItemAsync('jwtToken').then(result => {
            fetch(`https://cs571.org/api/s24/hw9/messages?id=${postID}`, {
                method:"DELETE",
                headers:{
                    "X-CS571-ID": "bid_cb96aea08052bb15a19b727edcd9831e8d4fe403dfa95dae25e85b17c2a13b1a",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${result}`
                }
            })
            .then(res => {
                if(res.status === 200){
                    Alert.alert("Alert", "Successfully deleted the post!");
                    fetchMessages();
                }
            })
        })
    }

    const renderItem = ({ item }) => (
        <BadgerChatMessage
            title={item.title}
            poster={item.poster}
            content={item.content}
            created={item.created}
            isMyMessage={item.poster === props.userName}
            onDelete={() => handleDelete(item.id)}
        />
    );

    const onChangeTitle = (input) => {
        setTitle(input);
    }

    const onChangeBody = (input) => {
        setBody(input)
    }

    const cancel = () => {
        setTitle('')
        setBody('')
        setModalVisible(false)
    }
    return (
        <View style={styles.container}>
            <FlatList
                data={messages}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            />
            {props.isGuest ? (
                <></>
            ) : (
                <View>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            Alert.alert('Modal has been closed.');
                            setModalVisible(false);
                    }}>
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalTitle}>Create A Post</Text>
                                <Text>Title</Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={onChangeTitle}
                                    value={title}
                                />
                                <Text>Body</Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={onChangeBody}
                                    value={body}
                                />
                                <View style={styles.buttonContainer}>
                                    <Pressable
                                        style={[styles.createButton, (title.trim() === '' || body.trim() === '') && styles.createButtonDisabled]}
                                        onPress={createPost}
                                        disabled={title.trim() === '' || body.trim() === ''}
                                    >
                                        <Text style={styles.buttonText}>CREATE POST</Text>
                                    </Pressable>
                                    <Pressable
                                        style={styles.cancelButton}
                                        onPress={cancel}
                                    >
                                        <Text style={styles.buttonText}>CANCEL</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    </Modal>

                    <Pressable
                        onPress={() => setModalVisible(true)}
                        style={styles.addButton}
                    >
                        <Text style={styles.addButtonText}>ADD POST</Text>
                    </Pressable>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    card: {
        padding: 16,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'slategray',
        shadowOffset: {
          width: 4,
          height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1,
        marginBottom: 20
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    createButton: {
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        borderRadius: 10,
        marginVertical: 10,
    },
    createButtonDisabled: {
        backgroundColor: 'darkgrey',
    },
    cancelButton: {
        backgroundColor: 'grey',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        borderRadius: 10,
        marginVertical: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    addButton: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'red',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default BadgerChatroomScreen;