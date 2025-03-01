import { useEffect, useState } from "react"
import BadgerSaleItem from "./BadgerSaleItem";
import { Col, Container, Row } from "react-bootstrap";

export default function BadgerMart(props) {

    const [saleItems, setSaleItems] = useState([]);
    const [featuredItem, setFeaturedItem] = useState(null)

    useEffect(() => {
        fetch("https://cs571.org/api/s24/hw3/all-sale-items", {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setSaleItems(data);
            const featured = data.find(item => item.featured)
            setFeaturedItem(featured)
        })
    }, [])

    const fontStyle = {
        fontFamily: "Courier New",
        fontWeight: "bold"
    }

    return <div>
        <h1 style = {fontStyle}>Badger Mart</h1>
        <p>Welcome to our small-town mini mart located in Madison, WI!</p>
        {
            featuredItem ? (
                <p>Today's featured item is {featuredItem.name} for ${featuredItem.price}!</p>
            ) : (
                <p>Loading...</p>
            )
        }
        <Container>
            <Row>
            {
                saleItems.map(saleItem => 
                    <Col key={saleItem.name} xs={12} md={6} lg={4} xl={3}>
                        <BadgerSaleItem
                            // name={saleItem.name}
                            // description={saleItem.description}
                            // price={saleItem.price}
                            // featured={saleItem.featured}
                            {...saleItem}
                        />
                    </Col>
                )
            }
            </Row>
        </Container>
    </div>
}