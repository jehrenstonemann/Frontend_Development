import { Button, Container, Form, Row, Col, Pagination } from "react-bootstrap";
import { useEffect, useState } from "react";
import Student from "./Student";

const Classroom = () => {

    const [students, setStudents] = useState([])
    const [searchName, setSearchName] = useState("")
    const [searchMajor, setSearchMajor] = useState("")
    const [searchInterest, setSearchInterest] = useState("")
    const [shownStudents, setShownStudents] = useState([])
    const [activePage, setActivePage] = useState(1)

    useEffect(() => {
        const filteredStudents = students.filter(student => {
            const fullName = `${student.name.first} ${student.name.last}`
            const searchNameProcessed = searchName.trim().toLowerCase()
            const searchMajorProcessed = searchMajor.trim().toLowerCase()
            const searchInterestProcessed = searchInterest.trim().toLowerCase()

            const nameMatch = fullName.toLowerCase().includes(searchNameProcessed)
            const majorMatch = student.major.toLowerCase().includes(searchMajorProcessed)
            const interestMatch = student.interests.some(interest =>
                interest.toLowerCase().includes(searchInterestProcessed)
            );

            return nameMatch && majorMatch && interestMatch
        });
        setShownStudents(filteredStudents)
        setActivePage(1)
    }, [students, searchName, searchMajor, searchInterest])

    useEffect(() => {
        fetch("https://cs571.org/api/s24/hw4/students", {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setStudents(data)
            setActivePage(1)
        })
    }, [])

    const handleResetSearch = () => {
        setSearchName("");
        setSearchMajor("");
        setSearchInterest("");
        setActivePage(1);
    };

    const buildPaginator = () => {
        // ice2 lecture solution code
        let pages = []
        const num_pages = Math.ceil(shownStudents.length / 24)
        for(let i = 1; i <= num_pages; i++) {
            pages.push(
                <Pagination.Item
                    key={i}
                    active={activePage === i}
                    onClick={() => setActivePage(i)}
                >
                    {i}
                </Pagination.Item>
            )
        }
        return pages
    }

    return <div>
        <h1>Badger Book</h1>
        <p>Search for students below!</p>
        <hr />
        <Form>
            <Form.Label htmlFor="searchName">Name</Form.Label>
            <Form.Control id="searchName" value={searchName} onChange={e => setSearchName(e.target.value)}/>
            <Form.Label htmlFor="searchMajor">Major</Form.Label>
            <Form.Control id="searchMajor" value={searchMajor} onChange={e => setSearchMajor(e.target.value)}/>
            <Form.Label htmlFor="searchInterest">Interest</Form.Label>
            <Form.Control id="searchInterest" value={searchInterest} onChange={e => setSearchInterest(e.target.value)}/>
            <br />
            <Button variant="neutral" onClick={handleResetSearch}>Reset Search</Button>
        </Form>
        <p>There are {shownStudents.length} student(s) matching your search.</p>
        <Container fluid>
            <Row>
            {shownStudents
                .slice(24 * (activePage - 1), 24 * activePage)
                .map(student => <Col xs={12} md={6} lg={4} xl={3} key={student.id} >
                    <Student {...student} />
                </Col>)
            }
            </Row>
        </Container>
        <br/>
        <Pagination>
            <Pagination.Prev 
                onClick={() => setActivePage(activePage - 1)} 
                disabled={activePage === 1 || shownStudents.length === 0}
            > Previous </Pagination.Prev>
            {buildPaginator()}
            <Pagination.Next 
                onClick={() => setActivePage(activePage + 1)} 
                disabled={activePage === Math.ceil(shownStudents.length / 24) || shownStudents.length === 0}
            > Next </Pagination.Next>
        </Pagination>
    </div>

}

export default Classroom;