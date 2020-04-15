// React imports
import React from 'react';
// BootStrap imports
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
// Css import
import "./Home.css";
import logoApp from "../resources/lab.png"
import Filters from "./Filters.js"

const Home = props => (
    <Container className="container">
        {/* Navigation bar */}
        <Row style={{height:"15%"}}>
            <Navbar fixed="top" 
                    className="color-navbar"
                    variant="light">
                <Navbar.Brand className="col-2 justify-content-start">
                    <Image src={logoApp} 
                        rounded
                        />
                    <Navbar.Brand >Mis Aulas UNQ</Navbar.Brand>           
                </Navbar.Brand>
 
                <Form inline className="col-4 justify-content-center">
                    <FormControl type="text" 
                                placeholder="Buscar aula por materia" 
                                className="mr-sm-2" />
                    <Button variant="light">Search</Button>
                </Form>

                <Nav  className="col-6 justify-content-end">
                    <Navbar.Text >  |  </Navbar.Text>
                    <Navbar.Text >Login</Navbar.Text>
                </Nav>
            </Navbar>
        </Row>

        {/* Body */}
        <Row className="main">
            <Col xs={3} 
                 className="justify-content-start" >
                
                <Filters />

            </Col>
            <Col xs={5} style={{backgroundColor:"orange"}}>Search Results</Col>
            <Col xs={4} style={{backgroundColor:"brown"}}>Map viewer</Col>
        </Row>
    </Container>
)
// llaaa
export default Home;