import React, { useEffect, useState, useContext, useRef } from "react"
import BadgerMessage from "./BadgerMessage";
import { Container, Col, Row, Pagination } from "react-bootstrap";
import { Button, Form } from "react-bootstrap";
import BadgerLoginStatusContext from "../contexts/BadgerLoginStatusContext";

export default function BadgerChatroom(props) {

    const [messages, setMessages] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const [loginStatus] = useContext(BadgerLoginStatusContext);
    const titleRef = useRef();
    const contentRef = useRef();

    const loadMessages = (page) => {
        fetch(`https://cs571.org/api/s24/hw6/messages?chatroom=${props.name}&page=${page}`, {
            headers: {
                "X-CS571-ID": "bid_cb96aea08052bb15a19b727edcd9831e8d4fe403dfa95dae25e85b17c2a13b1a"
            }
        }).then(res => res.json()).then(json => {
            setMessages(json.messages)
        })
    };

    // Why can't we just say []?
    // The BadgerChatroom doesn't unload/reload when switching
    // chatrooms, only its props change! Try it yourself.
    useEffect(() => {
        loadMessages(activePage);
    }, [props, activePage]);

    function handleCommentSubmit(e){
        e?.preventDefault();
        
        // https://cs571.org/api/s24/hw6/messages?chatroom=CHATROOM_NAME
        fetch(`https://cs571.org/api/s24/hw6/messages?chatroom=${props.name}`, {
            method:"POST",
            credentials:"include",
            headers:{
                "X-CS571-ID": "bid_cb96aea08052bb15a19b727edcd9831e8d4fe403dfa95dae25e85b17c2a13b1a",
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                title: titleRef.current.value,
                content: contentRef.current.value
            })
        })
        .then(res => {
            console.log(res.status)
            if(res.status === 200){
                alert("Successfully posted!")
                loadMessages(activePage)
                titleRef.current.value = ""
                contentRef.current.value = ""
            }else{
                alert("You must provide both a title and content!")
            }
        })
    }

    function handleDelete(postID){
        fetch(`https://cs571.org/api/s24/hw6/messages?id=${postID}`, {
            method:"DELETE",
            credentials:"include",
            headers:{
                "X-CS571-ID": "bid_cb96aea08052bb15a19b727edcd9831e8d4fe403dfa95dae25e85b17c2a13b1a",
                "Content-Type":"application/json"
            }
        })
        .then(res => {
            if(res.status === 200){
                alert("Successully deleted the post!");
                loadMessages(activePage);
            } else {
                alert("Failed to delete the post.")
            }
        })
        
    }

    if(loginStatus === null){
        return <>
            <h1>{props.name} Chatroom</h1>
            <hr/>
            <h3>You must be logged in to post!</h3>
            <Container>
                <Container>
                    <Row>
                    {
                        messages.length > 0 ?
                        messages.map(message => 
                        <Col key={message.id} xs={12} md={6} lg={4}>
                            <BadgerMessage
                                {...message}
                            />
                        </Col>
                        )
                        :<p>There are no messages on this page yet!</p>
                    }
                    </Row>
                </Container>
                <Pagination>
                    <Pagination.Item active={activePage===1} onClick={() => setActivePage(1)}>
                        1
                    </Pagination.Item>
                    <Pagination.Item active={activePage===2} onClick={() => setActivePage(2)}>
                        2
                    </Pagination.Item>
                    <Pagination.Item active={activePage===3} onClick={() => setActivePage(3)}>
                        3
                    </Pagination.Item>
                    <Pagination.Item active={activePage===4} onClick={() => setActivePage(4)}>
                        4
                    </Pagination.Item>
                </Pagination>
            </Container>
        </>
    } else {
        return <>
        <h1>{props.name} Chatroom</h1>
        {
            /* TODO: Allow an authenticated user to create a post. */
            <Form>
                <Form.Label htmlFor="titleInput">Post Title</Form.Label>
                <Form.Control id="titleInput" ref={titleRef}></Form.Control>
                <Form.Label htmlFor="contentInput">Post Content</Form.Label>
                <Form.Control id="contentInput" ref={contentRef}></Form.Control>
                <Button type="submit" onClick={handleCommentSubmit}>Create Post</Button>
            </Form>
        }
        <hr/>
        <Container>
            <Row>
            {
                messages.length > 0 ?
                    messages.map(message => 
                    <Col key={message.id} xs={12} md={6} lg={4}>
                        <BadgerMessage
                            {...message}
                            onDelete = {() => handleDelete(message.id)}
                        />
                    </Col>
                    )
                :<p>There are no messages on this page yet!</p>
            }
            </Row>
        </Container>
        <Pagination>
            <Pagination.Item active={activePage===1} onClick={() => setActivePage(1)}>
                1
            </Pagination.Item>
            <Pagination.Item active={activePage===2} onClick={() => setActivePage(2)}>
                2
            </Pagination.Item>
            <Pagination.Item active={activePage===3} onClick={() => setActivePage(3)}>
                3
            </Pagination.Item>
            <Pagination.Item active={activePage===4} onClick={() => setActivePage(4)}>
                4
            </Pagination.Item>
        </Pagination>
    </> 
    }
}
