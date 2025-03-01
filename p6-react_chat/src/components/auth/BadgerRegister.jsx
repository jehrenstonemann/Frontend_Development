import React from 'react';
import { useState } from "react";
import { Button, Form } from "react-bootstrap";

export default function BadgerRegister() {

    // TODO Create the register component.
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("");

    function handleRegister(e){
        e?.preventDefault();
        if(username === "" || password === ""){
            alert("You must provide both a username and password!")
        }
        if(password !== passwordAgain){
            alert("Your passwords do not match!")
            return
        }
        // POST to https://cs571.org/api/s24/hw6/register
        fetch("https://cs571.org/api/s24/hw6/register", {
            method: "POST",
            credentials: "include",
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
                alert("That username has already been taken!")
            }
            if(res.status===200){
                alert("Registration successful!")
            }
        })
    }

    return <>
        <h1>Register</h1>
        <Form>
            <Form.Label htmlFor="usernameRegInput">Username</Form.Label>
            <Form.Control id="usernameRegInput" value={username} onChange={(e) => setUsername(e.target.value)}></Form.Control>
            <Form.Label htmlFor="passwordRegInput">Password</Form.Label>
            <Form.Control id="passwordRegInput" type="password" value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
            <Form.Label htmlFor="newPasswordRegInput">Repeat Password</Form.Label>
            <Form.Control id="newPasswordRegInput" type="password" value={passwordAgain} onChange={(e) => setPasswordAgain(e.target.value)}></Form.Control>
            <br/>
            <Button type="submit" onClick={handleRegister}>Register</Button>
        </Form>
    </>
}
