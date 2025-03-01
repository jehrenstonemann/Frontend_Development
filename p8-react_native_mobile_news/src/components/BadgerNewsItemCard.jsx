import { Pressable, StyleSheet, View, Image, Text } from "react-native";

export default function BadgerNewsItemCard(props) {

    return (
        <Pressable onPress={props.onPress}>
            <View style={[styles.card, props.style]}>
                <Image style={{width: 350, height: 150}} source={{ uri: `https://raw.githubusercontent.com/CS571-S24/hw8-api-static-content/main/${props.img}` }} />
                <Text>{props.title}</Text>
            </View>
        </Pressable>

    )

}

const styles = StyleSheet.create({
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
    }
})