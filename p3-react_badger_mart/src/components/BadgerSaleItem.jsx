import { useState } from "react";

export default function BadgerSaleItem(props) {
    
    const [quant, setQuant] = useState(0);
    const increaseQuant = () => {
        setQuant(quant + 1)
    }
    const decreaseQuant = () => {
        setQuant(quant - 1)
    }
    const featuredItem = {
        backgroundColor : props.featured ? "red" : "transparent"
    }
    const divBox = {
        border: "1px solid black",
    }
    const decButton = {
        backgroundColor: "lightgrey",
        color: "white"
    };
    const incButton = {
        backgroundColor: "blue",
        color: "white"
    }

    return <div style = {Object.assign(featuredItem, divBox)}>
        <h2>{props.name}</h2>
        <p>{props.description}</p>
        <p>${props.price}</p>
        <div>
            <button style = {decButton} className = "inline" onClick = {decreaseQuant} disabled = {quant <= 0}>-</button>
            <p className="inline">{quant}</p>
            <button style = {incButton} className="inline" onClick = {increaseQuant}>+</button>
        </div>
    </div>
}