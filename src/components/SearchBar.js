import { Button, Col, Container, Form, FormControl, Nav, Navbar, NavDropdown } from "react-bootstrap";

export default function SearchBar({ setIsSubmitted, setSummonerName, regions, selectedRegion, setSelectedRegion }) {

    const handleOnSummonerNameChange = e => {
        setSummonerName(e.target.value);
        setIsSubmitted(false);
    }

    const handleOnSubmit = e => {
        e.preventDefault();

        setIsSubmitted(true);
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand>
                ARAM Dashboard
            </Navbar.Brand>
            <Container>
                {/* <Row> */}
                <Col sm={4}>
                    <Nav className="me-auto">
                        <NavDropdown title={selectedRegion} menuVariant="dark">
                            {regions.map((reg, idx) => (
                                <NavDropdown.Item
                                    key={idx}
                                    onClick={() => setSelectedRegion(reg)}>
                                    {reg}
                                </NavDropdown.Item>
                            ))}
                        </NavDropdown>
                    </Nav>
                </Col>

                <Col sm={8}>
                    <Form className="d-flex" onSubmit={handleOnSubmit}>
                        <FormControl
                            type="search"
                            placeholder="Enter summoner's name"
                            className="me-2"
                            onChange={handleOnSummonerNameChange}>
                        </FormControl>
                        <Button variant="primary" type="search">Search</Button>
                    </Form>
                </Col>
                {/* </Row> */}
            </Container>
        </Navbar>
    );
}