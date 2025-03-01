
const createChatAgent = () => {

    const CS571_WITAI_ACCESS_TOKEN = "DUGHHJ64JO4D7OAQXZ5PYGEYGDGKBHML"; // Put your CLIENT access token here.

    let availableItems = [];
    let cart = {};

    const handleInitialize = async () => {
        const res = await fetch("https://cs571.org/api/s24/hw10/items", {
            headers : {
                "X-CS571-ID" : "bid_cb96aea08052bb15a19b727edcd9831e8d4fe403dfa95dae25e85b17c2a13b1a"
            }
        });
        const data = await res.json();
        availableItems = data.map((data) => data.name)
        availableItems.forEach(element => {
            cart[element.toLowerCase()] = 0;
        })
        return "Welcome to BadgerMart Voice! :) Type your question, or ask for help if you're lost!"
    }

    const handleReceive = async (prompt) => {
        // TODO: Replace this with your code to handle a user's message!
        const res = await fetch("https://api.wit.ai/message?q=" + encodeURIComponent(prompt), {
            headers : {
                "Authorization" : "Bearer " + CS571_WITAI_ACCESS_TOKEN
            }
        });
        const data = await res.json();
        const resItems = await fetch("https://cs571.org/api/s24/hw10/items", {
            headers : {
                "X-CS571-ID" : "bid_cb96aea08052bb15a19b727edcd9831e8d4fe403dfa95dae25e85b17c2a13b1a"
            }
        })
        const fruits = await resItems.json();
        if(data.intents.length > 0){
            const intentName = data.intents[0].name;
            if(intentName === "get_help"){
                return "In BadgerMart Voice, you can get the list of items, the price of an item, add or remove and item from your cart, and checkout!"
            }
            if(intentName === "get_items"){
                const formattedItems = availableItems.map(item => item.toLowerCase()).join(', ');
                const result = formattedItems.slice(0, 30) + "and " + formattedItems.slice(30, 33);
                return "We have " + result + " for sale!";
            }
            if(intentName === "get_price"){
                if(Object.keys(data.entities).length === 0){
                    return "Sorry, we don't have that item in stock."
                } else {
                    if(data.entities["fruit_type:fruit_type"].length === 1){
                        const item = data.entities["fruit_type:fruit_type"][0].body;
                        return item.charAt(0).toUpperCase() + item.slice(1) + "s cost $" + fruits.filter(fruit => fruit.name.toLowerCase() === item)[0].price.toFixed(2) + " each.";
                    } else {
                        return "Please specify only a single item."
                    }
                }
            }
            if(intentName === "add_item"){
                if(!data.entities["fruit_type:fruit_type"]){
                    return "Sorry, we don't have that item in stock.";
                } else {
                    let quantity = 1
                    if(data.entities["fruit_type:fruit_type"].length === 1){
                        if(!data.entities["wit$number:number"]){
                            cart[data.entities["fruit_type:fruit_type"][0].value] += quantity;
                            return "Sure, adding " + quantity + " " + data.entities["fruit_type:fruit_type"][0].value + " to your cart."
                        }
                        else{
                            if(data.entities["wit$number:number"][0].value <= 0){
                                return "I cannot add that number of " + data.entities["fruit_type:fruit_type"][0].value + " to your cart!";
                            } else {
                                quantity = Math.floor(data.entities["wit$number:number"][0].value)
                                cart[data.entities["fruit_type:fruit_type"][0].value] += quantity;
                                return "Sure, adding " + quantity + " " + data.entities["fruit_type:fruit_type"][0].value + " to your cart."
                            }
                        }
                    } else {
                        return "Please specify only a single item."
                    }
                }
            }
            if(intentName === "remove_item"){
                if(!data.entities["fruit_type:fruit_type"]){
                    return "Sorry, we don't have that item in stock.";
                } else {
                    let quantity = 1
                    if(data.entities["fruit_type:fruit_type"].length === 1){
                        if (cart[data.entities["fruit_type:fruit_type"][0].value] === 0){
                            return "You don't have any " + data.entities["fruit_type:fruit_type"][0].value + "s" + " in your cart!"
                        } else if(!data.entities["wit$number:number"]){
                            cart[data.entities["fruit_type:fruit_type"][0].value] -= quantity;
                            return "Sure, removing " + quantity + " " + data.entities["fruit_type:fruit_type"][0].value + " from your cart."
                        }
                        else{
                            if(data.entities["wit$number:number"][0].value <= 0){
                                return "I cannot remove that number of " + data.entities["fruit_type:fruit_type"][0].value + " from your cart!";
                            } else if (data.entities["wit$number:number"][0].value > cart[data.entities["fruit_type:fruit_type"][0].value]) {
                                const temp = cart[data.entities["fruit_type:fruit_type"][0].value]
                                cart[data.entities["fruit_type:fruit_type"][0].value] = 0;
                                return "Removed " + temp + " " + data.entities["fruit_type:fruit_type"][0].value + " from your cart as that's all you had!"
                            } else {
                                quantity = Math.floor(data.entities["wit$number:number"][0].value)
                                cart[data.entities["fruit_type:fruit_type"][0].value] -= quantity;
                                return "Sure, removing " + quantity + " " + data.entities["fruit_type:fruit_type"][0].value + " from your cart."
                            }
                        }
                    } else {
                        return "Please specify only a single item."
                    }
                }
            }
            if(intentName === "view_cart"){
                const result  = {};
                let totalPrice = 0;
                for (const item in cart){
                    const quantity = cart[item];
                    const price = fruits.filter(fruit => fruit.name.toLowerCase() === item)[0].price
                    totalPrice += price * quantity;
                    if(quantity > 0){
                        result[item] = quantity
                    }
                }
                let phrase = "";
                if(Object.keys(result).length === 0){
                    phrase = "nothing"
                } else if (Object.keys(result).length === 1){
                    phrase = result[Object.keys(result)[0]] + " " + Object.keys(result)[0]
                } else if (Object.keys(result).length === 2){
                    phrase = result[Object.keys(result)[0]] + " " + Object.keys(result)[0] + " and " + result[Object.keys(result)[1]] + " " + Object.keys(result)[1]
                } else if (Object.keys(result).length > 2){
                    const entries = Object.entries(result)
                    const numEntries = entries.length
                    entries.forEach(([key, value], index) => {
                        if (index === 0) {
                            phrase += `${value} ${key}`;
                        } else if (index === numEntries - 1) {
                            phrase += `, and ${value} ${key}`;
                        } else {
                            phrase += `, ${value} ${key}`;
                        }
                    });
                }
                return "You have " + phrase + " in your cart, totaling $" + totalPrice.toFixed(2);
            }
            if (intentName === "checkout"){
                const newCart = {};
                for (let item in cart) {
                    const capitalizedItem = item.charAt(0).toUpperCase() + item.substring(1);
                    newCart[capitalizedItem] = cart[item];
                }
                const res = await fetch("https://cs571.org/api/s24/hw10/checkout", {
                    method : 'POST',
                    headers : {
                        "X-CS571-ID" : "bid_cb96aea08052bb15a19b727edcd9831e8d4fe403dfa95dae25e85b17c2a13b1a",
                        "Content-Type" : "application/json"
                    },
                    body : JSON.stringify(newCart)
                })
                if(res.status === 200){
                    cart = {}
                    const checkout = await res.json();
                    return "Success! Your confirmation ID is " + checkout.confirmationId

                } else {
                    return "You don't have any items in your cart to purchase!"
                }
            }
        } else {
            return "Sorry, I didn't get that. Type 'help' to see what you can do!"
        }
    }

    return {
        handleInitialize,
        handleReceive
    }
}

export default createChatAgent;