import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import BadgerCard from "./BadgerCard"

function BadgerChatMessage(props) {
    const dt = new Date(props.created);

    return (
        <View style={styles.container}>
            <BadgerCard style={styles.card}>
                <Text style={styles.title}>{props.title}</Text>
                <Text style={styles.meta}>by {props.poster} | Posted on {dt.toLocaleDateString()} at {dt.toLocaleTimeString()}</Text>
                <Text></Text>
                <Text>{props.content}</Text>
                {props.isMyMessage && (
                    <Pressable onPress={props.onDelete} style={styles.deleteButton}>
                        <Text style={styles.deleteButtonText}>DELETE POST</Text>
                    </Pressable>
                )}
            </BadgerCard>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 16,
        marginLeft: 8,
        marginRight: 8,
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 12,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title: {
        fontSize: 28,
        fontWeight: 600
    },
    meta: {
        fontSize: 12
    },
    deleteButton: {
        marginTop: 10,
        backgroundColor: "red",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
    },
    deleteButtonText: {
        color: "white",
        fontWeight: "bold",
    },
});

export default BadgerChatMessage;