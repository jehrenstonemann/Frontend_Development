import React from 'react';
import { Button, Card, Col } from 'react-bootstrap';

const SavedBuddySummary = (props) => {
    const imageURL = `https://raw.githubusercontent.com/CS571-S24/hw5-api-static-content/main/cats/${props.imgIds[0]}`;

    const unselect = () => {
        const savedCatIds = JSON.parse(sessionStorage.getItem('savedCatIds')) || [];
        sessionStorage.setItem("savedCatIds", JSON.stringify(savedCatIds.filter(id => id!==props.id)))
        props.reloadBasket();
        alert(`${props.name} has been removed from your basket!`)
    }

    const adopt = () => {
        const adoptedCatIds = JSON.parse(sessionStorage.getItem('adoptedCatIds')) || [];
        const savedCatIds = JSON.parse(sessionStorage.getItem('savedCatIds')) || [];
        adoptedCatIds.push(props.id);
        sessionStorage.setItem('adoptedCatIds', JSON.stringify(adoptedCatIds));
        sessionStorage.setItem("savedCatIds", JSON.stringify(savedCatIds.filter(id => id!==props.id)))
        props.reloadBasket();
        alert(`${props.name} has been adopted!`)
    }

    return (
        <Col xs={12} md={6} lg={4} xl={3}>
            <Card key={props.id} style={{ width: '18rem', margin: "0.25rem"}}>
                <Card.Img variant="top" src={imageURL} alt={`A picture of ${props.name}`} style={{ height: '15rem', objectFit: 'cover' }}/>
                <Card.Body>
                    <h4>{props.name}</h4>
                    <Button variant="secondary" onClick={unselect}>
                        Unselect
                    </Button>
                    <Button variant="success" style={{ marginLeft: '0.25rem' }} onClick={adopt}>
                        💕 Adopt
                    </Button>
                </Card.Body>
            </Card>
        </Col>
        );
};

export default SavedBuddySummary;