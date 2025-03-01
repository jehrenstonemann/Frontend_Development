import React from "react"
import { Card, Button } from "react-bootstrap";

function BadgerMessage(props) {

    const dt = new Date(props.created);
    const handleDeleteClick = () => {
        props.onDelete();
    };
    const loginStatusString = sessionStorage.getItem("loginStatus");
    const loggedInUserId = loginStatusString ? JSON.parse(loginStatusString)?.userid : null;

    // JSON.parse(sessionStorage.getItem("loginStatus")).userid
    return <Card style={{margin: "0.5rem", padding: "0.5rem"}}>
        <h2>{props.title}</h2>
        <sub>Posted on {dt.toLocaleDateString()} at {dt.toLocaleTimeString()}</sub>
        <br/>
        <i>{props.poster}</i>
        <p>{props.content}</p>
        {props.poster === loggedInUserId && (
            <Button variant="danger" onClick={handleDeleteClick}>Delete Post</Button>
        )}
    </Card>
}

export default BadgerMessage;