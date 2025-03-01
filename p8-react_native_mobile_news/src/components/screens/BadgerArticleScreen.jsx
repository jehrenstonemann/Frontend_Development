import React, { useEffect, useRef, useState } from "react";
import { Animated, Text, ScrollView, View, Image, Pressable, Linking  } from "react-native";

function BadgerArticleScreen(props) {
    const [article, setArticle] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const fadeAnim = useRef(new Animated.Value(0));


    useEffect(() => {
        fetch(`https://cs571.org/api/s24/hw8/article?id=${props.route.params.fullID}`, {
            headers:{
                "X-CS571-ID": "bid_cb96aea08052bb15a19b727edcd9831e8d4fe403dfa95dae25e85b17c2a13b1a"
            }
        })
        .then(res => res.json())
        .then(data => {
            setArticle(data);
            setIsLoading(false);
        });
    }, []);

    useEffect(() => {
        Animated.timing(fadeAnim.current, {
          toValue: 1,
          duration: 5000,
          useNativeDriver: true,
        }).start();
    }, [])

    const handlePress = () => {
        if (article.url) {
            Linking.openURL(article.url);
        }
    };

    return (
        <ScrollView>
            <Image style={{ width: 390, height: 150, justifyContent: 'center' }} source={{ uri: `https://raw.githubusercontent.com/CS571-S24/hw8-api-static-content/main/${props.route.params.img}` }} />
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginVertical: 8, marginHorizontal: 12 }}>{props.route.params.title}</Text>
            {isLoading && <Text style={{ marginVertical: 20, marginHorizontal: 12 }}>Please wait while your article loads...</Text>}
            {!isLoading && (
                <>
                    <View style={{ height: 10 }} />
                    <Animated.Text style={{ marginHorizontal: 12 , opacity: fadeAnim.current}}>By {article.author} on {article.posted}</Animated.Text>
                    <Pressable onPress={handlePress}>
                        <Animated.Text style={{ marginHorizontal: 12 , opacity: fadeAnim.current, color: 'royalblue'}}>Read full article here.</Animated.Text>
                    </Pressable>
                    <View style={{ height: 20 }} />
                    <Animated.ScrollView style={{opacity: fadeAnim.current}}>
                        {article.body?.map((p, index) => (
                            <Text key={index} style={{ marginHorizontal: 12}}>{p}</Text>
                        ))}
                    </Animated.ScrollView>
                </>
            )}
        </ScrollView>
    );
}

export default BadgerArticleScreen;