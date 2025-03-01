import React, { useRef, useContext } from 'react';
import { Button, Form } from "react-bootstrap";
import BadgerLoginStatusContext from '../contexts/BadgerLoginStatusContext';
import { useNavigate } from "react-router-dom";

export default function BadgerLogin() {

    const [, setLoginStatus] = useContext(BadgerLoginStatusContext);
    const navigate = useNavigate();

    // TODO Create the login component.

    const usernameRef = useRef();
    const passwordRef = useRef();

    function handleLogin(e){
        e?.preventDefault();
        if(usernameRef.current.value === "" || passwordRef.current.value === ""){
            alert("You must provide both a username and password!")
            return
        }
        // POST to https://cs571.org/api/s24/hw6/login
        fetch("https://cs571.org/api/s24/hw6/login", {
            method: "POST",
            credentials: "include",
            headers: {
                "X-CS571-ID": "bid_cb96aea08052bb15a19b727edcd9831e8d4fe403dfa95dae25e85b17c2a13b1a",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: usernameRef.current.value,
                password: passwordRef.current.value
            })
        })
        .then(res => {
            if(res.status===401){
                alert("Incorrect username or password!")
                return
            }
            if(res.status===200){
                alert("Login successful!")
                return res.json()
            }
        })
        .then(data => {
            sessionStorage.setItem("loginStatus", JSON.stringify({loggedIn: true, userid: data.user.username}))
            setLoginStatus({ loggedIn: true, userid: data.user.username })
            navigate("/");
        })
    }

    return <>
        <h1>Login</h1>
        <Form>
            <Form.Label htmlFor="usernameInput">Username</Form.Label>
            <Form.Control id="usernameInput" ref={usernameRef}></Form.Control>
            <Form.Label htmlFor="passwordInput">Password</Form.Label>
            <Form.Control id="passwordInput" type="password" ref={passwordRef}></Form.Control>
            <br/>
            <Button type="submit" onClick={handleLogin}>Login</Button>
        </Form>

    </>
}
