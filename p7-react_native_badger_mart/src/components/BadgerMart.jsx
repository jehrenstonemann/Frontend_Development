import React, { useState, useEffect } from "react";
import { Text, View, Button, Alert } from "react-native";
import BadgerSaleItem from "./BadgerSaleItem";

export default function BadgerMart() {
    const [itemCounts, setItemCounts] = useState({});
    const [items, setItems] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        fetch("https://cs571.org/api/s24/hw7/items", {
            headers:{
                "X-CS571-ID": "bid_cb96aea08052bb15a19b727edcd9831e8d4fe403dfa95dae25e85b17c2a13b1a"
            }
        })
        .then(res => res.json())
        .then(data => {
            setItems(data);
        });
    }, []);

    const handleAddItem = (itemName, upperLimit) => {
        const currentCount = itemCounts[itemName] || 0;
        if (currentCount < upperLimit) {
            setItemCounts(prevCounts => ({
                ...prevCounts,
                [itemName]: currentCount + 1
            }));
        }
    };

    const handleRemoveItem = (itemName) => {
        const currentCount = itemCounts[itemName] || 0;
        if (currentCount > 0) {
            setItemCounts(prevCounts => ({
                ...prevCounts,
                [itemName]: currentCount - 1
            }));
        }
    };

    const totalItems = Object.values(itemCounts).reduce((total, count) => total + count, 0);
    const totalCost = Object.keys(itemCounts).reduce((total, itemName) => {
        return total + (itemCounts[itemName] * items.find(item => item.name === itemName)?.price || 0);
    }, 0);

    const handlePlaceOrder = () => {
        Alert.alert(
            "Order Confirmed!",
            `Your order contains ${totalItems} items and costs $${totalCost.toFixed(2)}!`,
            [
                { text: "OK", onPress: () => {
                    setItemCounts({});
                    setCurrentIndex(0);
                }}
            ]
        );
    };

    return (
        <View>
            <Text style={{fontSize: 28}}>Welcome to Badger Mart!</Text>
            <BadgerSaleItem currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} items={items} itemCounts={itemCounts} onAddItem={handleAddItem} onRemoveItem={handleRemoveItem}/>
            <View>
                <Text>You have {totalItems} item(s) costing ${totalCost.toFixed(2)} in your cart!</Text>
            </View>
            <Button title="Place Order" onPress={handlePlaceOrder} disabled={totalItems === 0}/>
        </View>
    );
}