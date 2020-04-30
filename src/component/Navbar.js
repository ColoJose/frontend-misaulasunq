import React, { useEffect, useState } from 'react';
// bootstrap
import {Nav, Navbar}from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import logoApp from '../resources/lab.png';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
//css
import './Navbar.css';
import history from '../utils/history';

import { useAuth0 } from '../react-auth0-spa';

function NavbarApp() {

    const [subject,setSubject] = useState('');
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

    const handleSubmit = (e) => {
        //e.preventDefault();
        history.push("/search");
        console.log(subject);
    }

    useEffect( ()=>{

    })

    return (
        <Row>
            <Navbar fixed="top" 
                    className="color-navbar"
                    variant="light">
                <Navbar.Brand className="col-2 justify-content-start">
                    <Image src={logoApp} 
                        rounded
                        />
                    <Navbar.Brand >Mis Aulas UNQ</Navbar.Brand>           
                </Navbar.Brand>

                <Form inline className="col-4 justify-content-center" onSubmit={handleSubmit}>
                    <FormControl type="text" 
                                //  placeholder="Buscar aula por materia" 
                                 className="mr-sm-2"
                                 value={subject}
                                 onChange={ (e) =>  setSubject(e.target.value)}
                                 disabled />
                    <Button type="submit" variant="light" disabled>Search</Button>
                </Form>

                <Nav  className="col-6 justify-content-end">
                    {!isAuthenticated && (
                        <Navbar.Text onClick={ () => loginWithRedirect({}) }>Login</Navbar.Text>
                    )}
                    
                    {isAuthenticated && (
                        <Navbar.Text onClick={ () => logout() }>Logout</Navbar.Text>
                    )}
                </Nav>
            </Navbar>
        </Row>
    );
}

export default NavbarApp;