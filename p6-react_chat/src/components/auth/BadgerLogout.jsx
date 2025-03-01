
import React, { useEffect, useContext } from 'react';
import BadgerLoginStatusContext from '../contexts/BadgerLoginStatusContext';
import { useNavigate } from 'react-router';

export default function BadgerLogout() {
    const [, setLoginStatus] = useContext(BadgerLoginStatusContext);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://cs571.org/api/s24/hw6/logout', {
            method: 'POST',
            credentials: "include",
            headers: {
                "X-CS571-ID": "bid_cb96aea08052bb15a19b727edcd9831e8d4fe403dfa95dae25e85b17c2a13b1a"
            }
        })
        .then(() => {res => res.json()})
        .then(() => {
            // Maybe you need to do something here?
            sessionStorage.removeItem("loginStatus");
            setLoginStatus(null);
            alert("You have been logged out!")
            navigate("/");
        })
    }, [setLoginStatus, navigate]);

    return <>
        <h1>Logout</h1>
        <p>You have been successfully logged out.</p>
    </>
}
