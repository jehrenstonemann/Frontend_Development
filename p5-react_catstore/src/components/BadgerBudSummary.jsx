import React, {useState} from 'react';
import { Button, Card, Col, Carousel } from 'react-bootstrap';

const BadgerBudSummary = (props) => {
    const [showDetails, setShowDetails] = useState(false);

    const toggle = () => {
        setShowDetails(!showDetails)
    }

    const save = () => {
        const savedCatIds = JSON.parse(sessionStorage.getItem('savedCatIds')) || [];
        savedCatIds.push(props.id);
        sessionStorage.setItem('savedCatIds', JSON.stringify(savedCatIds));
        props.reloadAvailable();
        alert(`${props.name} has been added to your basket!`);
    };

    return (
    <Col xs={12} md={6} lg={4} xl={3}>
        <Card key={props.id} style={{ width: '18rem', margin: "0.25rem" }}>
            {props.imgIds.length > 1 && showDetails ? (
                <Carousel>
                    {props.imgIds.map((imgId, index) => (
                        <Carousel.Item key={index}>
                            <img
                                width={"300px"}
                                height={"300px"}
                                src={`https://raw.githubusercontent.com/CS571-S24/hw5-api-static-content/main/cats/${imgId}`}
                                alt={`A picture of ${props.name}`}
                            />
                        </Carousel.Item>
                    ))}
                </Carousel>
            ) : (
                <Card.Img
                    width={"300px"}
                    height={"300px"}
                    src={`https://raw.githubusercontent.com/CS571-S24/hw5-api-static-content/main/cats/${props.imgIds[0]}`}
                    alt={`A picture of ${props.name}`}
                />
            )}
            <Card.Body>
                <h4>{props.name}</h4>
                {showDetails && (
                    <div>
                        <p>{props.gender}</p>
                        <p>{props.breed}</p>
                        <p>{props.age}</p>
                        {props.description && <p>{props.description}</p>}
                    </div>
                )}
                <Button variant="primary" onClick={toggle}>
                    {showDetails ? "Show Less" : "Show More"}
                </Button>
                <Button variant="secondary" style={{ marginLeft: '0.25rem' }} onClick={save}>❤️ Save</Button>
            </Card.Body>
        </Card>
    </Col>
    );
};

export default BadgerBudSummary;