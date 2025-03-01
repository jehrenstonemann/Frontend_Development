import React, { useEffect, useState } from "react";
import { Image, Text, View, Button } from "react-native";

export default function BadgerSaleItem(props) {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch("https://cs571.org/api/s24/hw7/items", {
            headers:{
                "X-CS571-ID": "bid_cb96aea08052bb15a19b727edcd9831e8d4fe403dfa95dae25e85b17c2a13b1a"
            }
        })
        .then(res => res.json())
        .then(data => {
            setItems(data)
        });
    }, []);

    const handleNext = () => {
        if (props.currentIndex < items.length - 1) {
            props.setCurrentIndex(props.currentIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (props.currentIndex > 0) {
            props.setCurrentIndex(props.currentIndex - 1);
        }
    };

    return (
        <View>
            <View style={{ flexDirection: "row"}}>
                <Button title="Previous" onPress={handlePrevious} disabled={props.currentIndex === 0} />
                <Button title="Next" onPress={handleNext} disabled={props.currentIndex === items.length - 1} />
            </View>
            <View>
                <Image style={{width: 200, height: 200}} source={{uri: items[props.currentIndex]?.imgSrc}} />
                <Text style={{fontSize: 32}}>{items[props.currentIndex]?.name}</Text>
                <Text style={{fontSize: 20}}>${items[props.currentIndex]?.price.toFixed(2)} each</Text>
                <Text style={{fontSize: 12}}>You can order up to {items[props.currentIndex]?.upperLimit} units!</Text>
                <View style={{ flexDirection: "row"}}>
                <Button title="-" onPress={() => props.onRemoveItem(items[props.currentIndex]?.name)} disabled={!props.itemCounts[items[props.currentIndex]?.name] || props.itemCounts[items[props.currentIndex]?.name] === 0} />
                    <Text>{props.itemCounts[items[props.currentIndex]?.name] || 0}</Text>
                    <Button title="+" onPress={() => props.onAddItem(items[props.currentIndex]?.name, items[props.currentIndex]?.upperLimit)} disabled={props.itemCounts[items[props.currentIndex]?.name] === items[props.currentIndex]?.upperLimit} />
                </View>
            </View>
        </View>
    );
}